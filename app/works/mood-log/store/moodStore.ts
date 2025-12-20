import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { MoodLog } from "../page";

type MoodStore = {
  logs: MoodLog[];
  editingId: string | null;

  addLog: (log: MoodLog) => void;
  deleteLog: (id: string) => void;
  updateLog: (log: MoodLog) => void;
  setEditingId: (id: string | null) => void;
};

export const useMoodStore = create<MoodStore>()(persist((set) => ({
  logs: [],
  editingId: null,

  addLog: (log) =>
    set((state) => {
      if (!log.mood) return state;
      return {
        logs: [log, ...state.logs],
      }
    }),

  deleteLog: (id) =>
    set((state) => ({
      logs: state.logs.filter((log) => log.id !== id),
    })),

  updateLog: (updated) =>
    set((state) => ({
      logs: state.logs.map((log) =>
        log.id === updated.id ? updated : log
      ),
    })),

  setEditingId: (id) => set({ editingId: id }),
}),
  {
    name: 'mood-log-storage',

    partialize: (state) => (
      {
        logs: state.logs,
      }),
  }
)
);
