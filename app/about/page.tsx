// app/about/page.tsx
import Image from "next/image";
import { Github, Download, Mail, Code, Box } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About | Kosuke Masaki Portfolio",
  description: "",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
      {/* Heroセクション */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* プロフィール画像 */}
        <div className="flex-shrink-0 w-40 h-40">
          <Image
            src="/thumbnails/sample.png"
            alt="プロフィール画像"
            width={160}
            height={160}
            className="w-full h-full object-cover shadow-md rounded-full"
          />
        </div>

        {/* 自己紹介 */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">正木 洸介</h2>
          <p className="text-gray-600 leading-relaxed">
            1995年生まれ。宮城県仙台市在住。
            <br />
            前職ではWeb制作会社にて、約半年間コーディング業務を担当しました。
            <br />
            HTML /
            CSSを中心に制作経験を積む中で、JavaScriptを使った動的なUIや、Reactなどのフロントエンド開発に興味を持つようになりました。
            <br />
            現在はポートフォリオ制作を通して、実務レベルのReact /
            Next.jsアプリ開発に取り組んでいます。
          </p>

          {/* SNSリンク＋履歴書ボタン */}
          <div className="flex gap-4 flex-wrap">
            <Link
              href="https://github.com/kosukemdev"
              target="_blank"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </Link>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition"
            >
              <Download className="w-5 h-5" />
              <span>履歴書 / Resume</span>
            </a>
            <a
              href="mailto:kosuke.m.dev@gmail"
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full font-medium hover:bg-green-700 transition"
            >
              <Mail className="w-5 h-5" />
              <span>メール</span>
            </a>
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className="bg-white rounded-2xl shadow-sm p-8 space-y-4">
        <h3 className="text-2xl font-semibold border-l-4 border-[#918DB1] pl-3">
          Profile
        </h3>
        <p className="leading-relaxed text-gray-700">
          現在はフロントエンドエンジニアを目指し、ReactとNext.jsを中心に学習を進めています。
          <br />
          TypeScriptやTailwind
          CSS、Zustand、SWRなどのモダンな技術を取り入れ、実務に近い環境での開発経験を積むことを意識しています。
          <br />
          自分の手でアプリを作り上げることで、コード設計やUIの一貫性を意識できるようになってきました。
          <br />
          最近はTypeScriptの型設計や状態管理のパターンに興味を持ち、学習を続けています。
        </p>
      </section>

      {/* Skills */}
      <section className="bg-white rounded-2xl shadow-sm p-8 space-y-4">
        <h3 className="text-2xl font-semibold border-l-4 border-[#918DB1] pl-3">
          Skills
        </h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { name: "HTML / CSS", icon: Code },
            { name: "JavaScript", icon: Code },
            { name: "React", icon: Code },
            { name: "Next.js", icon: Box },
            { name: "SWR", icon: Box },
            { name: "Zustand", icon: Box },
            { name: "Tailwind CSS", icon: Code },
            { name: "Git / GitHub", icon: Code },
          ].map(({ name, icon: Icon }) => (
            <li
              key={name}
              className="flex items-center justify-center gap-2 bg-gray-100 rounded-lg py-2 px-3 text-sm font-medium hover:bg-gray-200 transition"
            >
              <Icon className="w-4 h-4" />
              {name}
            </li>
          ))}
        </ul>
      </section>

      {/* Mindset */}
      <section className="bg-white rounded-2xl shadow-sm p-8 space-y-4">
        <h3 className="text-2xl font-semibold border-l-4 border-[#918DB1] pl-3">
          Mindset
        </h3>
        <p className="leading-relaxed text-gray-700">
          コードを書くときは「誰が見ても分かる・保守しやすいこと」を大切にしています。
          <br />
          チームでの開発を意識し、命名やファイル構成など細部の整理も心がけています。
          <br />
          小さな改善を積み重ねて、より良いUI体験を作ることが楽しいと感じています。
        </p>
      </section>

      {/* Vision */}
      <section className="bg-white rounded-2xl shadow-sm p-8 space-y-4">
        <h3 className="text-2xl font-semibold border-l-4 border-[#918DB1] pl-3">
          Vision
        </h3>
        <p className="leading-relaxed text-gray-700">
          目指しているのは、ただ動くだけのWebではなく、
          「誰にとっても使いやすく、伝わるWeb体験」を作ることです。
          <br />
          将来的にはチーム開発に参加し、
          技術だけでなくUI・UXやデザインの視点からも価値を生み出せるエンジニアを目指しています。
        </p>
      </section>
    </div>
  );
}
