"use client";

type TagFilterProps = {
  allTags: string[];
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function TagFilter({
  allTags,
  selectedTags,
  setSelectedTags,
}: TagFilterProps) {
  const toggleTags = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <div className="flex space-x-2 overflow-x-scroll md:overflow-auto">
        {allTags.map((tag, i) => (
          <button
            key={`${tag}-${i}`}
            onClick={() => {
              toggleTags(tag);
            }}
            // 折り返さず、スクロールさせるスタイルを追加
            className={`rounded-full border px-3 py-1 text-sm transition ${
              selectedTags.includes(tag)
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-300 bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <button
        onClick={() => setSelectedTags([])}
        className={`rounded-full border px-3 py-1 text-sm transition ${
          selectedTags.length === 0
            ? "border-blue-500 bg-blue-500 text-white"
            : "border-gray-300 bg-gray-100 hover:bg-gray-200"
        }`}
      >
        全て
      </button>
    </div>
  );
}
