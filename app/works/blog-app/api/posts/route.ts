export const runtime = "nodejs";
import { NextResponse, NextRequest } from "next/server";
// import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

const prisma = new PrismaClient();

// GET: 投稿一覧
export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

// POST: 新規投稿
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
  }

  try {
    const { title, content, tags } = await req.json();

    // 最小欠番を計算して id を明示的に割り当てる。
    // 競合（同時作成）に備えリトライする。
    const maxAttempts = 5;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const created = await prisma.$transaction(async (tx: any) => {
          // 現在存在する id を昇順で取得し、最小の欠番を見つける
          const rows = await tx.post.findMany({ select: { id: true }, orderBy: { id: "asc" } });
          let nextId = 1;
          for (const r of rows) {
            if (r.id > nextId) break;
            if (r.id === nextId) nextId++;
          }

          const createdPost = await tx.post.create({
            data: {
              id: nextId,
              title,
              content,
              tags: tags.join(","), // カンマ区切りにして保存
            },
          });

          return createdPost;
        });

        return NextResponse.json(created, { status: 201 });
      } catch (err: unknown) {
        // 競合が発生した場合はリトライ
        const code = (err as any)?.code;
        // P2002とは = Prisma の一意制約違反
        if (code === "P2002" && attempt < maxAttempts) {
          // 少し待って再試行（簡単なバックオフ）
          await new Promise((res) => setTimeout(res, 50 * attempt));
          continue;
        }
        throw err;
      }
    }

    return NextResponse.json({ error: "作成に失敗しました" }, { status: 500 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "作成に失敗しました" }, { status: 400 });
  }
}
