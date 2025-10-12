import { NextResponse } from "next/server";

// モックデータ
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

// GETリクエストで記事一覧を返す
export async function GET() {
  return NextResponse.json(posts);
}
// NextResponse そもそもResponseとは
// ✅ 「サーバーにフェッチしたときに返ってくる入れ物がResponse」
// ✅ 「そこから .json() などで中身を取り出す」
// ✅ 「NextResponseは、それをNext.jsの世界で便利に使えるようにしたバージョン」
