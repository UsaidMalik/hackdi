// no "use client" here—this is a Server Component
import { updateReaction } from "@/app/_lib/entityActions";
import { getUserData } from "@/app/_lib/userRetriever";
import type { Entity } from "@/app/_lib/types";

export default async function EntityReactionPanel({ entity }: { entity: Entity }) {
  // Fetch session+user on the server
  const user = await getUserData();
  const reaction = user?.reactions?.[entity._id.toString()] ?? null;

  return (
    <form action={updateReaction} className="flex gap-4 pt-2">
      <input type="hidden" name="entityId" value={entity._id.toString()} />

      <button
        name="reaction"
        value="like"
        className={`px-3 py-1 rounded flex items-center gap-1 transition ${
          reaction === "like"
            ? "bg-green-100 text-green-700 font-semibold"
            : "hover:bg-green-50 text-green-600"
        }`}
      >
        👍 {entity.likes}
      </button>

      <button
        name="reaction"
        value="dislike"
        className={`px-3 py-1 rounded flex items-center gap-1 transition ${
          reaction === "dislike"
            ? "bg-red-100 text-red-700 font-semibold"
            : "hover:bg-red-50 text-red-600"
        }`}
      >
        👎 {entity.dislikes}
      </button>
    </form>
  );
}
