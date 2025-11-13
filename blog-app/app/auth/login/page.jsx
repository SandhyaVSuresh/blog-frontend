"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AnimatedBackground from "../../componets/AnimatedBackground";
import { postAPI } from "../../config/post-api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await postAPI("login/", form); // Login API

    // Save token and user info
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login successful!");
    router.push("/");
  } catch (error) {
    console.error(error);
    alert(error?.message || "Login failed");
  }
};


  return (
    <>
      <AnimatedBackground />
    <div className="min-h-screen flex items-center justify-center bg-black-100">
      <form
        onSubmit={handleSubmit}
         className="relative bg-black p-6 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.1)] w-full max-w-sm"
      >
        <div className="flex justify-between mb-2">
        <h2 className="text-2xl font-bold mb-4 text-left text-white">Login</h2>
        <button
          type="button"
          aria-label="Close"
          onClick={() => router.push('/')}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700"
        >
          X
        </button>
        </div>
        <hr></hr>
        <div className="mt-4">
          <label className="block text-white mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-3 border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-white mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="w-full mb-3 border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <p className="text-center text-gray-600 mt-3">
          Don’t have an account?{" "}
          <a href="/auth/signup" className="text-blue-600">Sign up</a>
        </p>
      </form>
    </div>
    </>
  );
}
