"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// shadcn/ui
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { X } from "lucide-react";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");

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

    console.log({
      title,
      content,
      tags,
    });
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
              タグ（カンマ区切り）
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
    </div>
  );
}
