import type { entity } from "@/app/_lib/types";
import React from "react";
import EntityReactionPanel from "./EntityReactionPanel";

export default function EntityDetails({ entity }: { entity: entity }) {
  const scoreColor = getScoreColor(entity.score);

  return (
    <div className="border border-gray-300 rounded-md shadow p-6 bg-white max-w-2xl w-full">
      <div className="flex flex-col md:flex-row gap-6">
        {entity.image_url && <img src={entity.image_url} alt={entity.entity_name} className="w-24 h-24 object-cover rounded-md" />}
        <div className="w-full space-y-4">
          <h2 className="text-2xl font-bold">{entity.entity_name}</h2>

          <div className="space-y-1 text-sm">
            <p>
              <strong>Score:</strong>{" "}
              <span style={{ color: scoreColor }}>{entity.score}</span>
            </p>
            <div>
              <strong>Reasons:</strong>
              <ul className="list-disc list-inside">
                {entity.scoreReasons.map((reason: string) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>
          </div>
          <EntityReactionPanel entity={entity} />
        </div>
      </div>
    </div>
  );
}

function getScoreColor(score: number) {
  const red = Math.round(255 * (1 - score / 100));
  const green = Math.round(255 * (score / 100));
  return `rgb(${red}, ${green}, 0)`;
}
