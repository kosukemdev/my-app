'use client';

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-800 px-4">
      <section className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <p className="text-lg text-gray-400">Frontend Engineer</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">正木 洸介</h2>
          <p className="text-gray-800 mt-4 leading-relaxed">
            Next.js / React / TypeScript / Tailwind / SWR / Zustand を使って
            Webアプリを開発中。
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-64 h-64">
            <Image
              src="/thumbnails/sample.png"
              alt="プロフィール"
              className="w-full h-full object-cover shadow-md rounded-full"
              width={256}
              height={256}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
