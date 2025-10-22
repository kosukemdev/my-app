"use client";

import { useFilterStore } from "../store/useFilterStore";
import Link from "next/link";
import useSWR from "swr";
import type { Post } from "../types";

import { fetcher } from "../utils/fetcher";

export default function PostList({ initialPosts }: { initialPosts?: Post[] }) {
  const { selectedTag, keyword } = useFilterStore();
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR<Post[]>("/works/blog-app/api/posts", fetcher, {
    fallbackData: initialPosts,
  });

  if (isLoading) return <p className="text-center mt-10">読み込み中...</p>;
  if (error || !posts)
    return (
      <p className="text-center text-red-500 mt-10">エラーが発生しました。</p>
    );

  const filtered = (posts || []).filter((post: Post) => {
    // 選択されているタグをすべて含む記事だけ表示
    const matchTag =
      selectedTag.length === 0 ||
      selectedTag.every((tag) => post.tags.includes(tag));
    const matchKeyword = post.title
      .toLowerCase()
      .includes(keyword.toLowerCase());
    return matchTag && matchKeyword;
  });

  return (
    <div className="grid gap-4">
      {filtered.map((post: Post) => (
        <Link
          href={`/works/blog-app/${post.id}`}
          key={post.id}
          className="p-4 border rounded hover:shadow-lg transition"
        >
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-500">{post.tags}</p>
        </Link>
      ))}
    </div>
  );
}
