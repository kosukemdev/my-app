"use client";

import { useRouter, useParams } from "next/navigation";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/app/works/daily-report/lib/fetcher";
import { useState } from "react";
import Link from "next/link";
import { Post } from "@/app/works/daily-report/types/post";

export default function DeletePostPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: post, error } = useSWR<Post>(
    id ? `/works/daily-report/api/posts/${id}` : null,
    fetcher,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("本当に削除しますか？")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/works/daily-report/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("削除に失敗しました");

      mutate(
        "/works/daily-report/api/posts",
        (prev?: Post[]) => prev?.filter((p) => p.id !== id) ?? [],
        false,
      );

      router.push("/works/daily-report");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("削除中にエラーが発生しました");
    } finally {
      setIsDeleting(false);
    }
  };

  if (error) return <p className="p-6">データ取得に失敗しました。</p>;
  if (!post) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3 text-gray-700">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
        <p className="text-sm font-medium">日報データを整理しています…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">日報の削除</h1>
      <p className="mb-6">本当にこの日報を削除してもよろしいですか？</p>

      <div className="mb-6 rounded border bg-gray-50 p-4">
        <h2 className="text-lg font-semibold">
          {post?.title ?? <span className="text-gray-400">タイトルなし</span>}
        </h2>
        <p className="mb-2 text-sm text-gray-500">
          {post?.tags?.map((tag: string, i: number) => (
            <span key={`${tag}-${i}`} className="mr-2">
              #{tag}
            </span>
          ))}
        </p>
        <p className="text-gray-700">
          {post?.content || <span className="text-gray-400">本文なし</span>}
        </p>
      </div>

      <div className="flex justify-between">
        <Link
          href={"/works/daily-report"}
          className="text-blue-500 hover:underline"
        >
          ← 戻る
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          {isDeleting ? "削除中..." : "削除する"}
        </button>
      </div>
    </div>
  );
}
