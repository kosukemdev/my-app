"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BriefcaseBusiness, Code2, PanelsTopLeft } from "lucide-react";

const strengths = [
  "前職のWeb制作で培ったHTML / CSS / JavaScript の基礎",
  "React / Next.js での状態管理・CRUD 実装",
  "使う人目線で情報設計と UI を整える姿勢",
];

const highlights = [
  {
    label: "制作経験",
    value: "LPコーディング 8ヶ月",
  },
  {
    label: "主な技術",
    value: "React / Next.js / TypeScript",
  },
  {
    label: "作品数",
    value: "2つのアプリを公開中",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,_#fffaf0_0%,_#f7f8fc_48%,_#eef3ff_100%)] text-slate-900">
      <section className="relative isolate mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-center px-6 py-16 sm:px-8 lg:px-12">
        <div className="absolute top-16 right-0 -z-10 h-64 w-64 rounded-full bg-orange-200/45 blur-3xl" />
        <div className="absolute bottom-8 left-[-4rem] -z-10 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />

        <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_0.85fr]">
          <div>
            <p className="inline-flex items-center rounded-full border border-orange-200 bg-white/75 px-4 py-1 text-sm font-medium text-orange-700 backdrop-blur">
              未経験からフロントエンドエンジニアへの転職を目指しています
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              実務の基礎を土台に、
              <br />
              React / Next.js で
              <span className="text-orange-600">使いやすいWebアプリ</span>
              を作っています。
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
              正木 洸介。前職では Web制作会社で LP を中心としたコーディングを担当しました。
              静的ページ制作の経験を起点に、現在はデータを扱う UI と保守しやすい実装を意識して、
              フロントエンド開発の学習とアプリ制作を進めています。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/works"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
              >
                作品を見る
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-6 py-3 font-medium text-slate-900 transition hover:border-slate-400 hover:bg-white"
              >
                経歴とスキルを見る
              </Link>
            </div>

            <ul className="mt-10 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
              {highlights.map((item) => (
                <li
                  key={item.label}
                  className="rounded-3xl border border-white/80 bg-white/75 p-4 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)] backdrop-blur"
                >
                  <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
                    {item.label}
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {item.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-6 rounded-[2rem] bg-[linear-gradient(145deg,_rgba(251,146,60,0.18),_rgba(59,130,246,0.16))] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_28px_70px_-36px_rgba(15,23,42,0.55)] backdrop-blur">
              <div className="flex items-center gap-4">
                <Image
                  src="/thumbnails/me_01.jpeg"
                  alt="正木洸介のプロフィール画像"
                  className="h-20 w-20 rounded-3xl object-cover"
                  width={160}
                  height={160}
                />
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Frontend Engineer Candidate
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">正木 洸介</h2>
                  <p className="mt-1 text-sm text-slate-600">宮城県仙台市在住</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {strengths.map((strength) => (
                  <div
                    key={strength}
                    className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
                  >
                    {strength}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/70 bg-white/60">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 py-10 sm:px-8 md:grid-cols-3 lg:px-12">
          <article className="rounded-3xl bg-white p-6 shadow-[0_18px_45px_-36px_rgba(15,23,42,0.55)]">
            <BriefcaseBusiness className="h-8 w-8 text-orange-600" />
            <h2 className="mt-4 text-lg font-semibold">実務の延長線上で学んでいる</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              制作会社でのコーディング経験をベースに、アプリ開発で状態管理やデータ設計まで学習範囲を広げています。
            </p>
          </article>
          <article className="rounded-3xl bg-white p-6 shadow-[0_18px_45px_-36px_rgba(15,23,42,0.55)]">
            <Code2 className="h-8 w-8 text-sky-600" />
            <h2 className="mt-4 text-lg font-semibold">見た目だけで終わらせない</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              CRUD、検索、タグ絞り込み、認証、状態管理など、ユーザーが日常的に触れる機能を実装しています。
            </p>
          </article>
          <article className="rounded-3xl bg-white p-6 shadow-[0_18px_45px_-36px_rgba(15,23,42,0.55)]">
            <PanelsTopLeft className="h-8 w-8 text-emerald-600" />
            <h2 className="mt-4 text-lg font-semibold">採用担当の方に見てほしい点</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              作品ごとに「なぜ作ったか」「どう設計したか」「何を学んだか」を整理し、技術選定の意図まで伝わるようにしています。
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
