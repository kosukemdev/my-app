"use client";

import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import TagInput from "../components/TagInput";
import Link from "next/link";

const schema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  content: z.string().min(1, "本文は必須です"),
  tags: z.array(z.string().min(1, "タグは必須です")),
  status: z.enum(["published", "draft"] as const),
});

type FormData = z.infer<typeof schema>;

export default function NewPostPage() {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const tags = watch("tags") || [];

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("投稿に失敗しました。");
      }

      mutate("/api/posts");

      reset();
      router.push("/works/blog");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("投稿中にエラーが発生しました。");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">新規投稿</h1>
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
            {...register("title")}
            className="w-full border rounded p-2"
            placeholder="タイトルを入力"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">内容</label>
          <textarea
            {...register("content")}
            rows={6}
            placeholder="本文を入力"
            className="w-full border rounded p-2 h-32"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">タグ</label>
          <TagInput
            value={tags}
            onChange={(newTags: string[]) => setValue("tags", newTags)}
          />
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <Link href="/works/blog" className="text-blue-500 hover:underline">
            ← 一覧に戻る
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {isSubmitting ? "投稿中..." : "投稿する"}
          </button>
        </div>
      </form>
    </div>
  );
}
