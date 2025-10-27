// app/works/blog-app/page.tsx
"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import { useState } from "react";
import PostList from "./components/PostList";
import TagFilter from "./components/TagFilter";

export type Post = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default function BlogListPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { data: posts, error } = useSWR<Post[]>(
    selectedTags.length > 0
      ? `/api/posts?tags=${selectedTags.join(",")}`
      : `/api/posts`,
    fetcher,
    {
      revalidateOnFocus: false, // タブ切り替えで再フェッチしない
      keepPreviousData: true, // ✅ 前のデータを保持してスムーズ更新！
    }
  );

  if (error) return <p>記事の読み込みに失敗しました</p>;

  const allTags = Array.from(
    new Set(posts?.flatMap((post) => post.tags) || [])
  );

  // selectedTags,statusに基づいてフィルタリング
  const filteredPosts = posts?.filter(
    (post) =>
      selectedTags.every((tag) => post.tags.includes(tag)) &&
      post.status === "published"
  );

  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">公開記事一覧</h1>
        <Link
          href="/works/blog/drafts"
          className="text-blue-600 hover:underline"
        >
          下書き一覧へ
        </Link>
      </div>
      <TagFilter
        allTags={allTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <Link href="/works/blog/new" className="text-blue-500 hover:underline">
        + 新規投稿
      </Link>
      <PostList posts={filteredPosts || []} />
    </div>
  );
}
