"use server";
import { ERR_MSG } from "@/constants/constants";
import { db } from "@/lib/database/db";
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import { decrypt } from "./lib";
import { DogData } from "@/constants/interface";

export async function getUsers() {
  try {
    // return await db.selectFrom("users_table").selectAll().execute();
    return "neagaga";
  } catch (error) {
    return "Error getting users";
  }
}

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
  if(!user_id) throw new Error(ERR_MSG['ERR3']);

  try {

      const user = await db.selectFrom("user_details_table as user_details")
          .select(['user_details.user_codename','user_details.user_image', 'user_details.user_detail_id'])
          .where('user_details.user_id','=',user_id)
          .executeTakeFirst();
      
      const pets = await db.selectFrom("pets_table as pets")
          .select(['pet_id','pet_name','pet_birthdate','pet_breed','pet_image'])
          .where('pets.user_id','=',user_id)
          .execute();

      if(user === undefined) throw new Error(ERR_MSG['ERR4']);

      const combinedRes = {...user, pets: pets as DogData[]}
      return combinedRes;
  } catch(e) {
      let _e = (e as Error).message;
      throw _e;
  }
}

export async function checkIfUserNotExist(email: string) {
  
  try {
    if(!email) throw new Error(ERR_MSG['ERR5']);

    const user = await db.selectFrom("users_table as user")
        .select(['user.user_id'])
        .where('user.email','=', email)
        .executeTakeFirst();

    if(user) throw new Error(ERR_MSG['ERR6']);

    return true;
  } catch(e) {
    let _e = (e as Error).message;
    throw _e;
  }
}

export async function registerUser(email: string, password: string) {

  try {
    if(!email && !password) throw new Error(ERR_MSG['ERR8']);

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
    let _e = (e as Error).message;
    throw _e;
  }
}

export async function registerUserDetails(formData: FormData) {
  try {
    if(!formData) throw new Error(ERR_MSG['ERR11']);

    const docCookies = cookies();
    const session = docCookies.get('session');
    if(!session) throw new Error(ERR_MSG['ERR10']);

    const decryptedCookies = await decrypt(session.value);

    const resultUser = await db.insertInto("user_details_table")
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

      return resultUser;
  } catch(e) {
    let _e = (e as Error).message;
    throw _e;
  }
}

export async function findGoogleUser(google_id: string) {
  try {
    if(!google_id) throw new Error(ERR_MSG['ERR12']);

    const user_id = await db.selectFrom("users_table as users")
            .select(["users.user_id"])
            .where("users.google_id","=", google_id)
            .executeTakeFirst();
    
    return user_id ? user_id.user_id : -1;
  } catch(e) {
    let _e = (e as Error).message;
    throw _e;
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