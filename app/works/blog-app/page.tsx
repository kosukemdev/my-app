"use client";

import Link from "next/link";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import { useTagStore } from "./store/tagStore";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// タイトル・本文をリアルタイムでフィルターしたい
export default function BlogAppPage() {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR("/works/blog-app/api", fetcher);
  const [query, setQuery] = useState("");
  const { selectedTags, toggleTag, clearTags } = useTagStore();

  const filteredPosts = posts?.filter((post: any) => {
    const matchesQuery =
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => post.tags.includes(tag));
    return matchesQuery && matchesTags;
  });

  const allTags: string[] = Array.from(
    new Set(posts?.flatMap((post: any) => post.tags) ?? [])
  );

  const handleDelete = async (id: number) => {
    if (!confirm("本当に削除しますか？")) return;

    //APIにDELETEを送信
    const res = await fetch("/works/blog-app/api", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      // 成功したら再フェッチ
      mutate("/works/blog-app/api");
    } else {
      alert("削除に失敗しました。");
    }
  };

  if (isLoading) return <div className="text-center mt-10">読み込み中...</div>;
  if (error)
    return (
      <div className="text-center text-red mt-10">
        データの取得に失敗しました。
      </div>
    );
  if (!posts || posts.length === 9)
    return (
      <div className="text-center mt-10">
        <p>まだ記事がありません。</p>
        <Link
          href="/works/blog-app/new"
          className="text-blue-500 hover:underline"
        >
          新規投稿
        </Link>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">ブログ一覧</h1>

      {(!posts || posts.length === 0) && <p>まだ記事がありません。</p>}

      {/* 検索ボックス */}
      <input
        type="text"
        placeholder="検索..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 mb-6 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />

      {/* タグフィルター */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full border transition ${
              selectedTags.includes(tag)
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {tag}
          </button>
        ))}
        {selectedTags.length > 0 && (
          <button
            onClick={clearTags}
            className="ml-2 text-sm text-gray-500 underline hover:text-gray-700"
          >
            タグをクリア
          </button>
        )}
      </div>

      {/* 選択中のタグ表示 */}
      {selectedTags.length > 0 && (
        <div className="mb-6 text-sm text-gray-600">
          フィルタ中のタグ:{" "}
          <span className="font-medium">{selectedTags.join(", ")}</span>
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <p>該当する記事がありません。</p>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post: any) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition flex justify-between items-start"
            >
              <div>
                <Link
                  href={`/works/blog-app/${post.id}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-gray-600 mt-1">
                  {post.content.slice(0, 40)}...
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-gray-200 px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href={`/works/blog-app/${post.id}/edit`}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm text-center"
                >
                  編集
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Link
          href="/works/blog-app/new"
          className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          新規投稿
        </Link>
      </div>
    </div>
  );
}
