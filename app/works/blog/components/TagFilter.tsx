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
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <div className="overflow-x-scroll flex space-x-2 md:overflow-auto">
        {allTags.map((tag, i) => (
          <button
            key={`${tag}-${i}`}
            onClick={() => {
              toggleTags(tag);
            }}
            // 折り返さず、スクロールさせるスタイルを追加
            className={`px-3 py-1 rounded-full border text-sm transition ${
              selectedTags.includes(tag)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 hover:bg-gray-200 border-gray-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <button
        onClick={() => setSelectedTags([])}
        className={`px-3 py-1 rounded-full border text-sm transition ${
          selectedTags.length === 0
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-gray-100 hover:bg-gray-200 border-gray-300"
        }`}
      >
        全て
      </button>
    </div>
  );
}
