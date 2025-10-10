import fs from "fs";
import path from "path";

export type Post = {
  id: number;
  title: string;
  content: string;
  tags: string[];
};

const filePath = path.join(process.cwd(), "data", "posts.json");

export function readPosts(): Post[] {
  try {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) as Post[];
  } catch (e) {
    console.error("readPosts error:", e);
    return [];
  }
}

export function writePosts(posts: Post[]): void {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), "utf8");
  } catch (e) {
    console.error("writePosts error:", e);
  }
}
