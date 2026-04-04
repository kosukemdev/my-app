import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Layers3, Sparkles } from "lucide-react";

export const revalidate = 60;

const projects = [
  {
    title: "業務日報アプリ",
    slug: "daily-report",
    description:
      "工場業務の進捗記録・共有をイメージして作成した日報管理アプリです。実務の課題感をもとに、投稿・検索・絞り込み・公開管理まで一連の流れを実装しました。",
    thumbnail: "/thumbnails/daily-report.jpeg",
    demo: "/works/daily-report",
    readme: "/app/works/daily-report/README.md",
    tech: ["Next.js", "TypeScript", "Supabase", "SWR", "NextAuth"],
    focus: [
      "CRUD と API Routes の設計",
      "タグ・キーワードによる一覧性の改善",
      "下書き / 公開 / 確認済みの状態管理",
    ],
    learning:
      "App Router での画面構成、DB と繋がる CRUD、クライアント側の再取得と楽観的更新をまとめて学習しました。",
  },
  {
    title: "気分記録アプリ",
    slug: "mood-log",
    description:
      "日々の気分とメモを手軽に残せる小さなログアプリです。シンプルなUIの中で、状態管理とローカル永続化の扱いを整理する目的で制作しました。",
    thumbnail: "/thumbnails/mood-log.jpeg",
    demo: "/works/mood-log",
    readme: "/app/works/mood-log/README.md",
    tech: ["Next.js", "TypeScript", "Zustand", "Tailwind CSS"],
    focus: [
      "Zustand による状態の一元管理",
      "入力・編集・削除のUI切り分け",
      "永続化を含めた小規模アプリ設計",
    ],
    learning:
      "props の受け渡しを減らしながら、機能ごとに責務を分ける設計を意識して実装しました。",
  },
];

export default function Works() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#ffffff_40%,_#eff6ff_100%)] px-6 py-12 text-slate-900 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.42)] backdrop-blur">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
              Works
            </p>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
              課題設定から実装までを意識して作った作品です
            </h1>
            <p className="mt-4 leading-8 text-slate-600">
              どの作品も、学習用に終わらせず「何を解決したいアプリなのか」「どの技術をなぜ選んだか」が伝わる形を意識して制作しています。
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <Layers3 className="h-5 w-5 text-sky-600" />
                <h2 className="font-semibold text-slate-900">見てほしいポイント</h2>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                UI だけでなく、データ取得、状態管理、設計の整理まで含めて取り組んでいます。
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-orange-600" />
                <h2 className="font-semibold text-slate-900">制作スタンス</h2>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                実務を意識して、課題の背景、機能の優先順位、保守しやすい責務分割を考えながら実装しています。
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_26px_70px_-46px_rgba(15,23,42,0.45)]"
            >
              <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
                <div className="relative min-h-[240px] bg-slate-200">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-8">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900">
                        {project.title}
                      </h2>
                      <p className="mt-3 max-w-3xl leading-8 text-slate-600">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-3">
                      <Link
                        href={project.demo}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                      >
                        デモを見る
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-3">
                    {project.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-800"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <h3 className="text-sm font-semibold tracking-[0.16em] text-slate-500 uppercase">
                        工夫したポイント
                      </h3>
                      <ul className="mt-3 space-y-3 text-sm leading-7 text-slate-700">
                        {project.focus.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-3xl bg-sky-50 p-5">
                      <h3 className="text-sm font-semibold tracking-[0.16em] text-sky-700 uppercase">
                        学び
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-700">
                        {project.learning}
                      </p>
                      <p className="mt-4 text-sm text-slate-500">
                        詳細ドキュメント:
                        <span className="ml-2 font-mono text-xs text-slate-700">
                          {project.readme}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
