import { NextResponse } from "next/server";

const posts = [
  {
    id: 1,
    title: "Next.jsでブログを作ってみた",
    content:
      "## はじめに\nこれはMarkdown形式の記事です。\n\n- App Router構成\n- SWRでフェッチ",
    tags: ["Next.js", "React"],
    createdAt: "2025-10-07",
    updatedAt: "2025-10-07",
  },
  {
    id: 2,
    title: "SWRを使ったデータフェッチの基本",
    content:
      "SWRを使うとキャッシュ付きのfetchが簡単にできます。\n\n```js\nconst { data } = useSWR('/api/posts', fetcher);\n```",
    tags: ["SWR", "データフェッチ"],
    createdAt: "2025-10-06",
    updatedAt: "2025-10-06",
  },
];

// /api/posts/[id] → GET　個別の記事を返す
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const {id} = await context.params;
  const post = posts.find((p) => p.id === Number(id));
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}
