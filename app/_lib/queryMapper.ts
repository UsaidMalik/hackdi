import { FindCursor } from "mongodb";
import type { entity as Entity } from "./types";

/**
 * Iterates over a MongoDB FindCursor of Entity documents and maps matches to entities
 * if any query word appears in the entity content.
 * @param query - The user’s raw search string
 * @param collectionCursor - MongoDB cursor containing Entity documents
 * @returns All matching Entity objects
 */
export default async function queryMapper(
  query: string,
  collectionCursor: FindCursor<Entity>
): Promise<Entity[]> {
  const results: Entity[] = [];

  if (!query) {
    return results;
  }

  const queryWords: string[] = query.toLowerCase().split(/\s+/); // Split into words

  for await (const entity of collectionCursor) {
    const entity_tags = entity.tags;

    for (const word of queryWords) {
      if (entity_tags.includes(word)) {
        results.push(entity);
        break; // one match is enough — move to the next entity
      }
    }
  }

  return results;
}
