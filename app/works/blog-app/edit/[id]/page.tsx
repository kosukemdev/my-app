import EditPostClient from "../../components/EditPostClient";
import type { Post } from "../../types";
import { serializePost } from "../../types";
import { getServerSession } from "next-auth";
import authOptions, { safeGetServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // サーバー側でセッション確認。未ログインなら一覧へリダイレクト
  const session = await safeGetServerSession();
  if (!session) {
    redirect("/works/blog-app");
  }

  // サーバーで投稿をプリフェッチしてクライアントに渡す
  let post = null as (Post | null);
  try {
    const posts = await prisma.post.findMany();
    const found = posts.find((p) => p.id === Number(id)) ?? null;
    post = found ? serializePost(found) : null;
  } catch (err) {
    console.error("Failed to fetch posts in EditPostPage:", err);
    post = null;
  }

  return <EditPostClient id={id} initialPost={post as Post | null} />;
}
