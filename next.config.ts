import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // デプロイ時のLintエラーを無視
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
  },
  // PrismaをEdgeではなくNodeで動かす
  output: "standalone",
};

export default nextConfig;
