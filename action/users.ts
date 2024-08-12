"use server";
import { ERR_MSG } from "@/constants/constants";
import { db } from "@/lib/database/db";

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
            .select(['user.user_id'])
            .where('email','=',email)
            .where('password','=', password)
            .executeTakeFirst();
        
        if(user === undefined) throw new Error(ERR_MSG['ERR1']); // User not found!

        return user;
    } catch(e) {
        let _e = (e as Error).message;
        throw _e;
    }
}

export async function getUserDetails(user_id: number) {
  if(!user_id) throw new Error(ERR_MSG['ERR3']);

  try {

      const user = await db.selectFrom("users_table as user")
          .select(['user.user_codename','user.user_image'])
          .where('user.user_id','=',user_id)
          .executeTakeFirst();
      
      const pets = await db.selectFrom("pets_table as pets")
          .select(['pet_id','pet_name','pet_birthdate','pet_breed','pet_image'])
          .where('pets.user_id','=',user_id)
          .execute();
      if(user === undefined) throw new Error(ERR_MSG['ERR4']);

      const combinedRes = {...user, pets: pets}
      return combinedRes;
  } catch(e) {
      let _e = (e as Error).message;
      throw _e;
  }
}