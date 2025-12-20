'use client';

import { useState } from "react";
import { MoodLog } from "../page"
import { useMoodStore } from "../store/moodStore";

type Props = {
  log: MoodLog;
  isToday: boolean;
};

export function MoodItem({ log, isToday }: Props) {
  const [editNote, setEditNote] = useState('');
  const [editMood, setEditMood] = useState<MoodLog['mood']>(3);
  const {
    logs,
    deleteLog,
    updateLog,
    editingId,
    setEditingId,
  } = useMoodStore();

  const moodLabel = {
    1: "😞",
    2: "😕",
    3: "😐",
    4: "🙂",
    5: "😄",
  } as const;

  const isEditing = editingId === log.id;

  return (
    <li
      key={log.id}
      className={
        !isEditing
          ? `flex justify-between border rounded-lg p-3 shadow-sm
               ${isToday ? "bg-blue-50 border-blue-300" : "bg-white"}`
          : ""
      }
    >
      {isEditing ? (
        <>
          <div className="flex gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((mood) => (
              <button
                key={mood}
                onClick={() => setEditMood(mood as MoodLog["mood"])}
                className={`px-2 py-1 rounded
                    ${editMood === mood ? "bg-blue-500 text-white" : ""}
                  `}
              >
                {moodLabel[mood as keyof typeof moodLabel]}
              </button>
            ))}
          </div>

          <textarea
            value={editNote}
            onChange={(e) => setEditNote(e.target.value)}
            className="border rounded w-full mb-2 bg-white"
          />

          <div className="flex gap-2">
            <button
              onClick={() => {
                updateLog({ ...log, note: editNote, mood: editMood });
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
        </>
      ) : (
        <>
          <div className="flex items-start gap-3">
            <div className="text-2xl">{moodLabel[log.mood]}</div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                {log.note || "（メモなし）"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {log.date}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <button
              onClick={() => {
                setEditingId(log.id);
                setEditNote(log.note);
                setEditMood(log.mood);
              }}
              className="text-xs text-blue-500 hover:text-blue-700"
            >
              編集
            </button>
            <button
              onClick={() => deleteLog(log.id)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              削除
            </button>
          </div>
        </>
      )}
    </li>
  )
}