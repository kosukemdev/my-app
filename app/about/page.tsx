"use client";

import Image from "next/image";
import { Github, Download, Mail } from "lucide-react";
import { useSession } from "next-auth/react";

export default function AboutPage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
      {/* Heroセクション */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* プロフィール画像 */}
        <div className="flex-shrink-0 w-40 h-40">
          <Image
            src="/thumbnails/me_02.jpeg"
            alt="プロフィール画像"
            width={160}
            height={160}
            className="w-full h-full object-cover shadow-md rounded-full"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold">正木 洸介</h2>
          <p className="text-gray-600 leading-relaxed">
            1995年生まれ。宮城県仙台市泉区在住。
            <br />
            前職のWeb制作会社では、約8ヶ月間LPを中心にコーディング（HTML / CSS /
            JavaScript）を担当しました。
            <br />
            静的なサイト制作の中で、動的なUIやデータを扱うフロントエンド開発に興味を持ち、現在はReact
            / Next.jsを用いたアプリ開発に取り組んでいます。
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="https://github.com/kosukemdev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full font-medium transitiono bg-orange-600 text-white hover:bg-orange-700"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href="/resume.pdf"
              download
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${session ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 pointer-events-none"}`}
              aria-disabled={!session}
            >
              <Download className="w-5 h-5" />
              <span>履歴書 / Resume</span>
            </a>
            <a
              href="mailto:kosuke.m.dev@gmail"
              className="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition bg-green-600 text-white hover:bg-green-700"
            >
              <Mail className="w-5 h-5" />
              <span>メール</span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
        <h3 className="text-2xl font-semibold border-l-4 border-[#918DB1] pl-3">
          Skills
        </h3>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">Frontend</h4>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "HTML / CSS",
              "TypeScript",
              "React",
              "Next.js",
              "Tailwind CSS",
            ].map((name) => (
              <li
                key={name}
                className="flex items-center gap-2 bg-gray-100 rounded-lg py-2 px-3 text-sm font-medium"
              >
                <span className="w-2 h-2 bg-[#918DB1] rounded-full"></span>
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">Tools</h4>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "Git / GitHub",
              "Vercel（デプロイ）",
              "Supabase（DB / API）",
              "Figma（デザイン確認・コーディング）",
            ].map((name) => (
              <li
                key={name}
                className="flex items-center gap-2 bg-gray-100 rounded-lg py-2 px-3 text-sm font-medium"
              >
                <span className="w-2 h-2 bg-[#918DB1] rounded-full"></span>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mindset */}
      <section className="bg-white rounded-2xl shadow-sm p-8 space-y-4">
        <h3 className="text-2xl font-semibold border-l-4 border-[#918DB1] pl-3">
          Mindset
        </h3>
        <p className="leading-relaxed text-gray-700">
          コードを書くうえで大切にしているのは、「誰が見てもわかる」「保守しやすい」コードであることです。
          <br />
          命名規則やディレクトリ構成など、プロジェクト全体の見通しが良くなるよう細部の整理を心がけています。
          <br />
          また、小さな改善を積み重ねていくプロセスにやりがいを感じています。
        </p>
      </section>

      {/* Vision */}
      <section className="bg-white rounded-2xl shadow-sm p-8 space-y-4">
        <h3 className="text-2xl font-semibold border-l-4 border-[#918DB1] pl-3">
          Vision
        </h3>
        <p className="leading-relaxed text-gray-700">
          目指しているのは、ただ動くだけではなく、使いやすさや体験価値まで設計されたWebアプリを作ることです。
          <br />
          将来的にはチーム開発に参加し、技術だけでなくUI /
          UXの視点も持つフロントエンドエンジニアとして価値を提供できるようになりたいと考えています。
        </p>
      </section>
    </div>
  );
}
