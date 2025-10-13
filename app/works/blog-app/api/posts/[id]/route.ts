import { NextResponse } from "next/server";
import { readPosts, writePosts } from "../data";

// /api/posts/[id] → GET　個別の記事を返す
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const posts = readPosts();
  const post = posts.find((p) => p.id === Number(id));
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

// /api/posts/[id]  → PUT　記事の更新を行う
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const posts = readPosts();
  const idx = posts.findIndex((p) => p.id === Number(id));
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const body = await req.json();
    // タイトル、コンテンツ、タグの形式を確認
    const { title, content, tags } = body;
    if (typeof title !== "string" || typeof content !== "string" || !Array.isArray(tags)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const updatedAt = new Date().toISOString().split("T")[0];
    posts[idx] = { ...posts[idx], title, content, tags, updatedAt };

    // persist
    await writePosts(posts);

    return NextResponse.json(posts[idx]);
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
