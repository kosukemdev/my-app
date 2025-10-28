"use client";

import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TagInput from "./TagInput";
import Link from "next/link";

const schema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  content: z.string().min(1, "本文は必須です"),
  tags: z.array(z.string()).default([]),
  status: z.enum(["published", "draft"]),
});

export type PostFormData = z.infer<typeof schema>;

type PostFormProps = {
  defaultValues?: Partial<PostFormData>;
  onSubmit: SubmitHandler<PostFormData>;
  isSubmitting?: boolean;
  submitLabel: string;
  backLink: string;
};

export default function PostForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel,
  backLink,
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(schema) as Resolver<PostFormData>,
    defaultValues: defaultValues || {
      title: "",
      content: "",
      tags: [],
      status: "draft",
    },
  });

  const tags = watch("tags") || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 公開状態 */}
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

      {/* タイトル */}
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

      {/* 内容 */}
      <div>
        <label className="block text-sm font-semibold mb-1">内容</label>
        <textarea
          {...register("content")}
          rows={6}
          className="w-full border rounded p-2 h-32"
          placeholder="本文を入力"
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      {/* タグ */}
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

      {/* ボタン */}
      <div className="flex justify-between items-center">
        <Link href={backLink} className="text-blue-500 hover:underline">
          ← 戻る
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {isSubmitting ? "送信中..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
