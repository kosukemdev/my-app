"use client";

import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/app/works/daily-report/lib/fetcher";
import { useSWRConfig } from "swr";
import PostForm, { PostFormData } from "../../components/PostForm";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data: post, error } = useSWR<PostFormData>(
    id ? `/works/daily-report/api/posts/${id}` : null,
    fetcher
  );

  if (error) return <p>データ取得に失敗しました。</p>;
  if (!post) return <p>読み込み中...</p>;

  const handleUpdate = async (data: PostFormData) => {
    const res = await fetch(`/works/daily-report/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("更新に失敗しました。");

    mutate("/works/daily-report/api/posts");
    router.push(`/works/daily-report/${id}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">日報を編集</h1>
      <PostForm
        defaultValues={post}
        onSubmit={handleUpdate}
        submitLabel="更新する"
        backLink={"/works/daily-report"}
      />
    </div>
  );
}
