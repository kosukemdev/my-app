import { NextResponse } from "next/server";
import { readPosts, writePosts } from "./data";

// GETリクエストで記事一覧を返す
export async function GET() {
  const posts = readPosts();
  return NextResponse.json(posts);
}

// POST: 新規記事作成
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, tags } = body;

    if (typeof title !== "string" || typeof content !== "string" || !Array.isArray(tags)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const posts = readPosts();
    const newId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    const today = new Date().toISOString().split("T")[0];
    const newPost = {
      id: newId,
      title,
      content,
      tags,
      createdAt: today,
      updatedAt: today,
    };

    posts.push(newPost);
    await writePosts(posts);

    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}