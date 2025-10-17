import { Metadata } from "next";
import BlogClientProvider from "./components/BlogClientProvider";

// metadata はサーバーコンポーネントとしてこのレイアウトに残す
export const metadata: Metadata = {
  title: "Blog App | Kosuke Masaki Portfolio",
  description: "シンプルなブログアプリケーションです。",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BlogClientProvider>{children}</BlogClientProvider>;
}
