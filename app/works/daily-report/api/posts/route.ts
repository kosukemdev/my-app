import { NextResponse } from "next/server";
import { supabase } from "@/app/works/daily-report/lib/supabaseClient";
import { Post, PostRow } from "@/app/works/daily-report/types/post";

export async function GET() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const posts: Post[] =
    data?.map((p: PostRow) => ({
      id: p.id,
      title: p.title,
      content: p.content,
      tags: p.tags ?? [],
      status: p.status ?? "draft",
      createdAt: p.created_at,
      updatedAt: p.updated_at ?? null,
      checked: p.checked ?? false,
    })) ?? [];

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, content, tags, status, checked } = body;

    const now = new Date().toISOString();
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
      .select("*")
      .single();

    if (error) {
      console.error("Error creating post:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
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

    return NextResponse.json(post, { status: 201 });
  } catch (err: any) {
    console.error("POST Error:", err.message);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
