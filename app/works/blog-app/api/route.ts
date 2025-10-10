import { NextResponse } from "next/server";
import { readPosts, writePosts } from "../lib/posts";

//GET :記事一覧を返す
export async function GET() {
  const posts = readPosts();
  return NextResponse.json(posts);
}

//POST :新規記事を追加する
export async function POST(req: Request) {
  const { title, content } = await req.json();
  const posts = readPosts();

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    tags: [], // 空のタグ配列を追加
  };

  posts.push(newPost);
  writePosts(posts);

  return NextResponse.json(newPost, { status: 201 });
}

// DELETE :記事を削除する
export async function DELETE(req: Request) {
  const { id } = await req.json();
  let posts = readPosts();
  posts = posts.filter((post) => post.id !== id);
  writePosts(posts);
  return NextResponse.json({ message: "削除しました" }, { status: 200 });
}
