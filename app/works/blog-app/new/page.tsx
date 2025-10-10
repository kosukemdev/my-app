"use client";

import Link from "next/link";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    //APIにPOST
    const res = await fetch("/works/blog-app/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });

    if (res.ok) {
      //mutateでキャッシュを更新
      mutate("/works/blog-app/api");

      //フォームをリセットして一覧へ戻る
      setTitle("");
      setContent("");
      router.push("/works/blog-app");
    } else {
      alert("投稿に失敗しました。");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">新規投稿ページ</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="記事タイトルを入力"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">本文</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border px-3 py-2 rounded h-40"
            placeholder="記事内容を入力"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">タグ</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="タグをカンマ区切りで入力（例: tech, life）"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          投稿する
        </button>
      </form>

      <div className="mt-6">
        <Link href="/works/blog-app" className="text-blue-500 hover:underline">
          ← 一覧に戻る
        </Link>
      </div>
    </div>
  );
}
