"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PostForm from "../components/PostForm";
import { fetcher } from "../utils/fetcher";

export default function NewPostClientWrapper() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    setLoading(true);
    try {
      const created = (await fetcher("/works/blog-app/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })) as { id: number };
      router.push(`/works/blog-app/${created.id}`);
    } catch (err: unknown) {
      console.error(err);
      const status = (err as { status?: number })?.status;
      if (status === 401) {
        alert("ログインが必要です。ログインして再度お試しください。");
      } else {
        const maybeMessage = (err as { message?: string })?.message;
        const maybeData = (err as { data?: unknown })?.data;
        let message = maybeMessage;
        if (
          !message &&
          typeof maybeData === "object" &&
          maybeData !== null &&
          "error" in (maybeData as Record<string, unknown>)
        ) {
          message = String((maybeData as Record<string, unknown>).error);
        }
        alert(`投稿に失敗しました: ${message || "不明なエラー"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostForm
      initialTags={[]}
      submitLabel="投稿する"
      onSubmit={handleSubmit}
      loading={loading}
      loadingLabel="投稿中..."
      cancelHref="/works/blog-app"
    />
  );
}
