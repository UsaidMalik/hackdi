"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addEntity } from "@/app/_lib/addEntity";

export default function UserAddEntity() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setPending(true);
    const newId = await addEntity(formData);
    setPending(false);
    router.push(`/entities/${newId}`);
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4 max-w-xl p-6 bg-white rounded shadow"
    >
      <h2 className="text-xl font-semibold">Add New Entity</h2>

      <div className="grid grid-cols-1 gap-4">
        <input name="score" type="number" placeholder="Score" required className="input" />
        <input name="entity_name" placeholder="Entity name" required className="input" />
        <textarea name="about" placeholder="About" required className="input" rows={3} />
        <input name="category" placeholder="Category" required className="input" />
        <input name="tags" placeholder="Comma-separated tags (e.g. game, retro, fun)" className="input" />
        <input name="image_url" placeholder="Image URL" className="input" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
