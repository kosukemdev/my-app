import Link from "next/link";
import PostList from "./components/PostList";
import PostFilter from "./components/Postfilter";
import AuthButton from "./components/AuthButton";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import prisma from "@/lib/prisma";
import type { Post, DbPost } from "@/lib/types";
import { serializePost } from "@/lib/types";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Blog App | Kosuke Masaki Portfolio",
  description: "シンプルなブログアプリケーションです。",
};

export default async function BlogAppPage() {
  // 公開一覧ページ: サーバーで session を取得すると build 時に
  // `headers` を使うため動的扱いになり、静的生成ができなくなる。
  // クライアント側の `AuthButton` にセッション表示を任せるためサーバーでは null にする。
  const session = null;

  // サーバーで投稿をプリフェッチ（DB エラーがあってもページをクラッシュさせない）
  let posts: Post[] = [];
  try {
  const raw = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  posts = (raw as DbPost[]).map((p) => serializePost(p));
  } catch (err) {
    console.error("Failed to fetch posts in BlogAppPage:", err);
    posts = [];
  }

  const tags = Array.from(
    new Set(
      posts
        .flatMap((post) => post.tags.split(",").map((tag) => tag.trim()))
        .filter((tag) => tag)
    )
  );

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">ブログ記事一覧</h1>
      <div className="flex justify-end">
        {session ? (
          <>
            <Link
              href="/works/blog-app/new"
              className="bg-blue-600 text-white px-3 py-1 mr-3 rounded hover:bg-blue-700 transition"
            >
              新規投稿
            </Link>
            <AuthButton />
          </>
        ) : (
          <AuthButton />
        )}
      </div>
      <PostFilter tags={tags} />
      <PostList initialPosts={posts} />
    </main>
  );
}
