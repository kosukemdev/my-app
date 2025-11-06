"use client";

import { useRouter, useParams } from "next/navigation";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/app/works/blog/lib/fetcher";
import { useState } from "react";
import Link from "next/link";
import { Post } from "@/app/works/blog/types/post";

export default function DeletePostPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: post, error } = useSWR<Post>(
    id ? `/works/blog/api/posts/${id}` : null,
    fetcher
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("本当に削除しますか？")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/works/blog/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("削除に失敗しました");

      mutate(
        "/works/blog/api/posts",
        (prev?: Post[]) => prev?.filter((p) => p.id !== id) ?? [],
        false
      );

      router.push("/works/blog");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("削除中にエラーが発生しました");
    } finally {
      setIsDeleting(false);
    }
  };

  if (error) return <p className="p-6">データ取得に失敗しました。</p>;
  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">記事の削除</h1>
      <p className="mb-6">本当にこの記事を削除してもよろしいですか？</p>

      <div className="border p-4 rounded bg-gray-50 mb-6">
        <h2 className="text-lg font-semibold">{post.title}</h2>
        <p className="text-sm text-gray-500 mb-2">
          {post.tags?.map((tag, i) => (
            <span key={`${tag}-${i}`} className="mr-2">
              #{tag}
            </span>
          ))}
        </p>
        <p className="text-gray-700">{post.content}</p>
      </div>

      <div className="flex justify-between">
        <Link
          href={`/works/blog/${id}`}
          className="text-blue-500 hover:underline"
        >
          ← 戻る
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          {isDeleting ? "削除中..." : "削除する"}
        </button>
      </div>
    </div>
  );
}
