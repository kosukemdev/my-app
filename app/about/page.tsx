"use client";

import Image from "next/image";
import { Github, Download, Mail } from "lucide-react";
import { useSession } from "next-auth/react";

export default function AboutPage() {
  const { data: session } = useSession();

  return (
    <div className="mx-auto max-w-5xl space-y-16 px-6 py-12">
      {/* Heroセクション */}
      <section className="flex flex-col items-center gap-10 md:flex-row md:items-start">
        {/* プロフィール画像 */}
        <div className="h-40 w-40 flex-shrink-0">
          <Image
            src="/thumbnails/me_02.jpeg"
            alt="プロフィール画像"
            width={160}
            height={160}
            className="h-full w-full rounded-full object-cover shadow-md"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold">正木 洸介</h2>
          <p className="leading-relaxed text-gray-600">
            1995年生まれ。宮城県仙台市泉区在住。
            <br />
            前職のWeb制作会社では、約8ヶ月間LPを中心にコーディング（HTML / CSS /
            JavaScript）を担当しました。
            <br />
            静的なサイト制作の中で、動的なUIやデータを扱うフロントエンド開発に興味を持ち、現在はReact
            / Next.jsを用いたアプリ開発に取り組んでいます。
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/kosukemdev"
              target="_blank"
              rel="noopener noreferrer"
              className="transitiono flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-700"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:kosuke.m.dev@gmail"
              className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
            >
              <Mail className="h-5 w-5" />
              <span>メール</span>
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-2xl bg-white p-8 shadow-sm">
        <h3 className="border-l-4 border-[#918DB1] pl-3 text-2xl font-semibold">
          Skills
        </h3>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">Frontend</h4>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              "HTML / CSS",
              "TypeScript",
              "React",
              "Next.js",
              "Tailwind CSS",
            ].map((name) => (
              <li
                key={name}
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium"
              >
                <span className="h-2 w-2 rounded-full bg-[#918DB1]"></span>
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">Tools</h4>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              "Git / GitHub",
              "Vercel（デプロイ）",
              "Supabase（DB / API）",
              "Figma（デザイン確認・コーディング）",
            ].map((name) => (
              <li
                key={name}
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium"
              >
                <span className="h-2 w-2 rounded-full bg-[#918DB1]"></span>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mindset */}
      <section className="space-y-4 rounded-2xl bg-white p-8 shadow-sm">
        <h3 className="border-l-4 border-[#918DB1] pl-3 text-2xl font-semibold">
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
      <section className="space-y-4 rounded-2xl bg-white p-8 shadow-sm">
        <h3 className="border-l-4 border-[#918DB1] pl-3 text-2xl font-semibold">
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
