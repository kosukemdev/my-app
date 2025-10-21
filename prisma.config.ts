// prisma.config.ts
import { defineConfig } from "@prisma/config";

export default defineConfig({
  seed: "ts-node --esm prisma/seed.ts",
});
