import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

// GET: 投稿一覧
export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

// POST: 新規投稿
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
  }

  try {
    const { title, content, tags } = await req.json();

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        tags: tags.join(","), // カンマ区切りにして保存
        ownerEmail: session.user?.email ?? null,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "作成に失敗しました" }, { status: 400 });
  }
}
