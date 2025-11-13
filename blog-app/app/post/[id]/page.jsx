"use client";
import Link from "next/link";
import Image from "next/image";
import AnimatedBackground from "../../components/AnimatedBackground";
import { useSearchParams } from "next/navigation";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteAPI } from "../../config/delete-api";
import { checkAuth } from "../../utils/authCheck";

export default function PostDetails({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const [post, setPost] = useState({
    title: searchParams.get("title") || '',
    content: searchParams.get("content") || '',
    author: searchParams.get("author") || '',
    image: searchParams.get("image") || '',
    imageUrl: searchParams.get("image") || '',
    createdAt: searchParams.get("created_at") || new Date().toISOString(),
    id: resolvedParams.id,
  });

  const [isLoading, setIsLoading] = useState(!searchParams.get("title"));

  useEffect(() => {
    // If we don't have the title in search params, fetch the post data
    if (!searchParams.get("title")) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/posts/${resolvedParams.id}`);
          if (response.ok) {
            const data = await response.json();
            setPost({
              title: data.title,
              content: data.content,
              author: data.author,
              image: data.image || data.image_url,
              imageUrl: data.image || data.image_url,
              createdAt: data.created_at || data.date || new Date().toISOString(),
              id: resolvedParams.id,
            });
          }
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPost();
    }
  }, [resolvedParams.id, searchParams]);

  const [isDeleting, setIsDeleting] = useState(false);
  const imageSrc = post.image || post.imageUrl;
// console.log("Post Details:", post);
  const handleDelete = async () => {
    if (!checkAuth(router)) return;
    if (!confirm("Are you sure you want to delete this post?")) return;

    setIsDeleting(true);
    try {
      await deleteAPI(`post-delete/${post.id}/`); 
      // alert("Post deleted successfully!");
      window.location.href = "/"; 
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <AnimatedBackground />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <AnimatedBackground />
      <div className="max-w-[90%] max-h-[90%] mx-auto p-6 bg-white shadow-md rounded-2xl mt-8">
        {imageSrc && (
          <div className="relative w-full h-64 mb-6 overflow-hidden rounded-xl">
            <img
              src={imageSrc}
              alt={post.title}
              fill
              className=" w-full h-full object-cover hover:scale-105 transition-transform duration-300 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-3 text-gray-900">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">By {post.author}</p>
        <p className="text-gray-700 leading-relaxed mb-6">{post.content}</p>
        <p className="text-sm text-gray-400 mb-6">
          Posted on:{" "}
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => checkAuth(router) && router.push(`/edit/${post.id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`px-4 py-2 text-white rounded-lg transition ${
              isDeleting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>

          <Link
            href={`/`}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Back
          </Link>
        </div>
      </div>
    </>
  );
}
