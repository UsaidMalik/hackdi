"use client";

import { updateReaction } from "@/app/_lib/entityActions";
import type { Entity } from "@/app/_lib/types";
import React, { useState, useRef } from "react";

export default function EntityModal({ entity }: { entity: Entity }) {
  const scoreColor = getScoreColor(entity.score);
  const [greenFlag, setGreenFlag] = useState(false);
  const [redFlag, setRedFlag] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const reactionInputRef = useRef<HTMLInputElement>(null);

  const handleClick = (type: "like" | "dislike") => {
    const isUndo = (type === "like" && greenFlag) || (type === "dislike" && redFlag);

    // Update local UI flags
    if (type === "like") {
      setGreenFlag(!greenFlag);
      setRedFlag(false);
    } else {
      setRedFlag(!redFlag);
      setGreenFlag(false);
    }

    // Always submit the reaction type (server will detect if it's an undo)
    if (reactionInputRef.current) {
      reactionInputRef.current.value = type;
    }

    // Submit form
    formRef.current?.requestSubmit();
  };

  return (
    <div className="border border-gray-300 rounded-md shadow p-6 bg-white max-w-2xl w-full">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <img
            src={entity.image_url}
            alt={entity.entity_name}
            className="rounded-md object-contain w-full"
          />
        </div>

        <div className="hidden md:block w-px bg-gray-300" />

        <div className="w-full space-y-4">
          <h2 className="text-2xl font-bold">{entity.entity_name}</h2>
          <p className="text-gray-700">{entity.about}</p>

          <div className="space-y-1 text-sm">
            <p><strong>Category:</strong> {entity.category}</p>
            <p>
              <strong>Score:</strong>{" "}
              <span style={{ color: scoreColor }}>{entity.score}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {entity.tags.map((tag) => (
                <span key={tag} className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Reaction Form */}
          <form
            ref={formRef}
            action={async (formData) => {
              const type = formData.get("reaction") as "like" | "dislike";
              await updateReaction(entity._id, type);
            }}
            className="flex gap-4 pt-2"
          >
            <input type="hidden" name="entityId" value={entity._id.toString()} />
            <input ref={reactionInputRef} type="hidden" name="reaction" />

            <button
              type="button"
              onClick={() => handleClick("like")}
              className={`px-3 py-1 rounded flex items-center gap-1 transition ${
                greenFlag
                  ? "bg-green-100 text-green-700 font-semibold"
                  : "hover:bg-green-50 text-green-600"
              }`}
            >
              👍 {entity.likes}
            </button>

            <button
              type="button"
              onClick={() => handleClick("dislike")}
              className={`px-3 py-1 rounded flex items-center gap-1 transition ${
                redFlag
                  ? "bg-red-100 text-red-700 font-semibold"
                  : "hover:bg-red-50 text-red-600"
              }`}
            >
              👎 {entity.dislikes}
            </button>
          </form>
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
