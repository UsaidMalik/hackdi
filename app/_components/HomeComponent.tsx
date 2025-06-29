"use client";

import Link from "next/link";

export default function HomeComponent() {
  return (
    <Link
      href="/"
      className="hover:bg-gray-100 px-3 py-2 rounded transition inline-flex items-center space-x-2"
    >
      <span
        className="material-symbols-outlined text-3xl text-blue-600"
        style={{
          fontVariationSettings: '"FILL" 0, "wght" 500, "GRAD" 0, "opsz" 48',
        }}
      >
        home
      </span>
      <span className="text-lg font-medium text-gray-800">Home</span>
    </Link>
  );
}
