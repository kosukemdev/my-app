"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const {
    data: post,
    error,
    isLoading,
  } = useSWR(`/works/blog-app/api/${id}`, fetcher);

  if (isLoading) return <p className="text-center mt-10">読み込み中...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        データ取得に失敗しました。
      </p>
    );
  if (!post || post.message)
    return <p className="text-center mt-19">記事が見つかりませんでした。</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>

      <div className="flex gap-4 mt-8">
        <Link
          href={`/works/blog-app/${post.id}/edit`}
          className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          編集する
        </Link>
        <Link href="/works/blog-app" className="text-blue-500 hover:underline">
          ← 一覧に戻る
        </Link>
      </div>
    </div>
  );
}
