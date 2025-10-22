import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions, { safeGetServerSession } from "@/lib/auth";

// /api/posts/[id] → GET　個別の記事を返す
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(post);
}

// /api/posts/[id] → PUT　記事の更新を行う
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await safeGetServerSession();
  if (!session) {
    return NextResponse.json(
      { error: "ログインしてください。" },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  try {
    const body = await req.json();
    const { title, content, tags } = body;

    if (
      typeof title !== "string" ||
      typeof content !== "string" ||
      !Array.isArray(tags)
    ) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        tags: tags.join(","), // カンマ区切りで保存
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedPost);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "更新に失敗しました。" }, { status: 400 });
  }
}

// /api/posts/[id] → DELETE　記事の削除を行う
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "ログインしてください。" },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  try {
    await prisma.post.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "記事を削除しました。" });
  } catch (err) {
    return NextResponse.json({ error: "削除に失敗しました。" }, { status: 400 });
  }
}
