import { FindCursor } from "mongodb";
import type { entity } from "./types";

/**
 * Iterates over a MongoDB FindCursor of Entity documents and maps matches to entities
 * if any query word appears in the entity content.
 * @param query - The user’s raw search string
 * @param collectionCursor - MongoDB cursor containing Entity documents
 * @returns All matching Entity objects
 */
export default async function queryMapper(
  query: string,
  collectionCursor: FindCursor<entity>
): Promise<entity[]> {
  const results: entity[] = [];
  const addedIds = new Set<string>();

  if (!query) {
    return results;
  }

  const queryWords: string[] = query.toLowerCase().split(/\s+/); // Split into words

  for await (const entity of collectionCursor) {
    const entity_tags = entity.tags;

    for (const word of queryWords) {
      if (entity.entity_name.toLowerCase().includes(word) || entity_tags.includes(word)) {
        if (!addedIds.has(entity._id.toString())) {
          results.push(entity);
          addedIds.add(entity._id.toString());
        }
        break;
      }
    }
  }
  return results;
}
