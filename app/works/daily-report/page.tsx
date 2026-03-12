// app/works/daily-report-app/page.tsx
"use client";
import useSWR from "swr";
import { fetcher } from "@/app/works/daily-report/lib/fetcher";
import Link from "next/link";
import { useState } from "react";
import PostList from "./components/PostList";
import TagFilter from "./components/TagFilter";
import WordFilter from "./components/WordFilter";
import { FileText } from "lucide-react";
import { Post } from "./types/post";
import { useSession } from "next-auth/react";

export default function DailyReportListPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // 日報一覧取得APIを呼び出す
  const { data: posts, error } = useSWR<Post[]>(
    selectedTags.length > 0
      ? `/works/daily-report/api/posts?tags=${selectedTags.join(",")}`
      : `/works/daily-report/api/posts`,
    fetcher,
    {
      revalidateOnFocus: false, // タブ切り替えで再フェッチしない
      keepPreviousData: true, //前のデータを保持してスムーズ更新
    },
  );
  const { data: session } = useSession();

  if (error) return <p>日報の読み込みに失敗しました</p>;

  const publishedPosts = posts?.filter((post) => post.status === "published");

  const allTags = Array.from(
    new Set(publishedPosts?.flatMap((post) => post.tags) || []),
  );

  const filteredPosts = posts?.filter(
    (post) =>
      selectedTags.every((tag) => post.tags.includes(tag)) &&
      post.status === "published",
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
    <div className="max-w-3xl space-y-4 p-6 mx-auto">
      <div className="mb-6 items-center justify-between md:flex">
        <h1 className="text-2xl font-bold">業務日報</h1>
        <div className="mt-4 flex items-center gap-4 md:mt-0">
          <WordFilter
            value={searchQuery}
            onChange={setSearchQuery}
            debounceMs={300}
          />
          {session && (
            <Link
              href="/works/daily-report/drafts"
              className="mr-0 ml-auto flex cursor-pointer items-center rounded bg-gray-200 px-3 py-1 text-sm text-nowrap transition hover:bg-gray-300"
            >
              <FileText className="mr-1 inline-block h-4 w-4" />
              下書き一覧へ
            </Link>
          )}
        </div>
      </div>
      <TagFilter
        allTags={allTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      {session && (
        <Link
          href="/works/daily-report/new"
          className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          + 日報を書く
        </Link>
      )}
      <div className="mt-2 text-sm text-gray-600">
        {selectedTags.length > 0 || searchQuery ? (
          <>
            検索結果:{" "}
            <span className="font-semibold">{searchedPosts?.length || 0}</span>
            件
            {posts && (
              <>
                {" "}
                / 全
                <span className="font-semibold">
                  {posts.filter((p) => p.status === "published").length}件
                </span>
              </>
            )}
          </>
        ) : (
          <>
            全
            <span className="font-semibold">{searchedPosts?.length || 0}</span>
            件
          </>
        )}
      </div>
      <PostList posts={searchedPosts || []} showCheckButton={true} />
    </div>
  );
}
