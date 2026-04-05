"use client";

import MoodForm from "./components/MoodForm";
import MoodList from "./components/MoodList";
import { HeartPulse, Sparkles } from "lucide-react";

export type Mood = 1 | 2 | 3 | 4 | 5;

export type MoodLog = {
  id: string;
  date: string;
  mood: Mood;
  note: string;
};

export default function MoodApp() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(253,230,138,0.45),_transparent_34%),linear-gradient(180deg,_#fffaf0_0%,_#fff7ed_38%,_#ffffff_100%)] px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <section className="overflow-hidden rounded-[2rem] border border-orange-100/80 bg-white/85 shadow-[0_22px_60px_-28px_rgba(194,65,12,0.28)] backdrop-blur">
          <div className="border-b border-orange-100 bg-[linear-gradient(135deg,_rgba(255,237,213,0.95),_rgba(255,255,255,0.72))] px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium tracking-[0.2em] text-orange-700 uppercase">
                  <Sparkles className="h-3.5 w-3.5" />
                  Mood Log
                </p>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  今日の気分をやさしく記録
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  数字とひとことメモで、その日のコンディションを軽く残せるログです。
                </p>
              </div>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-white/80 bg-white/85 px-4 py-3 text-sm text-slate-600 shadow-sm">
                <HeartPulse className="h-5 w-5 text-orange-500" />
                自分の変化を見返しやすく
              </div>
            </div>
          </div>

          <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
            <MoodForm />
            <MoodList />
          </div>
        </section>
      </div>
    </main>
  );
}
