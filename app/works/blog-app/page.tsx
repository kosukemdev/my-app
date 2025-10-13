"use client";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import Link from "next/link";
import PostList from "./components/PostList";
import PostFilter from "./components/Postfilter";
import AuthButton from "./components/AuthButton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogAppPage() {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR("/works/blog-app/api/posts", fetcher);
  // useSessionとは　認証情報を取得するためのフック
  const { data: session, status } = useSession();

  // status は "loading" | "authenticated" | "unauthenticated"を返す
  if (status === "loading")
    return <p className="text-center mt-10">読み込み中...</p>;

  if (isLoading) return <p className="text-center mt-10">読み込み中...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">エラーが発生しました。</p>
    );

  const tags: string[] = Array.from(
    new Set(
      Array.isArray(posts)
        ? posts.flatMap((post: any) =>
            Array.isArray(post?.tags) ? post.tags : []
          )
        : []
    )
  );

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">ブログ記事一覧</h1>
      <div className="flex justify-end">
        {session ? (
          <>
            <Link
              href="/works/blog-app/new"
              className="bg-blue-600 text-white px-3 py-1 mr-3 rounded hover:bg-blue-700 transition"
            >
              新規投稿
            </Link>
            <AuthButton />
          </>
        ) : (
          <AuthButton />
        )}
      </div>
      <PostFilter tags={tags} />
      <PostList />
    </main>
  );
}
