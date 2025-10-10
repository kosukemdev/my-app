"use client";
import useSWR, { mutate } from "swr";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const {
    data: post,
    error,
    isLoading,
  } = useSWR(`/works/blog-app/api/${id}`, fetcher);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //初期値セット（postが取得できたら）
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/works/blog-app/api/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      mutate("/works/blog-app/api");
      router.push(`/works/blog-app/${id}`);
    } else {
      alert("更新に失敗しました。");
    }
  };

  if (isLoading) return <p className="text-center mt-10">読み込み中...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        データ取得に失敗しました。
      </p>
    );

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">記事の編集</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">本文</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2 rounded h-40"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          更新する
        </button>
      </form>

      <div className="flex gap-4 mt-8">
        <Link href="/works/blog-app" className="text-blue-500 hover:underline">
          ← 一覧に戻る
        </Link>
      </div>
    </div>
  );
}
