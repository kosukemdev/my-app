'use client';

import { useMoodStore } from "../store/moodStore";
import { MoodItem } from "./moodItem";

export default function MoodList() {
  const logs = useMoodStore((s) => s.logs);
  const today = new Date().toLocaleDateString();

  if (logs.length === 0) {
    return (
      <p className="text-gray-500 mt-4">
        まだ記録がありません
      </p>
    );
  }

  return (
    <ul className="space-y-3 mt-4">
      {logs.map((log) => (
        <MoodItem
          key={log.id}
          log={log}
          isToday={log.date === today}
        />
      ))}
    </ul>
  );
}