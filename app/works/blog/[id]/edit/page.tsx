"use client";

import { useParams, useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/fetcher";
import { Post } from "@/app/works/blog/page";
import { useEffect } from "react";
import TagInput from "../../components/TagInput";
import { useForm } from "react-hook-form";
import Link from "next/link";

type FormData = {
  title: string;
  content: string;
  tags: string[];
  status: string;
};

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: post, error } = useSWR<Post>(
    id ? `/api/posts/${id}` : null,
    fetcher
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      status: "",
    },
  });

  useEffect(() => {
    if (post) reset(post);
  }, [post, reset]);

  const Tags = watch("tags");

  const onSubmit = async (data: FormData) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("更新に失敗しました。");
    mutate("/api/posts");
    router.push(`/works/blog/${id}`);
  };

  if (error) return <p>エラーが発生しました。</p>;
  if (!post) return <p>読み込み中...</p>;

  if (error) return <p className="p-6">データ取得に失敗しました。</p>;
  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">記事を編集</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">公開状態</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input type="radio" value="published" {...register("status")} />
              公開
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" value="draft" {...register("status")} />
              下書き
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">タイトル</label>
          <input
            {...register("title", { required: true })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">内容</label>
          <textarea
            {...register("content", { required: true })}
            className="w-full border rounded p-2 h-32"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">タグ</label>
          <TagInput
            value={Tags}
            onChange={(newTags: string[]) => setValue("tags", newTags)}
          />
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <Link
            href={`/works/blog/${id}`}
            className="text-blue-500 hover:underline"
          >
            ← 戻る
          </Link>
          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
          >
            更新する
          </button>
        </div>
      </form>
    </div>
  );
}
