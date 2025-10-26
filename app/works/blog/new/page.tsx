"use client";

import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  content: z.string().min(1, "本文は必須です"),
  tag: z.string().min(1, "タグは必須です"),
});

type FormData = z.infer<typeof schema>;

export default function NewPostPage() {
  const router = useRouter();
  // const [title, setTitle] = useState("");
  // const [tag, setTag] = useState("");
  // const [content, setContent] = useState("");
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const { data: posts } = useSWR<Post[]>("/api/posts", fetcher);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useSWRConfig();

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
          <label className="block text-sm font-semibold mb-1">タグ</label>
          <input
            {...register("tag")}
            placeholder="タグを入力"
            className="w-full border rounded p-2"
          />
          {errors.tag && (
            <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {isSubmitting ? "投稿中..." : "投稿する"}
        </button>
      </form>
    </div>
  );
}
