"use client";

import MoodForm from "./components/MoodForm";
import MoodList from "./components/MoodList";

export type Mood = 1 | 2 | 3 | 4 | 5;

export type MoodLog = {
  id: string;
  date: string;
  mood: Mood;
  note: string;
};

export default function MoodApp() {
  return (
    <main className="mx-auto min-h-screen max-w-md bg-gray-50 p-4">
      <h1 className="mb-4 text-2xl font-semibold">今日の気分</h1>

      <MoodForm />

      <MoodList />
    </main>
  );
}
