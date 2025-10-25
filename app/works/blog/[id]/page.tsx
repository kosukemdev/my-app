"use client";

import { fetcher } from "@/lib/fetcher";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Post } from "@/app/works/blog/page";
import Link from "next/link";

export default function DetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: post, error } = useSWR<Post>(
    id ? `/api/posts/${id}` : null,
    fetcher
  );

  if (error) return <p className="p-6">データ取得に失敗しました。</p>;
  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-gray-500 mt-2">#{post.tag}</p>
      </div>

      <div className="border-t pt-4 text-gray-800 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>

      <div className="flex justify-between items-center border-t pt-6">
        <Link href="/works/blog" className="text-blue-500 hover:underline">
          ← 一覧に戻る
        </Link>

        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/works/blog/${id}/edit`)}
            className="text-sm bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            編集
          </button>
          <button
            onClick={() => router.push(`/works/blog/${id}/delete`)}
            className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
}
