// app/components/SearchResultsClient.tsx
"use client";

import { useState } from "react";
import EntityModal from "./EntityModal";
import type { Entity } from "@/app/_lib/types";

export default function SearchResultsClient({ results }: { results: Entity[] }) {
  const [active, setActive] = useState<Entity | null>(null);

  return (
    <div className="w-full max-w-4xl space-y-4">
   {results.map((entity) => (
  <EntityModal key={entity._id} entity={entity} />
  ))}

    </div>
  );
}
