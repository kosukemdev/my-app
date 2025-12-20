// app/works/page.tsx
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

const projects = [
  {
    title: "業務日報アプリ",
    slug: "daily-report",
    description:
      "工場業務の進捗記録・共有を目的とした日報管理アプリです。前職での経験から、業務日報をデジタルで管理できる仕組みを作りたいと考え制作しました。",
    thumbnail: "/thumbnails/daily-report.jpeg",
    demo: "/works/daily-report",
  },
  {
    title: "気分記録アプリ",
    slug: "mood-log",
    description:
      "毎日の気分を記録するアプリです。Zustandの学習のために制作。",
    thumbnail: "/thumbnails/mood-log.jpeg",
    demo: "/works/mood-log",
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
