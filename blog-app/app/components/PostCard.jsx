"use client";
import Link from "next/link";
import { motion } from "framer-motion";

// export interface Post {
//   id: number;
//   title: string;
//   content: string;
//   image?: string;
//   author?: string;
//   created_at?: string;
// }

export default function PostCard({ post }) {
  const imageSrc = post.image || post.image_url;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Link
        href={{
          pathname: `/post/${post.id}`,
          query: {
            title: post.title,
            content: post.content,
            author: post.author,
            created_at: post.created_at || new Date().toISOString(),
            image: post.image || post.image_url,
          },
        }}
        className="block bg-black border border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-500"
      >
        {imageSrc && (
          <div className="relative w-full">
            <img
              src={imageSrc}
              alt={post.title}
              className="w-full object-cover transition-transform duration-300 hover:scale-105"
              style={{
                height: `${Math.floor(Math.random() * (400 - 250) + 250)}px`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        <div className="p-4 bg-black/80">
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-300">
            {post.content.length > 80
              ? post.content.slice(0, 80) + "..."
              : post.content}
          </p>
          <p className="text-sm mt-2 text-gray-200">By {post.author}</p>
        <p className="text-xs mt-2 text-gray-600">
          {post.created_at && `Created at: ${new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })}`}
        </p>
        </div>
      </Link>
    </motion.div>
  );
}
