// app/works/blog-app/page.tsx
"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import { useState } from "react";
import PostList from "./components/PostList";
import TagFilter from "./components/TagFilter";
import WordFilter from "./components/WordFilter";
import { FileText } from "lucide-react";

export type Post = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  status: string;
  createdAt: string;
};

export default function BlogListPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: posts, error } = useSWR<Post[]>(
    selectedTags.length > 0
      ? `/api/posts?tags=${selectedTags.join(",")}`
      : `/api/posts`,
    fetcher,
    {
      revalidateOnFocus: false, // タブ切り替えで再フェッチしない
      keepPreviousData: true, //前のデータを保持してスムーズ更新
    }
  );
  if (error) return <p>記事の読み込みに失敗しました</p>;

  const allTags = Array.from(
    new Set(posts?.flatMap((post) => post.tags) || [])
  );

  const filteredPosts = posts?.filter(
    (post) =>
      selectedTags.every((tag) => post.tags.includes(tag)) &&
      post.status === "published"
  );

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchedPosts =
    normalizedQuery && filteredPosts
      ? filteredPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(normalizedQuery) ||
            post.content.toLowerCase().includes(normalizedQuery)
        )
      : filteredPosts;

  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">公開記事一覧</h1>
        <div className="flex items-center gap-4">
          <WordFilter
            value={searchQuery}
            onChange={setSearchQuery}
            debounceMs={300}
          />
          <Link
            href="/works/blog/drafts"
            className="mr-0 ml-auto px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition flex items-center cursor-pointer"
          >
            <FileText className="inline-block w-4 h-4 mr-1" />
            下書き一覧へ
          </Link>
        </div>
      </div>
      <TagFilter
        allTags={allTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <Link
        href="/works/blog/new"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        + 新規投稿
      </Link>
      <PostList posts={searchedPosts || []} />
    </div>
  );
}
