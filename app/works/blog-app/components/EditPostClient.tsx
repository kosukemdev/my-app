"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EditPostClient({ id }: { id: string }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: post, error } = useSWR(
    `/works/blog-app/api/posts/${id}`,
    fetcher
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setTags(post.tags || []);
    }
  }, [post]);

  if (status === "loading") return <p>読み込み中...</p>;
  if (!session) {
    router.push("/works/blog-app");
    return null;
  }

  if (error) return <p>エラーが発生しました。</p>;
  if (!post) return <p>投稿が見つかりませんでした。</p>;

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputTag.trim() !== "") {
      e.preventDefault();
      const newTags = inputTag
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      setTags((prev) => [...new Set([...prev, ...newTags])]);
      setInputTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { title, content, tags };

    const res = await fetch(`/works/blog-app/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (res.ok) {
      const updatedPost = await res.json();

      // 既存の一覧キャッシュを保存しておく（ロールバック用）
      const listKey = "/works/blog-app/api/posts";
      const detailKey = `/works/blog-app/api/posts/${id}`;
      const previousList =
        (await mutate(listKey, undefined, {
          optimisticData: undefined,
          rollbackOnError: false,
        })) || null;

      try {
        // 一覧を楽観的に更新（await して完了を待つ）
        await mutate(
          listKey,
          (curr: any) => {
            if (!curr) return curr;
            return curr.map((p: any) =>
              p.id === updatedPost.id ? updatedPost : p
            );
          },
          { revalidate: false }
        );

        // 個別キャッシュも更新しておく
        await mutate(detailKey, updatedPost, { revalidate: false });

        // 必要ならここで再検証（整合性確保）
        await mutate(listKey);
        await mutate(detailKey);

        router.push(`/works/blog-app/${id}`);
      } catch (e) {
        // ロールバック（前の一覧があれば戻す）
        if (previousList) {
          await mutate(listKey, previousList, { revalidate: false });
        }
        alert("更新中に問題が発生しました。もう一度お試しください。");
      }
    } else {
      alert("更新に失敗しました。");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">記事を編集</h1>

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
            更新する
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
          href={`/works/blog-app/${id}`}
          className="px-6 py-2 bg-[#918DB1] text-[#323b50] font-semibold rounded hover:bg-[#7787aa] hover:text-white transition cursor-pointer"
        >
          ← 記事詳細に戻る
        </Link>
      </div>
    </div>
  );
}
