import { getServerSession } from "next-auth";
import authOptions, { safeGetServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
  const session = await safeGetServerSession();
  if (!session) {
    // ログインしていないなら一覧へリダイレクト
    redirect("/works/blog-app");
  }

  // PostForm はクライアントコンポーネントのラッパーを通してレンダリング
  const NewPostClientWrapper = (await import("./NewPostClientWrapper")).default;
  return <NewPostClientWrapper />;
}
