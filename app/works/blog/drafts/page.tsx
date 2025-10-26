"use client";

import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/lib/fetcher";
import { Post } from "@/app/works/blog/page";
import PostList from "../components/PostList";

export default function DraftListPage() {
  const { data: posts, error } = useSWR<Post[]>(
    "/api/posts",
    fetcher
  );

  if (error) return <p className="p-6">データ取得に失敗しました</p>;
  if (!posts) return <p className="p-6">読み込み中...</p>;

  const draftPosts = posts.filter((post) => post.status === "draft");

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">下書き一覧</h1>
        <Link href="/works/blog" className="text-blue-500 hover:underline">
          公開記事一覧へ
        </Link>
      </div>

      {draftPosts.length === 0 ? (
        <>
              <Link href="/works/blog/new" className="text-blue-500">
        + 新規投稿
      </Link>
        <p className="p-6">下書き記事はまだありません。</p>
        </>
      ) : (
        <>
              <Link href="/works/blog/new" className="text-blue-500">
        + 新規投稿
      </Link>
        <PostList posts={draftPosts} />
        </>
      )}
    </div>
  );
}
