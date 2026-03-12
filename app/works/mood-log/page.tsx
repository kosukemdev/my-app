"use client";

import { useEffect } from "react";
import MoodForm from "./components/MoodForm";
import MoodList from "./components/MoodList";
import { useMoodStore } from "./store/moodStore";

export type Mood = 1 | 2 | 3 | 4 | 5;

export type MoodLog = {
  id: string;
  date: string;
  mood: Mood;
  note: string;
};

export default function MoodApp() {
  const logs = useMoodStore((s) => s.logs);
  const addLog = useMoodStore((s) => s.addLog);

  const STORAGE_KEY = "mood-logs";

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      addLog(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  return (
    <main className="mx-auto min-h-screen max-w-md bg-gray-50 p-4">
      <h1 className="mb-4 text-2xl font-semibold">今日の気分</h1>

      <MoodForm />

      <MoodList />
    </main>
  );
}
