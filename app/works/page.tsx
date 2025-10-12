// app/works/page.tsx
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Works | Kosuke Masaki Portfolio",
  description: "制作物一覧ページです。ブログアプリやTodoアプリを紹介します。",
};

const projects = [
  {
    title: "Blog CMS",
    slug: "blog-app",
    description: "記事のCRUD機能付きブログアプリ",
    reason: "記事の管理やデータ取得の仕組みを学ぶために作成",
    tech: ["Next.js", "SWR", "Tailwind", "Zustand"],
    thumbnail: "/thumbnails/sample.png",
    demo: "/works/blog-app",
  },
  {
    title: "Todo App",
    slug: "todo-app",
    description: "タスク管理アプリ（状態管理練習）",
    reason: "状態管理(Zustand)とローカルストレージ永続化の学習目的で作成",
    tech: ["React", "Zustand", "Tailwind"],
    thumbnail: "/thumbnails/sample.png",
    demo: "/works/todo-app",
  },
  {
    title: "Mini EC",
    slug: "ec-app",
    description: "商品一覧＋お気に入り機能",
    reason: "API連携やUI設計を学ぶために作成",
    tech: ["Next.js", "API", "Tailwind"],
    thumbnail: "/thumbnails/sample.png",
    demo: "/works/ec-app",
  },
];

export default function Works() {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-12">
      <section className="max-w-5xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold">Works</h2>
        <p className="text-gray-600">
          これまで制作したWebアプリの一覧です。各プロジェクトの詳細ページからデモをご覧いただけます。
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={project.demo}
              className="flex flex-col md:flex-row bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition overflow-hidden group"
            >
              {/* サムネ画像 */}
              {project.thumbnail && (
                <div className="md:w-1/3 w-full relative h-full overflow-clip">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
              )}

              {/* テキスト部分 */}
              <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 mb-2">{project.description}</p>
                  {/* 制作理由 */}
                  <p className="text-gray-500 text-sm mb-4">{project.reason}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-200 rounded-full text-sm text-gray-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
