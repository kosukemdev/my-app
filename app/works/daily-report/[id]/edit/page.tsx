"use client";

import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/app/works/daily-report/lib/fetcher";
import { useSWRConfig } from "swr";
import PostForm, { PostFormData } from "../../components/PostForm";
import { Post } from "../../types/post";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data: post, error } = useSWR<Post>(
    id ? `/works/daily-report/api/posts/${id}` : null,
    fetcher
  );

  if (error) return <p>データ取得に失敗しました。</p>;

  const handleUpdate = async (data: PostFormData) => {
    const res = await fetch(`/works/daily-report/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        checked: post?.checked ?? false,
      }),
    });
    if (!res.ok) throw new Error("更新に失敗しました。");

    mutate("/works/daily-report/api/posts");
    router.push(`/works/daily-report/${id}`);
  };

  // Post型からPostFormData型に変換
  const formData: PostFormData = {
    title: post?.title ?? "",
    content: post?.content ?? "",
    tags: post?.tags ?? [],
    status: (post?.status as "published" | "draft") ?? "draft",
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">日報を編集</h1>
      <PostForm
        defaultValues={formData}
        onSubmit={handleUpdate}
        submitLabel="更新する"
        backLink={"/works/daily-report"}
      />
    </div>
  );
}
