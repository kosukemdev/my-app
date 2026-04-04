import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SessionProviderWrapper from "./providers/SessionProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "正木洸介 | Frontend Engineer Portfolio",
  description:
    "未経験からフロントエンドエンジニア転職を目指す正木洸介のポートフォリオ。React / Next.js を使ったWebアプリ作品や経歴、スキルを掲載しています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper>
          <Header />
          <main className="mt-16 min-h-screen">{children}</main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
