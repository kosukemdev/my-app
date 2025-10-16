"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { X } from "lucide-react";

type FormData = {
  title: string;
  content: string;
  tags: string[];
};

export default function PostForm({
  initialTitle = "",
  initialContent = "",
  initialTags = [],
  submitLabel = "送信",
  onSubmit,
  cancelHref = "/works/blog-app",
  cancelLabel = "← 記事一覧に戻る",
  loading = false,
  loadingLabel,
}: {
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];
  submitLabel?: string;
  onSubmit: (data: FormData) => Promise<void> | void;
  cancelHref?: string;
  cancelLabel?: string;
  loading?: boolean;
  loadingLabel?: string;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState<string[]>(initialTags || []);
  const [inputTag, setInputTag] = useState("");

  // タイトルの初期値を反映
  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  // 本文の初期値を反映
  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  // タグの初期値を反映
  // initialTags は props の配列なので依存配列にそのまま渡す
  useEffect(() => {
    setTags((prev) => {
      const next = initialTags || [];
      // shallow compare to avoid unnecessary state updates
      if (prev.length === next.length && prev.every((v, i) => v === next[i])) {
        return prev;
      }
      return next;
    });
  }, [initialTags]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
    }

    if (e.key === "Enter" && inputTag.trim() !== "") {
      e.preventDefault();
      const newTags = inputTag
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== "");
      setTags((prev) => [...new Set([...prev, ...newTags])]);
      setInputTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("タイトルと本文は必須です。");
      return;
    }

    await onSubmit({ title, content, tags });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {submitLabel === "投稿する" ? "新規記事作成" : "記事を編集"}
      </h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">タイトル</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="記事タイトルを入力"
              disabled={loading}
              className="border rounded-lg bg-white p-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              本文（Markdown対応）
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Markdown形式で本文を入力"
              rows={10}
              disabled={loading}
              className="border rounded-lg bg-white p-2 w-full"
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

            <input
              type="text"
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="例: React,Next.js,Markdown"
              disabled={loading}
              className="border rounded-lg bg-white p-2 w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed "
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? loadingLabel || "処理中..." : submitLabel}
          </button>
        </div>

        <div className="mt-7 border rounded-lg p-4 bg-white overflow-auto prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content || "ここにMarkdownプレビューが表示されます。"}
          </ReactMarkdown>
        </div>
      </form>

      <div className="flex justify-center">
        <Link
          href={cancelHref}
          className="px-6 py-2 bg-[#918DB1] text-[#323b50] font-semibold rounded hover:bg-[#7787aa] hover:text-white transition cursor-pointer"
        >
          {cancelLabel}
        </Link>
      </div>
    </div>
  );
}
