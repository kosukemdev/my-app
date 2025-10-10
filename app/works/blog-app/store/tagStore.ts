import { create } from "zustand";

type TagStore = {
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearTags: () => void;
};

export const useTagStore = create<TagStore>((set) => ({
  selectedTags: [],
  toggleTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
    })),
  clearTags: () => set({ selectedTags: [] }),
}));
