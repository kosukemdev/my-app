"use client";

import { SessionProvider } from "next-auth/react";
// ブログアプリをSessionProviderでラップすることで、認証情報を子コンポーネントで利用可能にする
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
