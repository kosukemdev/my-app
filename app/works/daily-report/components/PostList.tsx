"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Post } from "@/app/works/daily-report/types/post";
import { mutate } from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// 日付部分だけを比較するヘルパー関数
const isSameDate = (date1: string, date2: string): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export default function PostList({
  posts,
  showCheckButton,
}: {
  posts: Post[];
  showCheckButton: boolean;
}) {
  const [sortType, setSortType] = useState("newest");
  const { data: session } = useSession();

  const toggleCheck = async (id: string) => {
    mutate(
      "/works/daily-report/api/posts",
      (currentPosts: Post[] = []) =>
        currentPosts.map((p: any) =>
          p.id === id ? { ...p, checked: !p.checked } : p
        ),
      false
    );

    try {
      const res = await fetch("/works/daily-report/api/posts/check", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("いいねの更新に失敗しました。");
      mutate("/works/daily-report/api/posts");
    } catch (error) {
      console.error(error);
      mutate(
        "/works/daily-report/api/posts",
        (currentPosts: Post[] = []) =>
          currentPosts.map((p: any) =>
            p.id === id ? { ...p, checked: !p.checked } : p
          ),
        false
      );
    }
  };

  const sortedPosts = posts
    .filter((post) => {
      if (sortType === "unchecked") return !post.checked;
      if (sortType === "checked") return post.checked;
      return true;
    })
    .sort((a, b) => {
      if (sortType === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortType === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      return 0;
    });

  return (
    <>
      <Select value={sortType} onValueChange={setSortType}>
        <SelectTrigger className="w-[220px] ml-auto">
          <SelectValue placeholder="並び替え" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="newest">作成日：新しい順</SelectItem>
          <SelectItem value="oldest">作成日：古い順</SelectItem>
          <SelectItem value="unchecked">未確認のみ</SelectItem>
          <SelectItem value="checked">確認済みのみ</SelectItem>
        </SelectContent>
      </Select>
      <AnimatePresence mode="wait">
        <motion.div
          key={posts.map((post) => post.id).join(",") ?? "all"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.1 }}
        >
          {sortedPosts.map((post) => (
            <div key={post.id} className="not-first:mt-2">
              <motion.div
                className="border p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition grid grid-cols-1"
                layout
                whileHover={{ scale: 1.002 }}
              >
                <Link href={`/works/daily-report/${post.id}`}>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
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
                  <p className="text-xs text-gray-500">
                    作成日：
                    {new Date(post.createdAt).toLocaleDateString("ja-JP")}
                    {post.updatedAt &&
                      !isSameDate(post.createdAt, post.updatedAt) && (
                        <>
                          <span className="mx-2">|</span>
                          更新日：
                          {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
                        </>
                      )}
                  </p>
                </Link>
              </motion.div>
              {session ? (
                <div className="flex justify-end gap-2 mt-1">
                  <Link
                    href={`/works/daily-report/${post.id}/edit`}
                    className="text-sm bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                  >
                    日報を編集
                  </Link>
                  <Link
                    href={`/works/daily-report/${post.id}/delete`}
                    className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    削除
                  </Link>
                </div>
              ) : (
                <div className="flex justify-end">
                  {showCheckButton && (
                    <button
                      onClick={() => toggleCheck(post.id)}
                      className={`hover:text-red-600 transition ${post.checked ? "text-red-600" : "text-gray-400"}`}
                    >
                      {post.checked ? "確認済み" : "未確認"}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
