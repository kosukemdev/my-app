import { NextResponse } from "next/server";
import { supabase } from "@/app/works/daily-report/lib/supabaseClient";
import { Post, PostRow } from "@/app/works/daily-report/types/post";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = (await params) as { id: string };

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Error fetching post:", error?.message);
    return NextResponse.json({ error: error?.message ?? "Not found" }, { status: 404 });
  }

  const row = data as PostRow;

  const post: Post = {
    id: row.id,
    title: row.title,
    content: row.content,
    tags: row.tags ?? [],
    status: row.status ?? "draft",
    createdAt: row.created_at,
    updatedAt: row.updated_at ?? null,
    checked: row.checked ?? false,
  };

  return NextResponse.json(post);
}

// 編集API
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // リクエストから情報を取得
    const { title, content, tags, status, checked } = await req.json();

    // 投稿IDをparamsから取得（文字列型）
    const { id } = params as { id: string };

    // 既存の投稿を取得してchecked値を保持（送信されていない場合）
    const { data: existingPost } = await supabase
      .from("posts")
      .select("checked")
      .eq("id", id)
      .single();

    // idによりpostsテーブルの該当投稿をアップデート
    const { data, error } = await supabase
      .from("posts")
      .update({
        title,
        content,
        tags,
        status,
        checked: checked ?? existingPost?.checked ?? false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single();

    // エラー時の処理
    if (error) {
      console.error("Error updating post:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // DBのRow形式（PostRow）として受け取る
    const row = data as PostRow;

    // フロント用のPost型に変換
    const post: Post = {
      id: row.id,
      title: row.title,
      content: row.content,
      tags: row.tags ?? [],
      status: row.status ?? "draft",
      createdAt: row.created_at,
      updatedAt: row.updated_at ?? null,
      checked: row.checked ?? false,
    };

    // 作成した投稿を返す
    return NextResponse.json(post);
  } catch (err: any) {
    // エラー時の処理
    console.error("PUT Error:", err.message);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params as { id: string };

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting post:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
