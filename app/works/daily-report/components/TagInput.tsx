"use client";
import { useState, KeyboardEvent } from "react";

type TagInputProps = {
  value?: string[];
  onChange: (tags: string[]) => void;
};

export default function TagInput({ value = [], onChange }: TagInputProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = input.trim();
      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInput("");
    }
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-wrap gap-2 rounded border p-2">
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-blue-700"
        >
          #{tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="cursor-pointer text-sm"
          >
            ✕
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="タグを入力してEnter"
        className="min-w-[120px] flex-grow outline-none"
      />
    </div>
  );
}
