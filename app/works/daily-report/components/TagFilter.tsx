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
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setSelectedTags([])}
        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
          selectedTags.length === 0
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100"
        }`}
      >
        全て
      </button>
      <div className="flex flex-1 flex-wrap gap-2 overflow-x-auto">
        {allTags.map((tag, i) => (
          <button
            key={`${tag}-${i}`}
            onClick={() => {
              toggleTags(tag);
            }}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
              selectedTags.includes(tag)
                ? "border-sky-500 bg-sky-500 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
