"use server";

import { getSession } from "./session";
import { db } from "./db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function addEntity(formData: FormData) {
  const session = await getSession();
  if (!session?.isLoggedIn) throw new Error("Unauthorized");

  const entity = {
    contributor: session.username,
    username: session.username,
    likes: 0,
    dislikes: 0,
    score: Number(formData.get("score")),
    entity_name: formData.get("entity_name"),
    about: formData.get("about"),
    category: formData.get("category"),
    tags: (formData.get("tags") as string)?.split(",").map((tag) => tag.trim()),
    image_url: formData.get("image_url"),
  };

  const entities = db.collection("entities");
  const users = db.collection("users");

  const result = await entities.insertOne(entity);
  await users.updateOne(
    { username: session.username },
    { $addToSet: { contributions: result.insertedId } }
  );

  return result.insertedId.toString(); // return the ID so client can redirect
}
