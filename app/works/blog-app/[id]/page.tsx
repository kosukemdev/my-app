import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { getServerSession } from "next-auth";
import authOptions, { safeGetServerSession } from "@/lib/auth";
import PostActions from "../components/PostActions";
export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let post = null;
  try {
    post = await prisma.post.findUnique({ where: { id: Number(id) } });
  } catch (err) {
    console.error("Failed to fetch post in BlogDetailPage:", err);
    post = null;
  }

  if (!post) {
    return (
      <p className="text-center mt-10 text-red-500">記事が見つかりません。</p>
    );
  }

  // セッションを参照して編集/削除ボタンの表示判断
  const session = await safeGetServerSession();

  const tags = typeof post.tags === "string" ? post.tags.split(",") : [];

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
        {session && <PostActions postId={post.id} />}
      </div>

      <div className="space-x-2 mt-4">
        {tags.map((tag: string) => (
          <span key={tag} className="px-3 py-1 rounded-full border bg-gray-100">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        <p className="text-sm text-gray-500 mt-4">作成日: {new Date(post.createdAt).toLocaleString()}</p>
        {post.updatedAt && (
          <p className="text-sm text-gray-500 mt-4">更新日: {new Date(post.updatedAt).toLocaleString()}</p>
        )}
      </div>

      <article className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>

      <div className="flex justify-center mt-10">
        <Link
          href="/works/blog-app"
          className="px-6 py-2 bg-[#918DB1] text-[#323b50] font-semibold rounded hover:bg-[#7787aa] hover:text-white transition cursor-pointer"
        >
          ← 記事一覧に戻る
        </Link>
      </div>
    </main>
  );
}
