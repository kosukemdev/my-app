"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// shadcn/ui
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { X } from "lucide-react";
import { fetcher } from "../utils/fetcher";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/works/blog-app");
    }
  }, [status, session, router]);

  if (status === "loading") return <p>読み込み中...</p>;
  if (!session) return null;

  // タグ追加
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 入力したキーがエンターで、かつ入力タグが空白でないとき
    if (e.key === "Enter" && inputTag.trim() !== "") {
      e.preventDefault();

      const newTags = inputTag
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      setTags((prev) => [...new Set([...prev, ...newTags])]);
      setInputTag("");
    } else {
      return;
    }
  };

  // タグ削除
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // フォーム送信
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // タイトルと本文の必須チェック
    if (!title.trim() || !content.trim()) {
      alert("タイトルと本文は必須です。");
      return;
    }

    (async () => {
      try {
        const created = await fetcher("/works/blog-app/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content, tags }),
        });

  // 作成後、記事詳細へ遷移
  router.push(`/works/blog-app/${(created as any).id}`);
      } catch (err: any) {
        console.error(err);
        if (err.status === 401) {
          alert("ログインが必要です。ログインして再度お試しください。");
        } else {
          alert(`投稿に失敗しました: ${err?.message || err?.data?.error || "不明なエラー"}`);
        }
      }
    })();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">新規記事作成</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">タイトル</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="記事タイトルを入力"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              本文（Markdown対応）
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Markdown形式で本文を入力"
              rows={10}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              タグ（カンマ区切りでEnterで追加）
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>

            <Input
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="例: React,Next.js,Markdown"
            />
          </div>

          <Button type="submit" className="w-full">
            投稿する
          </Button>
        </div>

        <div className="border rounded-lg p-4 bg-white overflow-auto prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content || "ここにMarkdownプレビューが表示されます。"}
          </ReactMarkdown>
        </div>
      </form>

      <div className="flex justify-center">
        <Link
          href="/works/blog-app"
          className="px-6 py-2 bg-[#918DB1] text-[#323b50] font-semibold rounded hover:bg-[#7787aa] hover:text-white transition cursor-pointer"
        >
          ← 記事一覧に戻る
        </Link>
      </div>
    </div>
  );
}
