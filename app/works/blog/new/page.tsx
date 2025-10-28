"use client";

import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import PostForm, { PostFormData } from "../components/PostForm";

export default function NewPostPage() {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const handleCreate = async (data: PostFormData) => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("投稿に失敗しました。");
    }

    mutate("/api/posts");
    router.push("/works/blog");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">新規投稿</h1>
      <PostForm
        onSubmit={handleCreate}
        submitLabel="投稿する"
        backLink="/works/blog"
      />
    </div>
  );
}
