"use client";

import { useState } from "react";
import { publishSearchQuery } from "@/app/_lib/searchQueue";

export default function SearchBar() {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      publishSearchQuery(value.trim());
      setValue(""); // clear input
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl px-4 relative"
    >
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
