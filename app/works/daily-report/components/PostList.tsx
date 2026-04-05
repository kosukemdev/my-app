"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Post } from "@/app/works/daily-report/types/post";
import { mutate } from "swr";
import {
  BadgeCheck,
  CalendarDays,
  Clock3,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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
    const updateCache = (currentPosts: Post[] = []) =>
      currentPosts.map((post) =>
        post.id === id ? { ...post, checked: !post.checked } : post,
      );

    mutate("/works/daily-report/api/posts", updateCache, false);

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
      mutate("/works/daily-report/api/posts", updateCache, false);
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
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-900">一覧表示</p>
          <p className="text-sm text-slate-500">
            更新履歴とタグを見ながら、必要な日報を確認できます。
          </p>
        </div>
        <Select value={sortType} onValueChange={setSortType}>
          <SelectTrigger className="w-full rounded-xl border-slate-200 bg-white sm:w-[240px]">
            <SelectValue placeholder="並び替え" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="newest">作成日：新しい順</SelectItem>
            <SelectItem value="oldest">作成日：古い順</SelectItem>
            <SelectItem value="unchecked">未確認のみ</SelectItem>
            <SelectItem value="checked">確認済みのみ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={posts.map((post) => post.id).join(",") ?? "all"}
          className="grid gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.1 }}
        >
          {sortedPosts.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-sm text-slate-500">
              条件に一致する日報がありません。
            </div>
          ) : (
            sortedPosts.map((post) => (
              <div key={post.id} className="space-y-2">
                <motion.div
                  className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_35px_-30px_rgba(15,23,42,0.85)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_45px_-28px_rgba(14,116,144,0.35)]"
                  layout
                  whileHover={{ scale: 1.003 }}
                >
                  <Link
                    href={`/works/daily-report/${post.id}`}
                    className="block space-y-5 p-5 sm:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatDate(post.createdAt)}
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                            {post.title}
                          </h2>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {post.content.length > 120
                              ? `${post.content.slice(0, 120)}...`
                              : post.content}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {post.tags?.length ? (
                        post.tags.map((t: string, i: number) => (
                          <span
                            key={`${t}-${i}`}
                            className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                          >
                            #{t}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-400">
                          タグなし
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5" />
                        作成日 {formatDate(post.createdAt)}
                      </span>
                      {post.updatedAt &&
                        !isSameDate(post.createdAt, post.updatedAt) && (
                          <span className="inline-flex items-center gap-1.5">
                            <BadgeCheck className="h-3.5 w-3.5" />
                            更新日 {formatDate(post.updatedAt)}
                          </span>
                        )}
                    </div>
                  </Link>
                </motion.div>
                {session ? (
                  <div className="flex flex-wrap justify-end gap-2">
                    <Link
                      href={`/works/daily-report/${post.id}/edit`}
                      className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
                    >
                      <Pencil className="h-4 w-4" />
                      日報を編集
                    </Link>
                    <Link
                      href={`/works/daily-report/${post.id}/delete`}
                      className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
                    >
                      <Trash2 className="h-4 w-4" />
                      削除
                    </Link>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    {showCheckButton && (
                      <button
                        onClick={() => toggleCheck(post.id)}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                          post.checked
                            ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                        }`}
                      >
                        <BadgeCheck className="h-4 w-4" />
                        {post.checked ? "確認済み" : "未確認"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
