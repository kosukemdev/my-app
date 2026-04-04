import { NextResponse } from "next/server";
import { supabase } from "@/app/works/daily-report/lib/supabaseClient";
import { Post, PostRow } from "@/app/works/daily-report/types/post";

const toPost = (row: PostRow): Post => ({
  id: row.id,
  title: row.title,
  content: row.content,
  tags: row.tags ?? [],
  status: row.status ?? "draft",
  createdAt: row.created_at,
  updatedAt: row.updated_at ?? null,
  checked: row.checked ?? false,
});

export async function GET() {
  // supabaseから直接投稿データとエラー判定を取得
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  // ここでエラー判定を使用
  if (error) {
    console.error("Error fetching posts:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // postsの定義(PostRow型をPost[]型に変換している)
  // フロントで使うPost型に変換
  const posts: Post[] = data?.map((p: PostRow) => toPost(p)) ?? [];

  // フロントエンド用に成型した投稿一覧を返す
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  try {
    // リクエストボディ（JSON)を取得
    const body = await req.json();

    // フロントから送られてきた投稿データを取り出す
    const { title, content, tags, status, checked } = body;

    // 現在時刻
    const now = new Date().toISOString();

    // Supabaseのpostsテーブルに新規投稿を作成
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          content,
          tags: tags ?? [],
          status: status ?? "draft",
          created_at: now,
          updated_at: now,
          checked: checked ?? false,
        },
      ])
      // 作成した1件の投稿を取得
      .select("*")
      .single();

    // エラーならエラーメッセージとステータス500を返す
    if (error) {
      console.error("Error creating post:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // dataをPostRow型（postsテーブルそのままの型）として定義
    const row = data as PostRow;

    // rowをPost型に変換し、投稿postを生成
    const post = toPost(row);

    // 投稿postとステータス201を返す
    return NextResponse.json(post, { status: 201 });
    // エラーの場合
  } catch (err: unknown) {
    // エラーメッセージ
    console.error(
      "POST Error:",
      err instanceof Error ? err.message : "Unknown error",
    );
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
