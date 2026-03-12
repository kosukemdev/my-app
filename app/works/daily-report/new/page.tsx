// 新規投稿ページ

"use client";

import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import PostForm, { PostFormData } from "../components/PostForm";

export default function NewPostPage() {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const handleCreate = async (data: PostFormData) => {
    const res = await fetch("/works/daily-report/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("投稿に失敗しました。");
    }

    mutate("/works/daily-report/api/posts");
    router.push("/works/daily-report");
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-bold">新規投稿</h1>
      <PostForm
        onSubmit={handleCreate}
        submitLabel="投稿する"
        backLink="/works/daily-report"
      />
    </div>
  );
}
