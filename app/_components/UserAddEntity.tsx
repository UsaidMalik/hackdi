"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addEntity } from "@/app/_lib/addEntity";

export default function UserAddEntity() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setPending(true);

    const reasonsRaw = formData.get("scoreReasons") as string;
    formData.set(
      "scoreReasons",
      JSON.stringify(
        reasonsRaw
          .split(",")
          .map(r => r.trim())
          .filter(r => r.length > 0)
      )
    );

    const newId = await addEntity(formData);
    setPending(false);
    router.push(`/entities/${newId}`);
  }

  return (
    <form
      action={handleSubmit}
      className="w-full max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-8 border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        📌 Add a New Entity
      </h2>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Entity Name
          </label>
          <input
            name="entity_name"
            placeholder="Enter the entity's name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Score
          </label>
          <input
            name="score"
            type="number"
            placeholder="Score (0-100)"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            About
          </label>
          <textarea
            name="about"
            placeholder="What is this entity about?"
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            name="category"
            placeholder="e.g. technology, fashion, entertainment"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <input
            name="tags"
            placeholder="Comma-separated tags (e.g. game, retro, fun)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            name="image_url"
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Score Reasons
          </label>
          <textarea
            name="scoreReasons"
            placeholder="Comma-separated reasons for the score"
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="pt-4 text-center">
        <button
          type="submit"
          disabled={pending}
          className="inline-block w-full sm:w-auto px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
          {pending ? "Submitting..." : "🚀 Submit Entity"}
        </button>
      </div>
    </form>
  );
}
