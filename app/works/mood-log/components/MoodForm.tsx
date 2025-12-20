'use client';

import { useState } from "react";
import { Mood, MoodLog } from "../page";
import { useMoodStore } from "../store/moodStore";

type Props = {
  onAddLog: (log: MoodLog) => void;
}

export default function MoodForm({ onAddLog }: Props) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState('');
  const addLog = useMoodStore((s) => s.addLog);

  const FeelingMoods: Mood[] = [1, 2, 3, 4, 5];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedMood === null && note.trim() === '') return;

    addLog({
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString(),
      mood: selectedMood!,
      note,
    });

    setSelectedMood(null);
    setNote('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit} action="submit">
        <div className="flex items-center gap-2 cursor-default">
          良くない←
          {FeelingMoods.map((mood) => (
            <label key={mood} className={`px-2 py-1  rounded cursor-pointer ${selectedMood === mood ? 'bg-blue-500 text-white' : ''}`}>
              {mood}
              <input type="radio" value={mood} onChange={() => setSelectedMood(mood)} className="cursor-pointer ml-1" checked={selectedMood === mood} />
            </label>
          ))}
          →良い
        </div>
        <textarea value={note} className="border border-gray-300 bg-white rounded w-full" onChange={(e) => setNote(e.target.value)} placeholder="一言メモ（任意）" />
        <div className="flex justify-end">
          <button disabled={selectedMood === null} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">送信</button>
        </div>
      </form>
    </div>
  )
}