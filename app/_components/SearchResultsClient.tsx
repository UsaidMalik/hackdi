// app/components/SearchResultsClient.tsx
"use client";

import EntityModal from "./EntityModal";
import type { entity } from "@/app/_lib/types";

export default function SearchResultsClient({ results }: { results: entity[] }) {
  return (
    <div className="w-full max-w-4xl space-y-4">
      {results.map((entity) => (
        <EntityModal key={entity._id} entity={entity} />
      ))}
    </div>
  );
}
