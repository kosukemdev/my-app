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
  params: { id: string };
}) {
  const { id } = params;

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
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-gray-500 mt-2">
          {post.tags?.map((tag: string) => (
            <span
              key={tag}
              className="text-sm bg-gray-100 px-2 py-1 rounded-full mr-2 inline-block"
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

      <div className="border-t pt-4 text-gray-800 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>

      <div className="flex justify-between items-center border-t pt-6">
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
