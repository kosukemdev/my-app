"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Post } from "../page";
import { ArrowUpDown } from "lucide-react";
import { mutate } from "swr";

export default function PostList({
  posts,
  showLikeButton,
}: {
  posts: Post[];
  showLikeButton: boolean;
}) {
  const [isAscending, setIsAscending] = useState(true);
  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
  };

  const toggleLike = async (id: string) => {
    mutate(
      "/api/posts",
      (currentPosts: Post[] = []) =>
        currentPosts.map((p: any) =>
          p.id === id ? { ...p, liked: !p.liked } : p
        ),
      false
    );

    try {
      const res = await fetch("/api/posts/like", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("いいねの更新に失敗しました。");
      mutate("/api/posts");
    } catch (error) {
      console.error(error);
      mutate(
        "/api/posts",
        (currentPosts: Post[] = []) =>
          currentPosts.map((p: any) =>
            p.id === id ? { ...p, liked: !p.liked } : p
          ),
        false
      );
    }
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
              className="border p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition grid grid-cols-1"
              layout
              whileHover={{ scale: 1.002 }}
            >
              <div>
                <Link href={`/works/blog/${post.id}`} className="space-y-2">
                  <h2 className="text-xl font-semibold hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {post.tags?.map((t: string, i: number) => (
                      <span
                        key={`${t}-${i}`}
                        className="text-sm bg-gray-100 px-2 py-1 rounded-full mr-2 inline-block"
                      >
                        #{t}
                      </span>
                    ))}
                  </p>
                </Link>
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString("ja-JP")}
                </p>
                {showLikeButton && (
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`hover:text-red-600 transition ${post.liked ? "text-red-600" : "text-gray-400"}`}
                  >
                    {post.liked ? "♥" : "♡"}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
