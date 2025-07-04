"use server";

import { db } from "./db";
import { getSession } from "./session";

export const getUserData = async () => {
  const session = await getSession();
  const user = await db.collection("users").findOne({username: session.username});
  return user
};
