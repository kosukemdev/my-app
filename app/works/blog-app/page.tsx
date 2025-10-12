"use client";

import PostList from "./components/PostList";
import PostFilter from "./components/Postfilter";
import useSWR from "swr";
import AuthButton from "./components/AuthButton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogAppPage() {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR("/works/blog-app/api/posts", fetcher);

  if (isLoading) return <p className="text-center mt-10">読み込み中...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">エラーが発生しました。</p>
    );

  const tags: string[] = Array.from(
    new Set(posts.flatMap((post: any) => post.tags))
  );

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">ブログ記事一覧</h1>
      <div className="flex justify-end">
        <AuthButton />
      </div>
      <PostFilter tags={tags} />
      <PostList />
    </main>
  );
}
