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

  // Fetch user to check previous interaction
  const user = await userCollection.findOne({ username });

  const reactionKey = `reactions.${id}`; // Nested key like reactions.6860abc...

  const previousReaction = user?.reactions?.[id];

  // Undo reaction (same button pressed again)
  if (previousReaction === type) {
    await entityCollection.updateOne(
      { _id: entityId },
      { $inc: { [type === "like" ? "likes" : "dislike"]: -1 } }
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

  // Switching from one reaction to the other
  if (previousReaction && previousReaction !== type) {
    await entityCollection.updateOne(
      { _id: entityId },
      {
        $inc: {
          [type === "like" ? "likes" : "dislike"]: 1,
          [previousReaction === "like" ? "likes" : "dislike"]: -1
        }
      }
    );
  } else {
    // First-time reaction
    await entityCollection.updateOne(
      { _id: entityId },
      { $inc: { [type === "like" ? "likes" : "dislike"]: 1 } }
    );
  }

  await userCollection.updateOne(
    { username },
    {
      $set: { [reactionKey]: type },
      $addToSet: { interacted_posts: id }
    }
  );

  revalidatePath("/explore");
}
