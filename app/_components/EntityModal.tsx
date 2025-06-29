"use client";

import type { Entity } from "@/app/_lib/types";

function scoreToColor(score: number) {
  const red = Math.round(255 * (1 - score / 100));
  const green = Math.round(255 * (score / 100));
  return `rgb(${red}, ${green}, 0)`;
}

export default function EntityDetails({ entity }: { entity: Entity }) {
  const scoreColor = scoreToColor(entity.score);

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-5 max-w-2xl w-full">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
          <img
            src={entity.image_url}
            alt={entity.entity_name}
            className="rounded-md object-contain w-full"
          />
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-300" />

        {/* Content */}
        <div className="w-full md:w-2/3 space-y-4">
          <h2 className="text-2xl font-semibold">{entity.entity_name}</h2>
          <p className="text-gray-700">{entity.about}</p>

          <div className="space-y-2 text-sm">
            <p>
              <strong>Category:</strong> {entity.category}
            </p>
            <p>
              <strong>Score:</strong>{" "}
              <span style={{ color: scoreColor, fontWeight: "bold" }}>
                {entity.score}
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              {entity.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-gray-800 px-3 py-1 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
