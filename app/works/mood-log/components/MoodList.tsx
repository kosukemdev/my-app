'use client';

import { useState } from "react";
import { MoodLog } from "../page";

type Props = {
  logs: MoodLog[];
  onDelete: (id: string) => void;
  onUpdate: (log: MoodLog) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
}

export default function MoodList({ logs, onDelete, onUpdate, editingId, setEditingId }: Props) {
  const [editNote, setEditNote] = useState('');
  const [editMood, setEditMood] = useState<MoodLog['mood']>(3);

  const moodLabel = {
    1: "😞",
    2: "😕",
    3: "😐",
    4: "🙂",
    5: "😄",
  } as const;

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
      {logs.map((log) => {
        const isToday = log.date === today;
        const isEditing = editingId === log.id;

        return (
          isEditing ? (
            <li key={log.id}>
              {[1, 2, 3, 4, 5].map((mood) => (
                <button key={mood} onClick={() => setEditMood(mood as MoodLog['mood'])} className={`px-2 py-1 rounded ${editMood === mood ? 'bg-blue-500 text-white' : ''}`}>
                  {moodLabel[mood as keyof typeof moodLabel]}
                </button>
              ))}
              <textarea
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                className="border rounded w-full mb-2"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onUpdate({ ...log, note: editNote, mood: editMood });
                    setEditingId(null);
                  }}
                  className="text-sm text-blue-600"
                >
                  保存
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  className="text-sm text-gray-500"
                >
                  キャンセル
                </button>
              </div>
            </li>
          ) : (
            <li
              key={log.id}
              className={`flex justify-between border rounded-lg p-3 shadow-sm
                ${isToday ? "bg-blue-50 border-blue-300" : "bg-white"}
                `}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{moodLabel[log.mood]}</div>

                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    {log.note || '（メモなし）'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {log.date}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <button onClick={() => {
                  setEditingId(log.id);
                  setEditNote(log.note);
                  setEditMood(log.mood);
                }} className="text-xs text-blue-500 hover:text-blue-700">編集</button>
                <button onClick={() => onDelete(log.id)} className="text-xs text-red-500 hover:text-red-700">削除</button>
              </div>
            </li>
          )
        )

      })}
    </ul>
  );
}