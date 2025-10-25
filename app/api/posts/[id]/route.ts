import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app/api/posts/data.json");

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const posts = readData();
  const post = posts.find((p: any) => p.id === Number(params.id));

  if (!post) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const posts = readData();
  const index = posts.findIndex((p: any) => p.id === Number(params.id));

  if (index === -1)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  const body = await req.json();
  posts[index] = { ...posts[index], ...body };
  writeData(posts);

  return NextResponse.json(posts[index]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const posts = readData();
  const filtered = posts.filter((p: any) => p.id !== Number(params.id));

  if (filtered.length === posts.length)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  writeData(filtered);
  return NextResponse.json({ message: "削除しました" });
}
