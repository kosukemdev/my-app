import { NextResponse } from "next/server";
import { readPosts, writePosts } from "../../lib/posts";

// GET
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const posts = readPosts();
  const post = posts.find((p) => p.id === Number(params.id));

  if (!post) {
    return NextResponse.json({ message: "記事が見つかりません" }, { status: 404 });
  }

  return NextResponse.json(post);
}

// PATCH
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const posts = readPosts();
  const index = posts.findIndex((p) => p.id === Number(params.id));
  if (index === -1) return NextResponse.json({ message: "記事が見つかりません" }, { status: 404 });

  const { title, content } = await req.json();        
  posts[index] = { ...posts[index], title, content };
  writePosts(posts);

  return NextResponse.json(posts[index]);
}

// DELETE
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  let posts = readPosts();
  posts = posts.filter((p) => p.id !== Number(params.id));
  writePosts(posts);

  return NextResponse.json({ message: "削除しました" });
}
