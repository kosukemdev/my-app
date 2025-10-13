// ファイルベースの投稿ヘルパー
import fs from "fs";
import path from "path";

export type Post = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

const DATA_PATH = path.join(process.cwd(), "app", "works", "blog-app", "api", "posts", "posts.json");
  
// 投稿データを読み込み、書き込むための関数
export function readPosts(): Post[] {
  try {
    // JSONファイルを読み込み、パースして返す
    const raw = fs.readFileSync(DATA_PATH, "utf8");
    // JSON文字列を JSON.parse() で JavaScriptの配列に変換
    return JSON.parse(raw) as Post[];
  } catch (err) {
    // エラーハンドリング
    console.error("readPosts error:", err);
    // 読み込みに失敗した場合は [] を返す
    return [];
  }
}

// 投稿データを書き込む関数
export async function writePosts(posts: Post[]): Promise<void> {
  // JSON.stringify() で JavaScriptの配列を JSON文字列に変換
  // null は replacer、2 はインデントのスペース数を指定
  const data = JSON.stringify(posts, null, 2);
  // 非同期でファイルに書き込み
  await fs.promises.writeFile(DATA_PATH, data, "utf8");
}
