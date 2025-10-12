"use client";

import { useFilterStore } from "../store/useFilterStore";

export default function PostFilter({ tags }: { tags: string[] }) {
  const { selectedTag, setTag, removeTag, clearTags, keyword, setKeyword } =
    useFilterStore();

  const toggleTag = (tag: string) => {
    selectedTag.includes(tag) ? removeTag(tag) : setTag(tag);
  };

  return (
    <div className="flex flex-col gap-3 mb-6">
      {/* 検索 */}
      <input
        type="text"
        placeholder="記事を検索..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border rounded px-2 py-1"
      />

      {/* タグ */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full border ${
              selectedTag.includes(tag)
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {tag}
          </button>
        ))}

        <button
          onClick={clearTags}
          className="px-3 py-1 rounded-full border bg-red-100 text-red-700 hover:bg-red-200"
        >
          タグ選択を解除
        </button>
      </div>
    </div>
  );
}
