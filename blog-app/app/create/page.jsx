"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PostForm from "../components/PostForm";
import AnimatedBackground from "../components/AnimatedBackground";
import { postAPI } from "../config/post-api";
import { checkAuth } from "../utils/authCheck";

export default function CreatePost() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   
  if (!checkAuth(router)) return;
      router.push("/auth/login");
    } , [router]);
  
  const handleCreatePost = async (formData) => {
    

    console.log("Create function")
  const data = new FormData();
  data.append("title", formData.title);
  data.append("content", formData.content);
  data.append("author", formData.author);

  if (formData.imageFile) {
    data.append("image", formData.imageFile); // must match backend field name
  } else if (formData.imageUrl) {
    data.append("image_url", formData.imageUrl);
  }

  const response = await postAPI("post-create/", data);
  console.log("Created post:", response);
    router.push("/");
};


  const handleClose = () => {
    setShowForm(false);
    router.push("/");
  };

  return (
    <>
      <AnimatedBackground />
      <div className="p-6">
        {showForm ? (
          <PostForm onSubmit={handleCreatePost} buttonText="Create" onClose={handleClose} />
        ) : (
          <p className="text-center text-gray-600">Form closed.</p>
        )}
      </div>
    </>
  );
}
