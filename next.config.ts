import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
    // デプロイ時のLintエラーを無視
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;