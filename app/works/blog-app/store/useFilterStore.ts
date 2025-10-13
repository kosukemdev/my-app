import { create } from "zustand";

type FilterState = {
  selectedTag: string[];
  keyword: string;
  setTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  clearTags: () => void;
  setKeyword: (keyword: string) => void;
};

// stateとはアプリケーションの現在の状態を表すオブジェクトのこと
// ストアに定義したすべての状態（データと関数） が入っています。
export const useFilterStore = create<FilterState>((set) => ({
  selectedTag: [],
  keyword: "",
  setTag: (tag) =>
    set((state) => ({
      selectedTag: state.selectedTag.includes(tag)
        ? state.selectedTag
        : [...state.selectedTag, tag],
    })),
  removeTag: (tag) =>
    set((state) => ({
      selectedTag: state.selectedTag.filter((t) => t !== tag),
    })),
  clearTags: () => set({ selectedTag: [] }),
  setKeyword: (keyword) => set({ keyword }),
}));
