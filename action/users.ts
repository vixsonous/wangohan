"use server";
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

    if(!email || !password) throw new Error("Please input email or password!");

    try {

        const user = await db.selectFrom("users_table as user")
            .innerJoin('user_details_table as detail','detail.user_id', 'user.user_id' )
            .select(['user.user_id','email','user_agreement','detail.user_first_name', 'detail.user_last_name',
                'detail.user_address','detail.user_codename','detail.user_gender','detail.user_image','detail.user_birthdate','detail.user_occupation','detail.user_detail_id'])
            .where('email','=',email)
            .where('password','=', password)
            .execute();
        
        if(user === undefined || user.length < 1) throw new Error("User not found!");

        return user;
    } catch(e) {
        let _e = (e as Error).message;
        throw _e;
    }
}