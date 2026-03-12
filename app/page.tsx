"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-gray-800">
      <section className="flex w-full max-w-4xl flex-col items-center gap-8 md:flex-row">
        <div className="flex-1">
          <p className="text-lg text-gray-400">Frontend Engineer</p>
          <h2 className="mt-2 text-4xl font-bold md:text-5xl">正木 洸介</h2>
          <p className="mt-4 leading-relaxed text-gray-800">
            Next.js / React を使って Webアプリを開発中。
          </p>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="h-64 w-64">
            <Image
              src="/thumbnails/me_01.jpeg"
              alt="プロフィール"
              className="h-full w-full rounded-full object-cover shadow-md"
              width={256}
              height={256}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
