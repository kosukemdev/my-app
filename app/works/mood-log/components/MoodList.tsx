"use client";

import { useMoodStore } from "../store/moodStore";
import { MoodItem } from "./moodItem";

export default function MoodList() {
  const logs = useMoodStore((s) => s.logs);
  const today = new Date().toLocaleDateString();

  if (logs.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-orange-200 bg-orange-50/60 px-6 py-10 text-center text-sm text-slate-500">
        まだ記録がありません。最初の 1 件を残してみましょう。
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">これまでの記録</h2>
        <p className="text-sm text-slate-500">
          新しい順に並んでいます。今日の記録は少し強調表示されます。
        </p>
      </div>
      <ul className="space-y-3">
      {logs.map((log) => (
        <MoodItem key={log.id} log={log} isToday={log.date === today} />
      ))}
      </ul>
    </section>
  );
}
