import { NextResponse } from "next/server";
import { readPosts, writePosts } from "./data";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

// GETリクエストで記事一覧を返す
export async function GET() {
  const posts = readPosts();
  return NextResponse.json(posts);
}

// POST: 新規記事作成
export async function POST(req: Request) {
  const session = await getServerSession(authOptions); 
  if (!session) {
    return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { title, content, tags } = body;

    if (typeof title !== "string" || typeof content !== "string" || !Array.isArray(tags)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const posts = readPosts();
    // 新しいIDを生成（既存の最大ID + 1）
    const newId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    const today = new Date().toISOString().split("T")[0];
    const newPost = {
      id: newId,
      title,
      content,
      tags,
      createdAt: today,
      ownerEmail: session.user?.email ?? null,
    };

    posts.push(newPost);
    await writePosts(posts);

    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}