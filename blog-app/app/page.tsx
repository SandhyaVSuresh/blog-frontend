"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import PostCard from "./components/PostCard";
import { motion } from "framer-motion";
import AnimatedBackground from "./components/AnimatedBackground";
import { getAPI } from "./config/get-api";

interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  image_url?: string;
  author?: string;
  created_at?: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPosts, setHasPosts] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await getAPI<Post[]>("post-list/"); // API call
      const fetchedPosts = response || [];
      setPosts(fetchedPosts);
      console.log("Fetched posts:", fetchedPosts);
      setHasPosts(fetchedPosts.length > 0);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setHasPosts(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <AnimatedBackground />

      <main className="p-6">
        {/* Header Section */}
        <div className="w-full flex items-center justify-left mb-6">
          
          <Link
            href="/create"
            className="w-fit bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Create Blog
          </Link>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-600">Loading posts...</p>
          </div>
        ) : hasPosts ? (
          // Posts Grid
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {posts.map((post, index) => (
              <div key={post.id} className={`break-inside-avoid ${
                // Alternate between different heights for visual interest
                index % 3 === 0 ? 'h-auto' :
                index % 3 === 1 ? 'h-auto' :
                'h-auto'
              }`}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-500">No posts found.</p>
          </div>
        )}
      </main>
    </>
  );
}
