// app/works/blog-app/page.tsx
"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";

export type Post = {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
};

export default function BlogListPage() {
  const { data: posts, error, mutate } = useSWR<Post[]>("/api/posts", fetcher);

  if (!posts) return <p>読み込み中...</p>;
  if (error) return <p>記事の読み込みに失敗しました</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">記事一覧</h1>
      <Link href="/works/blog/new" className="text-blue-500">
        + 新規投稿
      </Link>
      <div className="grid gap-4">
        {posts?.map((post: Post) => (
          <Link
            key={post.id}
            href={`/works/blog/${post.id}`}
            className="block p-4 border rounded hover:bg-gray-50 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-600">{post.tag}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
