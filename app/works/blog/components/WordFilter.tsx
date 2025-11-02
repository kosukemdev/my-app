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
    <input
      aria-label="検索"
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="タイトルまたは本文で検索"
      className="border px-3 py-1 rounded focus:outline-none text-sm md:text-base"
    />
  );
}
