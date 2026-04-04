"use client";

import Image from "next/image";
import { Github, Mail, MapPin, Rocket } from "lucide-react";

const frontendSkills = [
  "HTML / CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
];

const toolSkills = [
  "Git / GitHub",
  "Vercel",
  "Supabase",
  "SWR",
  "React Hook Form",
  "Figma",
];

const timeline = [
  {
    year: "2024",
    title: "Web制作会社でコーディングを担当",
    body: "LPを中心に HTML / CSS / JavaScript を使った実装を経験し、納期を意識した制作フローを学びました。",
  },
  {
    year: "2025",
    title: "React / Next.js を使ったアプリ開発を開始",
    body: "静的ページだけでなく、状態管理やデータ取得を含むフロントエンド開発に取り組み始めました。",
  },
  {
    year: "Now",
    title: "転職に向けてポートフォリオを改善中",
    body: "課題設定、技術選定、実装の工夫が伝わるよう、作品の見せ方とコード品質の両方を磨いています。",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[linear-gradient(180deg,_#f8fafc_0%,_#ffffff_30%,_#fff7ed_100%)]">
      <div className="mx-auto max-w-6xl space-y-12 px-6 py-12 sm:px-8 lg:px-12">
        <section className="grid gap-8 rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur md:grid-cols-[220px_1fr]">
          <div className="mx-auto h-44 w-44 overflow-hidden rounded-[2rem]">
            <Image
              src="/thumbnails/me_02.jpeg"
              alt="正木洸介のプロフィール画像"
              width={320}
              height={320}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="rounded-full bg-orange-100 px-3 py-1 font-medium text-orange-700">
                Frontend Engineer Candidate
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                宮城県仙台市
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              正木 洸介
            </h1>

            <p className="mt-5 max-w-3xl leading-8 text-slate-700">
              前職では Web制作会社で約8ヶ月、LPを中心としたコーディングを担当しました。
              制作を通じて、UIを形にする楽しさと、より動的な体験を作る面白さに惹かれ、
              現在は React / Next.js を用いたアプリ開発に取り組んでいます。
              見た目を整えるだけでなく、情報設計や保守性まで含めて考えられるフロントエンドエンジニアを目指しています。
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://github.com/kosukemdev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
              >
                <Github className="h-5 w-5" />
                GitHubを見る
              </a>
              <a
                href="mailto:kosuke.m.dev@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700"
              >
                <Mail className="h-5 w-5" />
                メールで連絡する
              </a>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] bg-white p-8 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.42)]">
            <h2 className="text-2xl font-semibold text-slate-900">強み</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">伝わる UI を作る</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  見た目の整合性だけでなく、情報の優先順位や導線を考えて UI を組み立てます。
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">学びを実装に落とす</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  新しく学んだ技術を小さく試しながら、作品の中で再現性のある形に整理しています。
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">保守しやすさを意識する</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  命名、責務分割、型の扱いなど、あとから読み返しやすい実装を心がけています。
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">実務の感覚がある</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  前職の制作経験があるため、期限を意識した進め方やレビューを受ける前提での実装に慣れています。
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-[0_24px_60px_-42px_rgba(15,23,42,0.55)]">
            <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-orange-200">
              現在の目標
            </div>
            <h2 className="mt-4 text-2xl font-semibold">チームで価値を出せるフロントエンドエンジニアになる</h2>
            <p className="mt-4 leading-8 text-slate-200">
              ただ動くものを作るのではなく、ユーザーが迷わず使えて、チームで改善し続けられるアプリを作れるようになることを目標にしています。
            </p>
            <div className="mt-6 rounded-3xl bg-white/8 p-5">
              <div className="flex items-start gap-3">
                <Rocket className="mt-0.5 h-5 w-5 text-orange-300" />
                <p className="text-sm leading-7 text-slate-200">
                  今後はテスト、アクセシビリティ、複数人開発をより強化し、実務に近い品質でアウトプットできる状態を目指しています。
                </p>
              </div>
            </div>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] bg-white p-8 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.42)]">
            <h2 className="text-2xl font-semibold text-slate-900">Skills</h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase">
                  Frontend
                </h3>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {frontendSkills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-800"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase">
                  Tools & Libraries
                </h3>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {toolSkills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-800"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] bg-white p-8 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.42)]">
            <h2 className="text-2xl font-semibold text-slate-900">これまでの流れ</h2>
            <ol className="mt-6 space-y-5">
              {timeline.map((item) => (
                <li key={item.title} className="relative pl-8">
                  <span className="absolute top-1 left-0 h-3 w-3 rounded-full bg-orange-500" />
                  <p className="text-sm font-semibold text-orange-700">{item.year}</p>
                  <h3 className="mt-1 font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                </li>
              ))}
            </ol>
          </article>
        </section>
      </div>
    </div>
  );
}
