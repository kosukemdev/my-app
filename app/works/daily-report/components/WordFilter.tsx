"use client";

import { useEffect, useState } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  debounceMs?: number;
};

export default function WordFilter({
  value,
  onChange,
  debounceMs = 300,
}: Props) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(inputValue);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, onChange, debounceMs]);

  return (
    <div className="relative">
      <input
        aria-label="検索"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="タイトルや本文で検索"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 md:text-base"
      />
    </div>
  );
}
