"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Post } from "../page";
import { ArrowUpDown } from "lucide-react";

export default function PostList({ posts }: { posts: Post[] }) {
  // posts昇順と降順のトグル機能を追加する場合はここにstateと関数を追加
  const [isAscending, setIsAscending] = useState(true);
  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  const sortedPosts = posts.sort((a, b) => {
    if (isAscending) {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <>
      <button
        onClick={toggleSortOrder}
        className="mr-0 ml-auto px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition flex items-center  cursor-pointer"
      >
        <ArrowUpDown className="inline-block w-4 h-4 mr-1" />
        {isAscending ? "古い順" : "新しい順"}
      </button>
      <AnimatePresence mode="wait">
        <motion.div
          key={posts.map((post) => post.id).join(",") ?? "all"}
          className="space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.1 }}
        >
          {sortedPosts.map((post) => (
            <motion.div
              key={post.id}
              layout
              className="border p-3 mt-4 rounded-lg bg-white shadow-sm hover:shadow-md transition grid grid-cols-"
              whileHover={{ scale: 1.002 }}
            >
              <Link href={`/works/blog/${post.id}`}>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-600">
                  {post.tags?.map((t: string, i: number) => (
                    <span
                      key={`${t}-${i}`}
                      className="text-sm bg-gray-100 px-2 py-1 rounded-full"
                    >
                      #{t}
                    </span>
                  ))}
                </p>
                <p className="inline-block text-xs text-gray-500 float-right">
                  {new Date(post.createdAt).toLocaleDateString("ja-JP")}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
