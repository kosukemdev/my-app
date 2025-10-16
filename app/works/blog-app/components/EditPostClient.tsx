"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useSWR, { mutate, useSWRConfig } from "swr";
import type { Post } from '@prisma/client'
import PostForm from "./PostForm";
import { fetcher } from "../utils/fetcher";

export default function EditPostClient({
  id,
  initialPost,
}: {
  id: string;
  initialPost?: Post | null;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const detailKey = `/works/blog-app/api/posts/${id}`;
  const { data: post, error } = useSWR<Post | null>(detailKey, fetcher, {
    fallbackData: initialPost,
  });

  // SWR のグローバルキャッシュ参照（ロールバック用に使用）
  const { cache } = useSWRConfig();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // postマウント時にフォームの初期値をセット
  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setTags(post.tags ? post.tags.split(",") : []);
    }
  }, [post]);

  if (status === "loading") return <p>読み込み中...</p>;
  if (!session) {
    router.push("/works/blog-app");
    // redirect() はコンポーネント内で使えないので、router.push() を使う
    // push() は非同期なので、念のため null を返しておく
    return null;
  }

  if (error) return <p>エラーが発生しました。</p>;
  if (post === undefined) return <p>読み込み中...</p>;
  if (post === null) return <p>投稿が見つかりませんでした。</p>;


  // PostFormのsubmit時に呼ばれる
  const handleSubmit = async (data: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    const updated = data;
    setLoading(true);
    try {
      const updatedPost = await fetcher(`/works/blog-app/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      // 既存の一覧キャッシュを保存しておく（ロールバック用）
      const listKey = "/works/blog-app/api/posts";
      const detailKey = `/works/blog-app/api/posts/${id}`;
      const previousList = (cache.get(listKey) as Post[] | undefined) ?? null;

      try {
        await mutate(
          listKey,
          (curr: Post[] | undefined) => {
            if (!curr) return curr;
            return curr.map((p: Post) =>
              p.id === (updatedPost as Post).id ? (updatedPost as Post) : p
            );
          },
          { revalidate: false }
        );

        await mutate(detailKey, updatedPost as Post, { revalidate: false });

        await mutate(listKey);
        await mutate(detailKey);

        router.push(`/works/blog-app/${id}`);
      } catch (mutateErr) {
        console.error(mutateErr);
        if (previousList) {
          await mutate(listKey, previousList, { revalidate: false });
        }
        alert("更新中に問題が発生しました。もう一度お試しください。");
      }
    } catch (err: unknown) {
      const e = err as unknown;
      console.error(e);
      const status = (e as { status?: number })?.status;
      if (status === 401) {
        alert("ログインが必要です。ログインして再度お試しください。");
      } else if (status === 403) {
        alert("権限がありません。編集できるユーザーでログインしてください。");
      } else {
        alert("更新に失敗しました。");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostForm
      initialTitle={title}
      initialContent={content}
      initialTags={tags}
      submitLabel="更新する"
      onSubmit={handleSubmit}
      cancelHref={`/works/blog-app/${id}`}
      cancelLabel="← 記事詳細に戻る"
      loading={loading}
      loadingLabel="更新中..."
    />
  );
}
