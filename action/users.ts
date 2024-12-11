"use server";
import { ERR_MSG } from "@/constants/constants";
import { db } from "@/lib/database/db";
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import { decrypt } from "./lib";
import { DogData } from "@/constants/interface";
import { redirect } from "next/navigation";
import { processRecipes } from "./recipe";
import { emptyUser, nonUser } from "@/constants/objects";
import { sql } from "kysely";

const FRONT_PAGE_RECIPE_QUERY_LIMIT = 12;

export async function getUser(email: string, password: string) {

    if(!email || !password) throw new Error(ERR_MSG['ERR2']);

    try {
      
        const user = await db.selectFrom("users_table as user")
            .select(['user.user_id', 'user.password'])
            .where('email','=',email)
            .executeTakeFirst();
        
        if(user === undefined) throw new Error(ERR_MSG['ERR1']); // User not found!

        const match = await bcrypt.compare(password, user.password);

        if(match) {
          return {user_id: user.user_id};
        } else {
          throw new Error(ERR_MSG['ERR9']);
        }
        
    } catch(e) {
        let _e = (e as Error).message;
        throw _e;
    }
}

export async function getUserDetails(user_id: number) {
  if(!user_id) return emptyUser();

  try {

      const user = await db.selectFrom("user_details_table as user_details")
          .select(['user_details.user_codename','user_details.user_image', 'user_details.user_detail_id','user_details.user_id'])
          .where('user_details.user_id','=',user_id)
          .executeTakeFirst();
      
      const pets = await db.selectFrom("pets_table as pets")
          .select(['pet_id','pet_name','pet_birthdate','pet_breed','pet_image'])
          .where('pets.user_id','=',user_id)
          .execute();


          
      if(user === undefined) return emptyUser();

      const updated_pets = pets.map( pet => ({...pet, pet_birthdate: pet.pet_birthdate.toISOString()}));
      const combinedRes = {...user, pets: updated_pets as DogData[]}
      return combinedRes;
  } catch(e) {
      return emptyUser();
  }
}

export async function checkIfUserNotExist(email: string) {
  
  try {
    if(!email) return false;

    const user = await db.selectFrom("users_table as user")
        .select(['user.user_id'])
        .where('user.email','=', email)
        .executeTakeFirst();

    if(user) return false;

    return true;
  } catch(e) {
    return false;
  }
}

export async function registerUser(email: string, password: string) {

  try {
    if(!email && !password) return nonUser();

    const resultUser = await db.insertInto('users_table')
      .values({
        email: email,
        password: password,
        google_id: '',
        user_lvl: 2,
        updated_at: new Date(Date.now()),
        created_at: new Date(Date.now())
      })
      .returning(['user_id'])
      .executeTakeFirstOrThrow();

      return resultUser;
  } catch(e) {
    return nonUser();
  }
}

export async function registerUserDetails(formData: FormData) {
  try {
    if(!formData) return false;

    const docCookies = cookies();
    const session = docCookies.get('session');
    if(!session) throw new Error(ERR_MSG['ERR10']);

    const decryptedCookies = await decrypt(session.value);

    await db.insertInto("user_details_table")
      .values({
        user_first_name: formData.get('fname') as string,
        user_last_name: formData.get('lname') as string,
        user_image: formData.get('fileUrl') as string,
        user_codename: formData.get('codename') as string,
        user_agreement: 0,
        user_gender: formData.get('gender') as string,
        user_birthdate: new Date(formData.get('birthdate') as string),
        user_id: decryptedCookies.user.user_id,
        user_occupation: formData.get('occupation') as string,
        updated_at: new Date(Date.now()),
        created_at: new Date(Date.now())
      })
      .executeTakeFirstOrThrow();

      return true;
  } catch(e) {
    return false;
  }
}

export async function findGoogleUser(google_id: string) {
  try {
    if(!google_id) return -2;

    const user_id = await db.selectFrom("users_table as users")
            .select(["users.user_id"])
            .where("users.google_id","=", google_id)
            .executeTakeFirst();
    
    return user_id ? user_id.user_id : -1;
  } catch(e) {
    return -2;
  } 
}

interface GoogleUser {
  id: string,
  email: string,
  verified_email: boolean,
  name: string, // Code name
  given_name: string, // fname
  family_name: string, // lname
  picture: string
}

export async function registerGoogleUser(email: string, google_id: string) {

  try {
    if(!email || !google_id) throw new Error(ERR_MSG['ERR8']);

    const resultUser = await db.insertInto('users_table')
      .values({
        email: email,
        password: '',
        google_id: google_id,
        user_lvl: 2,
        updated_at: new Date(Date.now()),
        created_at: new Date(Date.now())
      })
      .returning(['user_id'])
      .executeTakeFirstOrThrow();

      return resultUser;
  } catch(e) {
    let _e = (e as Error).message;
    throw _e;
  }
}

export async function retrieveDecryptedSession() {

  const docCookies = cookies();
  const session = docCookies.get('session')?.value;
  if(!session) redirect("/login");

  const decryptedSession = await decrypt(session as string);
  const userDetails = await getUserDetails(decryptedSession.user.user_id).catch(() => redirect("/signup/personal-info"));

  return {decryptedSession: decryptedSession, userDetails: userDetails};

}

export async function getUserId() {
  const docCookies = cookies();
  const session = docCookies.get('session')?.value;
  if(!session) redirect("/login");

  const decryptedSession = await decrypt(session as string);
  
  return decryptedSession ? decryptedSession.user.user_id as number : -1;
}

export async function retrieveUserRecipes(user_id: number, page: number) {
  try {
    const OFFSET = (page - 1) * FRONT_PAGE_RECIPE_QUERY_LIMIT;
    const recipes = await db.selectFrom("recipes_table").select(["recipe_name", "recipe_id", "recipe_age_tag", 
        "recipe_event_tag","recipe_size_tag", "recipe_description","user_id", "created_at", "total_likes", "total_views"
    ])
        .where("user_id","=",user_id)
        .orderBy("created_at", "desc")
        .limit(FRONT_PAGE_RECIPE_QUERY_LIMIT)
        .offset(OFFSET)
        .execute();
    const updated_recipes = await processRecipes(recipes);
    console.log(updated_recipes.length);

    return {message: 'asd!',body: updated_recipes, status: 200};
  } catch(e) {
      let _e = (e as Error).message;
      return {message: _e, body: undefined, status: 500};
  }
}

export async function retrieveLikedRecipes(user_id: number, page: number) {
  try {
    const OFFSET = (page - 1) * FRONT_PAGE_RECIPE_QUERY_LIMIT;
    const likedRecipes = await db.selectFrom("likes_table")
      .select("recipe_id")
      .where("user_id","=",user_id)
      .execute();

    const likedRecipesIds = likedRecipes.map( rec => rec.recipe_id);

    const recipes = await db.selectFrom("recipes_table").select(["recipe_name", "recipe_id", "recipe_age_tag", 
        "recipe_event_tag","recipe_size_tag", "recipe_description","user_id", "created_at", "total_likes", "total_views"
    ])
        .where("recipe_id","in",likedRecipesIds)
        .orderBy("created_at", "desc")
        .limit(FRONT_PAGE_RECIPE_QUERY_LIMIT)
        .offset(OFFSET)
        .execute();
    const updated_recipes = await processRecipes(recipes);

    return {message: 'asd!',body: updated_recipes, status: 200};
  } catch(e) {
      let _e = (e as Error).message;
      return {message: _e, body: undefined, status: 500};
  }
}

export async function updateUserInfo(codenm: string, profPic: File, user_id: number) {
  try {
    const recipes = await db.selectFrom("recipes_table").select(["recipe_name", "recipe_id", "recipe_age_tag", 
        "recipe_event_tag","recipe_size_tag", "recipe_description","user_id", "created_at", "total_likes", "total_views"
    ])
        .where("user_id","=",user_id)
        .orderBy("created_at", "desc")
        .execute();
    const updated_recipes = await processRecipes(recipes);

    return {message: 'asd!',body: updated_recipes, status: 200};
  } catch(e) {
      let _e = (e as Error).message;
      return {message: _e, body: undefined, status: 500};
  }
}

export async function uploadNotifications(
  user_id: number, 
  recipe_owner_id: number, 
  notification_content: string,
  is_read: boolean,
  liked: boolean,
  recipe_id: number,
  recipe_image: string,
  type: string
) {
  try {
    const dt = {
      user_id: user_id,
      recipe_owner_id: recipe_owner_id,
      notification_content: notification_content,
      type: type,
      recipe_image: recipe_image,
      recipe_id: recipe_id,
      liked: liked,
      updated_at: new Date(),
      created_at: new Date(),
      is_read: is_read,
    };

    const conflictKeys = ['user_id', 'recipe_owner_id', 'type', 'recipe_id'];
    const conflictColumns = conflictKeys.map(key => `"${key}"`).join(', ');

    const updateFields = Object.keys(dt)
    .filter(key => !conflictKeys.includes(key))
    .map(key => `"${key}" = EXCLUDED.${key}`)
    .join(', ');

    const upsertQuery = sql`
    INSERT INTO notifications_table (
      user_id, recipe_owner_id, notification_content, type,
      recipe_image, recipe_id, liked, updated_at, created_at, is_read
    ) VALUES (
      ${dt.user_id}, ${dt.recipe_owner_id}, ${dt.notification_content}, ${dt.type},
      ${dt.recipe_image}, ${dt.recipe_id}, ${dt.liked || false}, ${dt.updated_at}, ${dt.created_at}, ${dt.is_read}
    )
      ON CONFLICT (${sql.raw(conflictColumns)})
      WHERE type = ${dt.type}
      DO UPDATE SET ${sql.raw(updateFields)}
    `.compile(db);
    
    await db.executeQuery(upsertQuery);

    console.log("[Success]: Successfully inserted notification!");
    return true;
  } catch(e) {
    console.error("[Error]: " + (e as Error).message);
    return false;
  }
}

export async function updateNotifications(
  user_id: number, 
  recipe_owner_id: number, 
  notification_content: string,
  is_read: boolean,
  liked: boolean,
  recipe_id: number,
  recipe_image: string,
  type: string
) {
  try {

    await db.updateTable("notifications_table").set({
      user_id: user_id,
      recipe_owner_id: recipe_owner_id,
      notification_content: notification_content,
      type: type,
      recipe_image: recipe_image,
      recipe_id: recipe_id,
      liked: liked,
      updated_at: new Date(),
      is_read: is_read,
    })
    .where("recipe_owner_id","=",recipe_owner_id)
    .where("user_id","=",user_id)
    .execute();

    console.log("[Success]: Successfully inserted notification!");
    return true;
  } catch(e) {
    console.error("[Error]: " + (e as Error).message);
    return false;
  }
}

export async function getNotifications(user_id: number) {
  try {
    const notifs = await db.selectFrom("notifications_table")
        .selectAll()
        .where("user_id", "=", user_id)
        .orderBy("created_at desc")
        .execute();

    console.log("[Success]: Successfully retrieved notifications!");
    return notifs;
  } catch(e) {
    console.error("[Error]: " + (e as Error).message);
    return [];
  }
}