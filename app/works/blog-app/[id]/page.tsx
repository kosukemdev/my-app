"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { useSession } from "next-auth/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogDetailPage() {
  // 動的にIDを取り出している
  const { id } = useParams();
  const {
    data: post,
    error,
    isLoading,
  } = useSWR(id ? `/works/blog-app/api/posts/${id}` : null, fetcher);
  const { data: session } = useSession();

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error || !post)
    return (
      <p className="text-center mt-10 text-red-500">記事が見つかりません。</p>
    );

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
        {session && (
          <Link
            href={`/works/blog-app/edit/${post.id}`}
            className="inline-block mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition cursor-pointer"
          >
            編集する
          </Link>
        )}
      </div>

      <div className="space-x-2 mt-4">
        {post.tags.map((tag: string) => (
          <span key={tag} className="px-3 py-1 rounded-full border bg-gray-100">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-4">{post.createdAt}</p>

      <article className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>

      <div className="flex justify-center mt-10">
        <Link
          href="/works/blog-app"
          className="px-6 py-2 bg-[#918DB1] text-[#323b50] font-semibold rounded hover:bg-[#7787aa] hover:text-white transition cursor-pointer"
        >
          ← 記事一覧に戻る
        </Link>
      </div>
    </main>
  );
}
