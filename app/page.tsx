// app/page.tsx (トップページ雛形)
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen pt-16 flex flex-col items-center justify-center bg-[#0f172a] text-gray-100 px-4">
      {/* Hero Section */}
      <section className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8">
        {/* 左カラム：テキスト */}
        <div className="flex-1">
          <p className="text-lg text-gray-400">Frontend Engineer</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">正木 洸介</h2>
          <p className="text-gray-300 mt-4 leading-relaxed">
            Next.js / React / TypeScript / Tailwind / SWR / Zustand を使って
            Webアプリを開発中。
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="/works">
              <button className="px-6 py-2 bg-yellow-500 text-[#0f172a] font-semibold rounded hover:bg-yellow-400 transition">
                Worksを見る
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-700 transition">
                Contact
              </button>
            </Link>
          </div>
        </div>
        {/* 右カラム：プロフィール画像 */}
        <div className="flex-1 flex justify-center">
          <div className="w-64 h-64 rounded-full bg-gray-700 overflow-hidden">
            {/* ここにプロフィール画像を置く */}
            <img
              src="/profile.jpg"
              alt="プロフィール"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mt-16 max-w-4xl w-full">
        <h3 className="text-2xl font-semibold mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {["React", "Next.js", "TypeScript", "Tailwind", "SWR", "Zustand"].map(
            (skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-gray-800 rounded-full text-sm"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </section>
    </main>
  );
}
