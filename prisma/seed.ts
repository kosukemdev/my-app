import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // 既存データ削除（毎回初期化）
  await prisma.post.deleteMany();

  // サンプルデータ挿入
  await prisma.post.createMany({
    data: [
      {
        id: 1,
        title: "Post 1",
        content: "Content for post 1",
        tags: "tag1,tag2",
        createdAt: new Date(),
      },
      {
        id: 2,
        title: "Post 2",
        content: "Content for post 2",
        tags: "tag2,tag3",
        createdAt: new Date(),
      },
      {
        id: 3,
        title: "Post 3",
        content: "Content for post 3",
        tags: "tag1,tag3",
        createdAt: new Date(),
      },
    ],
  });

  console.log("✅ Seed data inserted!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
