import Link from "next/link";
import { notFound } from "next/navigation";
import { Post } from "@/app/works/blog/types/post";

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  // params is passed directly — no need to await
  const { id } = params;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const res = await fetch(
    `${baseUrl.replace(/\/$/, "")}/works/blog/api/posts/${id}`,
    {
      cache: "no-store",
    }
  );

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
        <p className="text-xs text-gray-500 mt-2">
          {new Date(post.createdAt).toLocaleDateString("ja-JP")}
        </p>
      </div>

      <div className="border-t pt-4 text-gray-800 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>

      <div className="flex justify-between items-center border-t pt-6">
        <Link href="/works/blog" className="text-blue-500 hover:underline">
          ← 一覧に戻る
        </Link>
      </div>
    </div>
  );
}
