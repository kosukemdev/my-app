"use client";

import { useMoodStore } from "../store/moodStore";
import { MoodItem } from "./moodItem";

export default function MoodList() {
  const logs = useMoodStore((s) => s.logs);
  const today = new Date().toLocaleDateString();

  if (logs.length === 0) {
    return <p className="mt-4 text-gray-500">まだ記録がありません</p>;
  }

  return (
    <ul className="mt-4 space-y-3">
      {logs.map((log) => (
        <MoodItem key={log.id} log={log} isToday={log.date === today} />
      ))}
    </ul>
  );
}
