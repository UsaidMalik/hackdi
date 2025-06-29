"use server";

import { db } from "@/app/_lib/db";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { getSession } from "./session";

export async function updateReaction(id: string, type: "like" | "dislike") {
  const session = await getSession();

  if (!session?.isLoggedIn) {
    throw new Error("Unauthorized");
  }

  const entityId = new ObjectId(id);
  const username = session.username;
  const userCollection = db.collection("users");
  const entityCollection = db.collection("entities");

  const user = await userCollection.findOne({ username });
  const reactionKey = `reactions.${id}`;
  const previousReaction = user?.reactions?.[id];

  // === Undo same reaction ===
  console.log("looking for prevuious reaciotn")
  console.log(previousReaction)
  if (previousReaction === type) {
    console.log("OREVIUS REACTION WAS ASME")
    const field = type === "like" ? "likes" : "dislikes";

    await entityCollection.updateOne(
      { _id: entityId },
      { $inc: { [field]: -1 } }
    );

    await userCollection.updateOne(
      { username },
      {
        $unset: { [reactionKey]: "" },
        $pull: { interacted_posts: id }
      }
    );

    revalidatePath("/explore");
    return;
  }

  // === Build update object ===
  const inc: Record<string, number> = {};

  // Increment the new type
  if (type === "like") {
    inc.likes = 1;
  } else {
    inc.dislikes = 1;
  }

  // Decrement the previous one if exists
  if (previousReaction === "like") {
    inc.likes = (inc.likes || 0) - 1; // becomes 0 if both increment and decrement — fix below
  } else if (previousReaction === "dislike") {
    inc.dislikes = (inc.dislikes || 0) - 1;
  }

  // Only apply update if non-zero
  const $inc: Record<string, number> = {};
  if (inc.likes) $inc.likes = inc.likes;
  if (inc.dislikes) $inc.dislikes = inc.dislikes;

  if (Object.keys($inc).length > 0) {
    await entityCollection.updateOne(
      { _id: entityId },
      { $inc }
    );
  }

  await userCollection.updateOne(
    { username },
    {
      $set: { [reactionKey]: type },
      $addToSet: { interacted_posts: id },
    }
  );

  revalidatePath("/explore");
}
