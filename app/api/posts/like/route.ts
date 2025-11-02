import { NextResponse } from "next/server";
import fs, { read } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app/api/posts/data.json");

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function PATCH(req: Request) {
  const {id} = await req.json();
  const posts = readData();

  const post = posts.find((p: any) => p.id === id);
  if (!post) {
    return NextResponse.json({ message: "投稿が見つかりませんでした。" }, { status: 404 });
  }

  // いいねをトグル
  post.liked = !post.liked;
  writeData(posts);

  return NextResponse.json(post);
}