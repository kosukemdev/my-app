'use client';

import { useEffect, useState } from "react";
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


  const STORAGE_KEY = 'mood-logs';

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
    <main className="max-w-md mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">今日の気分</h1>

      <MoodForm onAddLog={addLog} />

      <MoodList />
    </main>
  );
}