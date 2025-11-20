import { NextResponse } from "next/server";
import { supabase } from "@/app/works/daily-report/lib/supabaseClient";
import { Post } from "@/app/works/daily-report/types/post";

export async function GET() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // created_at → createdAtに変換
  const posts: Post[] =
    data?.map((p) => ({
      id: p.id,
      title: p.title,
      content: p.content,
      tags: p.tags ?? [],
      status: p.status ?? "draft",
      createdAt: p.created_at,
      checked: p.checked ?? false,
    })) ?? [];

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, tags, status, checked } = body;

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          content,
          tags: tags ?? [],
          status: status ?? "draft",
          created_at: new Date().toISOString(),
          checked: checked ?? false,
        },
      ])
      .select("*")
      .single();

    if (error) {
      console.error("Error creating post:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const post: Post = {
      id: data.id,
      title: data.title,
      content: data.content,
      tags: data.tags ?? [],
      status: data.status,
      createdAt: data.created_at,
      checked: data.checked,
    };

    return NextResponse.json(post, { status: 201 });
  } catch (err: any) {
    console.error("POST Error:", err.message);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
