"use client";

import { useState } from "react";
import { Mood } from "../page";
import { useMoodStore } from "../store/moodStore";
import { Heart, MessageSquareMore } from "lucide-react";

const moodOptions = [
  { value: 1 as Mood, label: "かなり低め", emoji: "😞", tone: "bg-rose-100" },
  { value: 2 as Mood, label: "やや低め", emoji: "😕", tone: "bg-orange-100" },
  { value: 3 as Mood, label: "ふつう", emoji: "😐", tone: "bg-amber-100" },
  { value: 4 as Mood, label: "いい感じ", emoji: "🙂", tone: "bg-lime-100" },
  { value: 5 as Mood, label: "とても良い", emoji: "😄", tone: "bg-emerald-100" },
];

export default function MoodForm() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState("");
  const addLog = useMoodStore((s) => s.addLog);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMood === null) return;

    addLog({
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString(),
      mood: selectedMood!,
      note,
    });

    setSelectedMood(null);
    setNote("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      action="submit"
      className="space-y-5 rounded-[1.75rem] border border-orange-100 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(255,247,237,0.9))] p-5 shadow-[0_18px_45px_-34px_rgba(194,65,12,0.5)] sm:p-6"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
        <Heart className="h-4 w-4 text-orange-500" />
        今日はどんな気分ですか？
      </div>

      <div className="grid gap-3 sm:grid-cols-5">
        {moodOptions.map((mood) => (
          <label
            key={mood.value}
            className={`group cursor-pointer rounded-2xl border px-3 py-4 text-center transition ${
              selectedMood === mood.value
                ? "border-orange-400 bg-orange-50 shadow-sm"
                : "border-orange-100 bg-white hover:border-orange-200 hover:bg-orange-50/60"
            }`}
          >
            <input
              type="radio"
              value={mood.value}
              onChange={() => setSelectedMood(mood.value)}
              className="sr-only"
              checked={selectedMood === mood.value}
            />
            <div
              className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${mood.tone}`}
            >
              {mood.emoji}
            </div>
            <p className="mt-3 text-lg font-semibold text-slate-900">
              {mood.value}
            </p>
            <p className="mt-1 text-xs text-slate-500">{mood.label}</p>
          </label>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <MessageSquareMore className="h-4 w-4 text-orange-500" />
          ひとことメモ
        </div>
        <textarea
          value={note}
          rows={4}
          className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
          onChange={(e) => setNote(e.target.value)}
          placeholder="今日の出来事や気になったことをひとこと残せます"
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-orange-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          1 が低め、5 がとても良い気分です。
        </p>
        <button
          disabled={selectedMood === null}
          className="cursor-pointer rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          記録する
        </button>
      </div>
    </form>
  );
}
