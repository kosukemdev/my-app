"use client";
import { useState } from "react";

export default function WordFilter({filteredPosts}: {filteredPosts: { id: string; title: string; content: string; tags: string[]; status: string; createdAt: string; }[] | undefined}) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchedPosts =
    normalizedQuery && filteredPosts
      ? filteredPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(normalizedQuery) ||
            post.content.toLowerCase().includes(normalizedQuery)
        )
      : filteredPosts;

  return (
    <input
      aria-label="検索"
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="タイトルまたは本文で検索"
      className="border px-3 py-1 rounded focus:outline-none"
    />
  );
}
