"use server";

import { getSession } from "./session";
import { db } from "./db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function addEntity(formData: FormData) {
  const session = await getSession();
  if (!session?.isLoggedIn) throw new Error("Unauthorized");
  const contributor = session.username


  const entity = {
    entity_name: formData.get("entity_name"),
    score: Number(formData.get("score")),
    about: formData.get("about"),
    category: formData.get("category"),
    tags: (formData.get("tags") as string)
      ?.split(",")
      .map(t => t.trim())
      .filter(Boolean),
    image_url: formData.get("image_url"),
    contributor,
    scoreReasons: JSON.parse(formData.get("scoreReasons") as string),
    likes: 0,
    dislikes: 0,
  };

  const entities = db.collection("entities");
  const users = db.collection("users");


  const result = await entities.insertOne(entity);
  
 // 🧩 Build contribution object with id, title, and summary
  const contribution = {
    id: result.insertedId,
    title: formData.get("entity_name"),
    summary: formData.get("about"),
  };

  // 🪄 Push full contribution object into user's contributions array
  await users.updateOne(
    { username: session.username },
    {
      $addToSet: { contributions: contribution },
      $inc: { points: 1 },
    }
  );

  return result.insertedId.toString(); // return the ID so client can redirect
}
