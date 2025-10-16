"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetcher } from "../utils/fetcher";

export default function PostActions({ postId }: { postId: number }) {
  const router = useRouter();

  return (
    <div>
      <Link
        href={`/works/blog-app/edit/${postId}`}
        className="inline-block mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition cursor-pointer mr-2"
      >
        編集する
      </Link>
      <button
        onClick={async () => {
          if (!confirm("本当に削除しますか？")) return;
          try {
            await fetcher(`/works/blog-app/api/posts/${postId}`, { method: "DELETE" });
            alert("記事を削除しました。");
            router.push("/works/blog-app");
          } catch (err: unknown) {
            console.error(err);
            const status = (err as { status?: number })?.status;
            if (status === 401) {
              alert("ログインが必要です。ログインして再度お試しください。");
            } else if (status === 403) {
              alert("削除する権限がありません。");
            } else {
              alert("記事の削除に失敗しました。");
            }
          }
        }}
        className="inline-block mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
      >
        削除する
      </button>
    </div>
  );
}
