"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogDetailPage() {
  // 動的にIDを取り出している
  const { id } = useParams();
  const {
    data: post,
    error,
    isLoading,
  } = useSWR(id ? `/works/blog-app/api/posts/${id}` : null, fetcher);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error || !post)
    return (
      <p className="text-center mt-10 text-red-500">記事が見つかりません。</p>
    );

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {post.tags.join(",")}・{post.createdAt}
      </p>

      <article className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>

      <Link
        href="/works/blog-app"
        className="px-6 py-2 bg-[#918DB1] text-[#323b50] font-semibold rounded hover:bg-[#7787aa] hover:text-white transition cursor-pointer"
      >
        ← 記事一覧に戻る
      </Link>
    </main>
  );
}
