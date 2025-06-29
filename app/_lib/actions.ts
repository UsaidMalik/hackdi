"use server";

import { getIronSession, IronSession } from "iron-session";
import { sessionOptions } from "./session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "./db"
import { Argon2id } from "oslo/password";
import { ObjectId } from "mongodb";
import {contribution, SessionData} from "@/app/_lib/types"

export const getSession = async () => {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  }
  // CHECK THE USER IN THE DB
  return session;
};

export const login = async (
  prevState: { error: string } | undefined,
  formData: FormData
): Promise<{ error: string }> => {
  const session = await getSession();

  const username = formData.get("username");
	const password = formData.get("password");
	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
	// keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username"
    };
  }

    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
          console.log("BAD PASSWORD")
      return {
        error: "Invalid password"
      };
    }


    const user = await db.collection("users").findOne({username: username});    
    if (!user){
        return {
                error: "Username DOESNT exist"
            };
    }

      const matchedPass = await new Argon2id().verify(user.hashed_password, password);
    if (!matchedPass) {
      return {
        error: "Incorrect password"
      };
    }


  session.userId = user._id.toString();
  session.username = username;
  session.isLoggedIn = true;


  session.score = user?.score ?? 0
  session.contributions = user?.contributions ?? []

  await session.save();
  redirect("/");
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};


export const changeUsername = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();

  const newUsername = formData.get("username") as string;

  const user = await db.collection("users").findOne({_id: new ObjectId(session.userId)});

  if (user) {
    await db.collection("users").updateOne({username: session.username}, {$set: {username: newUsername}});
  }

  session.username = newUsername
  await session.save();
  revalidatePath("/");
};



export const signup = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // CHECK USER IN THE DB
  // const user = await db.getUser({username,password})

  if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username"
		};
	}

	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        console.log("BAD PASSWORD")
		return {
			error: "Invalid password"
		};
	}

	const hashedPassword = await new Argon2id().hash(password);

	// TODO: check if username is already used
	const user = await db.collection("users").findOne({username: username});
    if (user){
        console.log("username already exists man")
        return {
                error: "Username already exists"
            };
    } else {
        
        db.collection("users").insertOne({
          username: username,
          hashed_password: hashedPassword,
          points: 0,
          contributions: [],
        });
        console.log("SUCCESFULLY CREATED USER")
      

    }

  session.username = username;
  session.isLoggedIn = true;

  // this user was just created theres nothing here
  session.points = 0
  session.contributions = []

  await session.save();
  redirect("/");
};

