// app/works/page.tsx (Works一覧ページ雛形)
import Link from 'next/link';

const projects = [
  {
    title: 'Blog CMS',
    slug: 'blog-app',
    description: '記事のCRUD機能付きブログアプリ',
    tech: ['Next.js', 'SWR', 'Tailwind']
  },
  {
    title: 'Todo App',
    slug: 'todo-app',
    description: 'タスク管理アプリ（状態管理練習）',
    tech: ['React', 'Zustand', 'Tailwind']
  },
  {
    title: 'Mini EC',
    slug: 'ec-app',
    description: '商品一覧＋お気に入り機能',
    tech: ['Next.js', 'API', 'Tailwind']
  }
];

export default function Works() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-gray-100 px-4 py-12">
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Works</h2>
        <p className="text-gray-400 mb-8">
          これまで制作したWebアプリの一覧です。各プロジェクトの詳細ページからデモや技術解説をご覧いただけます。
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map(project => (
            <Link key={project.slug} href={`/works/${project.slug}`}>
              <div className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-300 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-gray-700 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
