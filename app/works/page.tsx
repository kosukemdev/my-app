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
    description: "毎日の気分を記録するアプリです。Zustandの学習のために制作。",
    thumbnail: "/thumbnails/mood-log.jpeg",
    demo: "/works/mood-log",
  },
];

export default function Works() {
  return (
    <div className="min-h-screen bg-white px-4 py-12 text-gray-900">
      <section className="mx-auto max-w-5xl space-y-8">
        <h2 className="text-3xl font-bold">Works</h2>
        <p className="text-gray-600">
          これまで制作したWebアプリの一覧です。各プロジェクトの詳細ページからデモをご覧いただけます。
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={project.demo}
              className="group flex flex-col overflow-hidden rounded-lg bg-gray-100 shadow-sm transition hover:shadow-md md:flex-row"
            >
              {/* サムネ画像 */}
              {project.thumbnail && (
                <div className="relative h-full w-full overflow-clip md:w-1/3">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
              )}

              {/* テキスト部分 */}
              <div className="flex w-full flex-col justify-between p-6 md:w-2/3">
                <div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {project.title}
                  </h3>
                  <p className="mb-2 text-gray-700">{project.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
