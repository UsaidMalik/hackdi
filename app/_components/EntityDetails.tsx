import { updateReaction } from "@/app/_lib/actions/entity";
import type { Entity } from "@/app/_lib/types";

export default function EntityDetails({ entity }: { entity: Entity }) {
  return (
    <form
      action={updateReaction.bind(null, entity._id)}
      className="space-x-4 mt-4"
    >
      <button
        name="type"
        value="like"
        className="text-green-600 hover:bg-green-100 px-3 py-1 rounded"
      >
        👍 {entity.likes}
      </button>
      <button
        name="type"
        value="dislike"
        className="text-red-600 hover:bg-red-100 px-3 py-1 rounded"
      >
        👎 {entity.dislike}
      </button>
    </form>
  );
}