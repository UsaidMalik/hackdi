"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { publishSearchQuery } from "@/app/_lib/searchQueue";

type SearchBarProps = {
  redirect?: string; // Optional: if not provided, no redirect
};

export default function SearchBar({ redirect }: SearchBarProps) {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = value.trim();
    if (trimmed) {
      publishSearchQuery(trimmed);
      setValue("");

      if (redirect) {
        const encoded = encodeURIComponent(trimmed);
        router.push(`${redirect}?q=${encoded}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl px-4 relative">
      <input
        type="text"
        placeholder="What are you looking for?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-5 py-3 pr-12 text-lg bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400 shadow-sm hover:shadow-md"
      />
      <button
        type="submit"
        className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
        aria-label="Search"
      >
        <span className="material-symbols-outlined text-2xl">search</span>
      </button>
    </form>
  );
}
