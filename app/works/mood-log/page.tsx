'use client';

import { useEffect, useState } from "react";
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
  const [logs, setLogs] = useState<MoodLog[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);


  const STORAGE_KEY = 'mood-logs';

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setLogs(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  const addLog = (log: MoodLog) => {
    setLogs((prev) => [log, ...prev]);
  };

  const deleteLog = (id: string): void => {
    setLogs((prev) => prev.filter((log) => log.id !== id));
  }

  const updateLog = (updated: MoodLog): void => {
    setLogs((prev) => prev.map((log) => log.id === updated.id ? updated : log))
  }

  return (
    <main className="max-w-md mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">今日の気分</h1>

      <MoodForm onAddLog={addLog} />

      <MoodList logs={logs} onDelete={deleteLog} onUpdate={updateLog} editingId={editingId} setEditingId={setEditingId} />
    </main>
  );
}