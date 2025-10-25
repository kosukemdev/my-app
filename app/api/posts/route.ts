import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app/api/posts/data.json");

function readData() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const posts = readData();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const posts = readData();

  const newPost = {
    id: posts.length ? Math.max(...posts.map((p: any) => p.id)) + 1 : 1,
    title: body.title,
    content: body.content,
    tag: body.tag,
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);
  writeData(posts);

  return NextResponse.json(newPost, {status: 201});
}