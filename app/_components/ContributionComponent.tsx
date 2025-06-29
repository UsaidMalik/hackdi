"use client";

import Link from "next/link";
import {Contribution} from "@/app/_lib/types"


export default function ContributionCard({ contribution }: { contribution: Contribution }) {
  return (
    <Link
      href={`/contribution/${contribution.id}`}
      className="block border border-gray-300 rounded-md p-4 hover:bg-gray-50 transition"
    >
      <h3 className="text-lg font-medium">{contribution.title}</h3>
      <p className="text-sm text-gray-500 truncate">
        {contribution.summary || "No summary available"}
      </p>
    </Link>
  );
}
