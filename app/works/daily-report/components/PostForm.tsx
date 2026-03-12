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
        <label className="mb-1 block font-medium">公開状態</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input type="radio" value="published" {...register("status")} />
            提出済み
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" value="draft" {...register("status")} />
            下書き（保存のみ）
          </label>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">タイトル</label>
        <input
          {...register("title")}
          className="w-full rounded border p-2"
          placeholder="タイトルを入力"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">作業内容</label>
        <textarea
          {...register("content")}
          rows={6}
          className="h-32 w-full rounded border p-2"
          placeholder="（本文）"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">タグ</label>
        <TagInput
          value={tags}
          onChange={(newTags: string[]) => setValue("tags", newTags)}
        />
        {errors.tags && (
          <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>
        )}
      </div>

      {/* ボタン */}
      <div className="flex items-center justify-between">
        <Link href={backLink} className="text-blue-500 hover:underline">
          ← 戻る
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {isSubmitting ? "送信中..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
