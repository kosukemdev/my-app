// prisma.config.ts
import { defineConfig } from "@prisma/config";

// @ts-expect-error: Prismaの型定義にseedオプションがまだ未定義
export default defineConfig({
  seed: "ts-node --esm prisma/seed.ts",
});
