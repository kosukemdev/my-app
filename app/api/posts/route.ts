import { NextRequest, NextResponse } from "next/server";
import fs, { stat } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app/api/posts/data.json");

function readData() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET(request: NextRequest) {
  const posts = readData();
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");

  const filtered = tag ? posts.filter((p: any) => p.tags?.includes(tag)) : posts;

  return NextResponse.json(filtered);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const posts = readData();

  const newPost = {
    id: posts.length ? Math.max(...posts.map((p: any) => p.id)) + 1 : 1,
    title: body.title,
    content: body.content,
    tags: body.tags || [],
    status: body.status || "draft",
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);
  writeData(posts);

  return NextResponse.json(newPost, {status: 201});
}