import Link from "next/link";
import { notFound } from "next/navigation";
import { Post } from "@/types/post";

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = (await params) as { id: string };

    const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/posts/${id}`, {
    cache: "no-store",
  });


  if (!res.ok) {
    return notFound();
  }
  const post: Post = await res.json();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-gray-500 mt-2">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="text-sm bg-gray-100 px-2 py-1 rounded-full mr-2 inline-block"
            >
              #{tag}
            </span>
          ))}
        </p>
      </div>

      <div className="border-t pt-4 text-gray-800 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>

      <div className="flex justify-between items-center border-t pt-6">
        <Link href="/works/blog" className="text-blue-500 hover:underline">
          ← 一覧に戻る
        </Link>

        <div className="flex gap-3">
          <Link
            href={`/works/blog/${post.id}/edit`}
            className="text-sm bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            編集
          </Link>
          <Link
            href={`/works/blog/${post.id}/delete`}
            className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            削除
          </Link>
        </div>
      </div>
    </div>
  );
}
