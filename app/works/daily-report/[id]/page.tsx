import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/app/works/daily-report/lib/supabaseClient";

// 日付部分だけを比較する関数
const isSameDate = (date1: string, date2: string): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  const post = {
    id: data.id,
    title: data.title,
    content: data.content,
    tags: data.tags ?? [],
    status: data.status ?? "draft",
    createdAt: data.created_at,
    updatedAt: data.updated_at ?? null,
    checked: data.checked ?? false,
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="mt-2 text-gray-500">
          {post.tags?.map((tag: string) => (
            <span
              key={tag}
              className="mr-2 inline-block rounded-full bg-gray-100 px-2 py-1 text-sm"
            >
              #{tag}
            </span>
          ))}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          作成日：{new Date(post.createdAt).toLocaleDateString("ja-JP")}
          {post.updatedAt && !isSameDate(post.createdAt, post.updatedAt) && (
            <>
              <span className="mx-2">|</span>
              更新日：{new Date(post.updatedAt).toLocaleDateString("ja-JP")}
            </>
          )}
        </p>
      </div>

      <div className="border-t pt-4 leading-relaxed whitespace-pre-wrap text-gray-800">
        {post.content}
      </div>

      <div className="flex items-center justify-between border-t pt-6">
        <Link
          href="/works/daily-report"
          className="text-blue-500 hover:underline"
        >
          ← 一覧に戻る
        </Link>
      </div>
    </div>
  );
}
