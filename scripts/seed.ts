import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const dataPath = path.join(
    process.cwd(),
    "app",
    "works",
    "blog-app",
    "api",
    "posts",
    "posts.json"
  );

  const raw = fs.readFileSync(dataPath, "utf8");
  const posts = JSON.parse(raw);

  console.log(`📦 ${posts.length} 件の投稿をDBに移行します...`);

  for (const post of posts) {
    await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        tags: post.tags.join(","), // カンマ区切りで保存
        createdAt: new Date(post.createdAt),
        ownerEmail: post.ownerEmail || null,
      },
    });
  }
  console.log("✅ 移行完了！");
}

main()
  .catch((e) => {
    console.error("❌ エラー:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
