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
    <div className="border rounded p-2 flex flex-wrap gap-2">
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
        >
          #{tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="text-sm cursor-pointer"
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
        className="flex-grow min-w-[120px] outline-none"
      />
    </div>
  );
}
