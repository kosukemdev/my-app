"use client";

import { useParams, useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/fetcher";
import { Post } from '@/app/works/blog/page';
import { useEffect, useState } from "react";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: post, error } = useSWR<Post>(
    id ? `/api/posts/${id}` : null,
    fetcher
  );

  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setTag(post.tag);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, tag, content }),
      });

      if (!res.ok) throw new Error("更新に失敗しました。");

      const updatedPost = await res.json();

      mutate(`/api/posts/${id}`, updatedPost, false);
      mutate(
        "/api/posts",
        (prev?: Post[]) =>
          prev
            ? prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
            : [],
        false
      );

      router.push(`/works/blog/${id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("更新中にエラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) return <p className="p-6">データ取得に失敗しました。</p>;
  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">記事を編集</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">タグ</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w=full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">内容</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded p-2 h-32"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {isSubmitting ? "更新中,,," : "更新する"}
        </button>
      </form>
    </div>
  );
}
