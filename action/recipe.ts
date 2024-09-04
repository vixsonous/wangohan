import { ERR_MSG } from "@/constants/constants";
import { ingredients, instructions, recipe } from "@/constants/interface";
import { db } from "@/lib/database/db";
import { cookies } from "next/headers";
import { decrypt } from "./lib";


export const postRecipe = async (recipe:recipe) => {
    try {
        const cookie = cookies();
        const session = cookie.get('session');
        if(!session) throw new Error(ERR_MSG['ERR10']);

        const decryptedCookies = await decrypt(session.value);
        const user_id = decryptedCookies.user.user_id;

        const recipe_id = await db.insertInto("recipes_table")
            .values({
                recipe_name: recipe.recipeTitle,
                recipe_category: '',
                recipe_event_tag: recipe.event,
                recipe_age_tag: recipe.age,
                recipe_size_tag: recipe.size,
                total_favourites: 0,
                total_likes: 0,
                user_id: user_id,
                updated_at: new Date(),
                created_at: new Date()
            })
            .returning(['recipe_id'])
            .executeTakeFirstOrThrow();

        return {message: 'Success!',body: recipe_id, status: 200};
    } catch(e) {
        let _e = (e as Error).message;
        return {message: _e, body: {}, status: 500};
    }
}

export const postIngredients = async (recipeIngredients: Array<ingredients>, recipe_id: number) => {
    try {
        const filteredIngredients = recipeIngredients.filter(el => el.amount !== '' && el.name !== '');
        const arr = filteredIngredients.map(el => {
            return {
                recipe_id: recipe_id,
                recipe_ingredients_amount: el.amount,
                recipe_ingredients_name: el.name,
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        await db.insertInto("recipe_ingredients_table")
            .values([...arr])
            .executeTakeFirstOrThrow();

        return {message: 'Success!',body: {}, status: 200};
    } catch(e) {
        let _e = (e as Error).message;
        return {message: _e, body: {}, status: 500};
    }
}

export const postInstructions = async (recipeInstructions: Array<instructions>, recipe_id: number) => {
    try {
        const filteredIngredients = recipeInstructions.filter(el => el.text !== '');
        const arr = filteredIngredients.map(el => {
            return {
                recipe_id: recipe_id,
                recipe_instructions_text: el.text,
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        await db.insertInto("recipe_instructions_table")
            .values(arr)
            .executeTakeFirstOrThrow();

        return {message: 'Success!',body: {}, status: 200};
    } catch(e) {
        let _e = (e as Error).message;
        return {message: _e, body: {}, status: 500};
    }
}