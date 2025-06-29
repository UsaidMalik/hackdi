"use client";

import Link from "next/link";

export default function ProfileComponent() {
  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/profile"
        className="flex items-center space-x-2 hover:bg-gray-100 px-4 py-2 rounded-md transition"
      >
        <span
          className="material-symbols-outlined text-4xl text-blue-600"
          style={{ fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48' }}
        >
          account_circle
        </span>
        <span className="text-lg font-medium text-gray-800">Profile</span>
      </Link>
    </div>
  );
}
