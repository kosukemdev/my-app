import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    // ログインしていないなら一覧へリダイレクト
    redirect("/works/blog-app");
  }

  // PostForm はクライアントコンポーネントのラッパーを通してレンダリング
  const NewPostClientWrapper = (await import("./NewPostClientWrapper")).default;
  return <NewPostClientWrapper />;
}
