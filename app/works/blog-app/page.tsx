import Link from "next/link";
import PostList from "./components/PostList";
import PostFilter from "./components/Postfilter";
import AuthButton from "./components/AuthButton";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function BlogAppPage() {
  // 必要ならサーバー側でセッション確認（一覧は公開でも良いので任意）
  const session = await getServerSession(authOptions);

  // サーバーで投稿をプリフェッチ
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

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
