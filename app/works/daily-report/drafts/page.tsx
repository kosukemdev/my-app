"use client";

import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/app/works/daily-report/lib/fetcher";
import { Post } from "@/app/works/daily-report/types/post";
import PostList from "../components/PostList";
import TagFilter from "../components/TagFilter";
import WordFilter from "../components/WordFilter";
import { useState } from "react";
import { FileText } from "lucide-react";

export default function DraftListPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: posts, error } = useSWR<Post[]>(
    "/works/daily-report/api/posts",
    fetcher,
  );

  if (error) return <p className="p-6">データ取得に失敗しました</p>;

  const draftedPosts = posts?.filter((post) => post.status === "draft") || [];

  const allTags = Array.from(
    new Set(draftedPosts.flatMap((post) => post.tags) || []),
  );

  const filteredPosts = draftedPosts?.filter(
    (post) =>
      selectedTags.every((tag) => post.tags.includes(tag)) &&
      post.status === "draft",
  );

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchedPosts =
    normalizedQuery && filteredPosts
      ? filteredPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(normalizedQuery) ||
            post.content.toLowerCase().includes(normalizedQuery),
        )
      : filteredPosts;

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-6">
      <div className="mb-6 items-center justify-between md:flex">
        <h1 className="text-2xl font-bold">下書き一覧</h1>
        <div className="mt-4 flex items-center gap-4 md:mt-0">
          <WordFilter
            value={searchQuery}
            onChange={setSearchQuery}
            debounceMs={300}
          />
          <Link
            href="/works/daily-report"
            className="mr-0 ml-auto flex cursor-pointer items-center rounded bg-gray-200 px-3 py-1 text-sm text-nowrap transition hover:bg-gray-300"
          >
            <FileText className="mr-1 inline-block h-4 w-4" />
            日報一覧へ
          </Link>
        </div>
      </div>

      <TagFilter
        allTags={allTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

      {draftedPosts.length === 0 ? (
        <>
          <Link
            href="/works/daily-report/new"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            + 日報を書く
          </Link>
          <p className="p-6">下書きはまだありません。</p>
        </>
      ) : (
        <>
          <Link
            href="/works/daily-report/new"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            + 日報を書く
          </Link>
          <div className="mt-2 text-sm text-gray-600">
            {selectedTags.length > 0 || searchQuery ? (
              <>
                検索結果:{" "}
                <span className="font-semibold">
                  {searchedPosts?.length || 0}件
                </span>
                {draftedPosts && (
                  <>
                    {" "}
                    / 全
                    <span className="font-semibold">{draftedPosts.length}</span>
                    件
                  </>
                )}
              </>
            ) : (
              <>
                全
                <span className="font-semibold">
                  {searchedPosts?.length || 0}
                </span>
                件
              </>
            )}
          </div>
          <PostList posts={searchedPosts || []} showCheckButton={false} />
        </>
      )}
    </div>
  );
}
