"use server";

import { db } from "./db"
import {getSession} from "./actions"

export const getUserData = async () => {
  const session = await getSession();
  const user = await db.collection("users").findOne({_id: new ObjectId(session.username)});
  return user
};
