import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { Post } from "@/types/post";

// ✅ 投稿詳細取得（GET）
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

  const post: Post = {
    id: data.id,
    title: data.title,
    content: data.content,
    tags: data.tags ?? [],
    status: data.status ?? "draft",
    createdAt: data.created_at,
    liked: data.liked ?? false,
  };

  return NextResponse.json(post);
}

// ✅ 投稿更新（PUT）
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content, tags, status, liked } = await req.json();

    const { id } = (await params) as { id: string };

    const { data, error } = await supabase
      .from("posts")
      .update({ title, content, tags, status, liked })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Error updating post:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("PUT Error:", err.message);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// ✅ 投稿削除（DELETE）
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = (await params) as { id: string };

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting post:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
