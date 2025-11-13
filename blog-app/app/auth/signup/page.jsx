"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AnimatedBackground from "../../componets/AnimatedBackground";
import { postAPI } from "../../config/post-api";

export default function SignupPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_no: "",
    password: "",
    confirm_password: "",
  });

  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // postAPI returns parsed JSON on success and throws on non-OK responses.
      await postAPI("signup/", form);
      alert("Signup successful!");
      router.push("/auth/login");
    }
     catch (error) {
      console.error(error);
      // postAPI throws with a message including status and response text.
      alert(error?.message || "Signup failed");
    }
  };

  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen w-full flex items-center justify-center bg-black-100">
        <form
          onSubmit={handleSubmit}
          className="bg-black p-6 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.1)] w-[90%] "
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            Sign Up
          </h2>

          <div className="flex  w-full gap-8 mb-4">
            <div className="w-[50%]">

              <div>
                <label className="block text-white mb-2">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleChange}
                  className="w-full mb-3 border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={handleChange}
                  className="w-full mb-3 border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  className="w-full mb-3 border rounded px-3 py-2"
                  required
                />
              </div>

               <div>
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="w-full mb-3 border rounded px-3 py-2"
                  required
                />
              </div>

             

            </div>
            <div className="w-[50%]">

               <div>
                <label className="block text-white mb-2">Phone</label>
                <input
                  type="text"
                  name="phone_no"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className="w-full mb-3 border rounded px-3 py-2"
                />
              </div>
             
              <div>
                <label className="block text-white mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full mb-3 border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  className="w-full mb-3 border rounded px-3 py-2"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
