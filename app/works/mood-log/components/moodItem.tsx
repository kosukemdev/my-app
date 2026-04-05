"use client";

import { useState } from "react";
import { MoodLog } from "../page";
import { useMoodStore } from "../store/moodStore";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  log: MoodLog;
  isToday: boolean;
};

export function MoodItem({ log, isToday }: Props) {
  const [editNote, setEditNote] = useState("");
  const [editMood, setEditMood] = useState<MoodLog["mood"]>(3);
  const { deleteLog, updateLog, editingId, setEditingId } = useMoodStore();

  const moodLabel = {
    1: "😞",
    2: "😕",
    3: "😐",
    4: "🙂",
    5: "😄",
  } as const;

  const isEditing = editingId === log.id;
  const moodText = {
    1: "かなり低め",
    2: "やや低め",
    3: "ふつう",
    4: "いい感じ",
    5: "とても良い",
  } as const;

  return (
    <li
      key={log.id}
      className={`rounded-[1.5rem] border p-4 shadow-sm transition ${
        isToday
          ? "border-orange-200 bg-[linear-gradient(135deg,_rgba(255,237,213,0.8),_rgba(255,255,255,0.95))]"
          : "border-slate-200 bg-white"
      }`}
    >
      {isEditing ? (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((mood) => (
              <button
                key={mood}
                onClick={() => setEditMood(mood as MoodLog["mood"])}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  editMood === mood
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                } `}
              >
                {moodLabel[mood as keyof typeof moodLabel]}
              </button>
            ))}
          </div>

          <textarea
            value={editNote}
            onChange={(e) => setEditNote(e.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
          />

          <div className="flex gap-2">
            <button
              onClick={() => {
                updateLog({ ...log, note: editNote, mood: editMood });
                setEditingId(null);
              }}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              保存
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm ring-1 ring-slate-100">
              {moodLabel[log.mood]}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  気分 {log.mood} / {moodText[log.mood]}
                </span>
                {isToday && (
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                    Today
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {log.note || "（メモなし）"}
              </p>
              <p className="mt-2 text-xs text-slate-400">{log.date}</p>
            </div>
          </div>

          <div className="flex gap-2 sm:flex-col">
            <button
              onClick={() => {
                setEditingId(log.id);
                setEditNote(log.note);
                setEditMood(log.mood);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100"
            >
              <Pencil className="h-3.5 w-3.5" />
              編集
            </button>
            <button
              onClick={() => deleteLog(log.id)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
            >
              <Trash2 className="h-3.5 w-3.5" />
              削除
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
