// app/works/daily-report-app/page.tsx
"use client";
import useSWR from "swr";
import { fetcher } from "@/app/works/daily-report/lib/fetcher";
import Link from "next/link";
import { useState } from "react";
import PostList from "./components/PostList";
import TagFilter from "./components/TagFilter";
import WordFilter from "./components/WordFilter";
import { FileText, PenSquare, Search, Tags } from "lucide-react";
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

  const totalPublishedCount = posts?.filter((p) => p.status === "published")
    .length;

  return (
    <div className="mx-auto min-h-screen max-w-5xl bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.35),_transparent_42%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_48%,_#ffffff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/80 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur">
        <div className="border-b border-slate-200/80 bg-[linear-gradient(135deg,_rgba(219,234,254,0.9),_rgba(255,255,255,0.75))] px-6 py-8 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-[0.24em] text-slate-500 uppercase">
                Daily Report
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                業務日報を見やすく、探しやすく
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                提出済みの日報を一覧で確認しながら、タグやキーワードで必要な記録にすばやくたどり着けます。
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[360px]">
              <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
                <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
                  Published
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {totalPublishedCount || 0}
                </p>
              </div>
              <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
                <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
                  Search
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {searchedPosts?.length || 0}
                </p>
              </div>
              <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
                <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
                  Tags
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {allTags.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Search className="h-4 w-4 text-sky-600" />
                  キーワード検索
                </div>
                <WordFilter
                  value={searchQuery}
                  onChange={setSearchQuery}
                  debounceMs={300}
                />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Tags className="h-4 w-4 text-sky-600" />
                  タグ絞り込み
                </div>
                <TagFilter
                  allTags={allTags}
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                />
              </div>
            </div>

            {session && (
              <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
                <Link
                  href="/works/daily-report/new"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                  <PenSquare className="h-4 w-4" />
                  日報を書く
                </Link>
                <Link
                  href="/works/daily-report/drafts"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <FileText className="h-4 w-4" />
                  下書き一覧へ
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-600">
            <span className="font-medium text-slate-900">
              {selectedTags.length > 0 || searchQuery
                ? `検索結果 ${searchedPosts?.length || 0} 件`
                : `公開中 ${searchedPosts?.length || 0} 件`}
            </span>
            {totalPublishedCount !== undefined && (
              <span>全 {totalPublishedCount} 件</span>
            )}
            {selectedTags.length > 0 && (
              <span>選択タグ: {selectedTags.join(" / ")}</span>
            )}
            {searchQuery.trim() && <span>キーワード: {searchQuery.trim()}</span>}
          </div>

          <PostList posts={searchedPosts || []} showCheckButton={true} />
        </div>
      </section>
    </div>
  );
}
