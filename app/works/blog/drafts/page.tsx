"use client";

import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/lib/fetcher";
import { Post } from "@/app/works/blog/page";
import PostList from "../components/PostList";
import TagFilter from "../components/TagFilter";
import WordFilter from "../components/WordFilter";
import { useState } from "react";
import { FileText } from "lucide-react";

export default function DraftListPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: posts, error } = useSWR<Post[]>("/api/posts", fetcher);

  if (error) return <p className="p-6">データ取得に失敗しました</p>;
  if (!posts) return <p className="p-6">読み込み中...</p>;

  const draftPosts = posts.filter((post) => post.status === "draft");

  const allTags = Array.from(
    new Set(posts?.flatMap((post) => post.tags) || [])
  );

  const filteredPosts = draftPosts?.filter(
    (post) =>
      selectedTags.every((tag) => post.tags.includes(tag)) &&
      post.status === "draft"
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
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">下書き一覧</h1>
        <div className="flex items-center gap-4">
          <WordFilter
            value={searchQuery}
            onChange={setSearchQuery}
            debounceMs={300}
          />
          <Link
            href="/works/blog"
            className="mr-0 ml-auto px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition flex items-center cursor-pointer"
          >
            <FileText className="inline-block w-4 h-4 mr-1" />
            公開記事一覧へ
          </Link>
        </div>
      </div>

      <TagFilter
        allTags={allTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

      {draftPosts.length === 0 ? (
        <>
          <Link
            href="/works/blog/new"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + 新規投稿
          </Link>
          <p className="p-6">下書き記事はまだありません。</p>
        </>
      ) : (
        <>
          <Link
            href="/works/blog/new"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + 新規投稿
          </Link>
          <PostList posts={searchedPosts || []} showLikeButton={false} />
        </>
      )}
    </div>
  );
}
