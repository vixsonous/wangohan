import { ERR_MSG } from "@/constants/constants";
import { ingredients, instructions, recipe } from "@/constants/interface";
import { db } from "@/lib/database/db";
import { cookies } from "next/headers";
import { decrypt } from "./lib";
import { getFile } from "./file-lib";


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
                recipe_description: recipe.recipeDescr,
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

export const getRecipeTitle = async (recipeId:number) => {
    try {
        const recipe_title = await db.selectFrom("recipes_table").select(["recipe_name"])
            .where("recipe_id","=", recipeId)
            .executeTakeFirst();

        if(recipe_title === undefined) throw new Error("Recipe is not found!");

        return {message: 'Success!',body: recipe_title, status: 200};
    } catch(e) {
        let _e = (e as Error).message;
        return {message: _e, body: undefined, status: 500};
    }
}

export const getRecipeData = async (recipeId:number) => {
    try {

        const recipe_data = await db.selectFrom("recipes_table").select(["recipe_name", "recipe_id", "recipe_age_tag", 
            "recipe_event_tag","recipe_size_tag", "recipe_description","user_id"
        ])
            .where("recipe_id","=", recipeId)
            .executeTakeFirst();

        if(recipe_data === undefined) throw new Error("Recipe is not found!");

        const user = await db.selectFrom("user_details_table as user_details")
            .select(['user_details.user_codename','user_details.user_image', 'user_details.user_detail_id'])
            .where('user_details.user_id','=',recipe_data?.user_id)
            .executeTakeFirst();
        const recipe_instructions = await db.selectFrom("recipe_instructions_table").select(["recipe_instructions_id", "recipe_instructions_text"])
            .where("recipe_id", "=", recipeId).execute();
            
        const recipe_ingredients = await db.selectFrom("recipe_ingredients_table").select(["recipe_ingredient_id", "recipe_ingredients_name", "recipe_ingredients_amount"])
            .where("recipe_id", "=", recipeId).execute();

        const recipe_images = await db.selectFrom("recipe_images_table").select(["recipe_image_id", "recipe_image", "recipe_image_title", "recipe_image_subtext"])
            .where("recipe_id", "=", recipeId).execute();

        const recipe_comments = await db.selectFrom("recipe_comments_table").select(["recipe_comment_id", "recipe_comment_rating", "recipe_comment_subtext", "recipe_comment_title", "user_id", "created_at"])
            .where("recipe_id","=", recipeId).execute();

        const with_user_comments = await Promise.all(recipe_comments.map( async com => {
            return {...com, user: await db.selectFrom("user_details_table").select(["user_id","user_image","user_codename"]).where("user_id","=",com.user_id).executeTakeFirstOrThrow()}
        }));

        const updated_recipe_comments = await Promise.all(with_user_comments.map(async com => {
            return {...com, user: {...com.user, user_image: com.user ? await getFile(com.user.user_image) : ''}}
        }))

        console.log(updated_recipe_comments);
        return {message: 'asd!',body: {...recipe_data, user: user, recipe_instructions: recipe_instructions, recipe_ingredients: recipe_ingredients, recipe_images: recipe_images, recipe_comments: updated_recipe_comments}, status: 200};
    } catch(e) {
        let _e = (e as Error).message;
        return {message: _e, body: undefined, status: 500};
    }
}