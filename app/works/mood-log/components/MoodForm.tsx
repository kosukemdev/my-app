"use client";

import { useState } from "react";
import { Mood } from "../page";
import { useMoodStore } from "../store/moodStore";

export default function MoodForm() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState("");
  const addLog = useMoodStore((s) => s.addLog);

  const FeelingMoods: Mood[] = [1, 2, 3, 4, 5];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedMood === null && note.trim() === "") return;

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
    <div>
      <form onSubmit={handleSubmit} action="submit">
        <div className="flex cursor-default items-center justify-center gap-1 text-xs md:text-base">
          良くない←
          {FeelingMoods.map((mood) => (
            <label
              key={mood}
              className={`cursor-pointer rounded px-2 py-1 ${selectedMood === mood ? "bg-blue-500 text-white" : ""}`}
            >
              {mood}
              <input
                type="radio"
                value={mood}
                onChange={() => setSelectedMood(mood)}
                className="ml-1 cursor-pointer"
                checked={selectedMood === mood}
              />
            </label>
          ))}
          →良い
        </div>
        <textarea
          value={note}
          className="w-full rounded border border-gray-300 bg-white p-2 focus:outline-none"
          onChange={(e) => setNote(e.target.value)}
          placeholder="一言メモ（任意）"
        />
        <div className="flex justify-end">
          <button
            disabled={selectedMood === null}
            className="cursor-pointer rounded bg-blue-500 px-2 py-1 text-white transition hover:bg-blue-600"
          >
            送信
          </button>
        </div>
      </form>
    </div>
  );
}
