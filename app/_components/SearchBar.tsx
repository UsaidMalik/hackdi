"use client";

import { useState } from "react";
import { publishSearchQuery } from "@/_lib/searchQueue.ts";

export default function SearchBar() {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      publishSearchQuery(value.trim());
      setValue(""); // clear input
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl px-4">
      <input
        type="text"
        placeholder="What are you looking for?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-5 py-3 text-lg bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400 shadow-sm hover:shadow-md"
      />
    </form>
  );
}
