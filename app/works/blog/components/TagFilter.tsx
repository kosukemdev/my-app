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
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {allTags.map((tag, i) => (
        <button
          key={`${tag}-${i}`}
          onClick={() => {
            setSelectedTags((prev) =>
              prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
            );
          }}
          className={`px-3 py-1 rounded-full border text-sm transition ${
            selectedTags.includes(tag)
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-100 hover:bg-gray-200 border-gray-300"
          }`}
        >
          {tag}
        </button>
      ))}

      <button
        onClick={() => setSelectedTags([])}
        className={`px-3 py-1 rounded-full border text-sm transition ${
          selectedTags.length === 0
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-gray-100 hover:bg-gray-200 border-gray-300"
        }`}
      >
        全て
      </button>
    </div>
  );
}
