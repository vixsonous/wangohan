import { ERR_MSG, getExpireDate } from "@/constants/constants";
import { DBRecipeData, ingredients, instructions, recipe } from "@/constants/interface";
import { db } from "@/lib/database/db";
import { cookies } from "next/headers";
import { decrypt, encrypt, getDecryptedSession, padStartIds } from "./lib";
import { deleteFilesinFolder, getFile } from "./file-lib";
import { NextResponse } from "next/server";
import { getComments } from "./comments";

const FRONT_PAGE_RECIPE_QUERY_LIMIT = 10;

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
                total_views: 0,
                user_id: user_id,
                updated_at: new Date(),
                created_at: new Date()
            })
            .returning(['recipe_id'])
            .executeTakeFirstOrThrow();

        return {message: '完了',body: recipe_id, status: 200};
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

        return {message: '完了',body: {}, status: 200};
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

        return {message: '完了',body: {}, status: 200};
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

        return {message: '完了',body: recipe_title, status: 200};
    } catch(e) {
        let _e = (e as Error).message;
        return {message: _e, body: undefined, status: 500};
    }
}

const getRecipeRatingData = async (recipeId: number) => {
    try {
        const recipe_rating_data = await db.selectFrom("recipe_comments_table").select(
            ({fn, val, ref}) => [
                fn.count<number>("recipe_comment_id").filterWhere("recipe_id","=", recipeId).as("totalRating"),
                fn.avg<number>("recipe_comment_rating").filterWhere("recipe_id","=", recipeId).as("avgRating"),
            ]
        ).executeTakeFirstOrThrow();

        return recipe_rating_data;
    } catch(e) {
        return undefined;
    }
}

export const getRecipeData = async (recipeId:number) => {
    try {

        const recipe_data = await db.selectFrom("recipes_table").select(["recipe_name", "recipe_id", "recipe_age_tag", 
            "recipe_event_tag","recipe_size_tag", "recipe_description","user_id", "total_likes", "total_views"
        ])
            .where("recipe_id","=", recipeId)
            .executeTakeFirst();

        if(recipe_data === undefined) throw new Error("Recipe is not found!");

        const user = await db.selectFrom("user_details_table as user_details")
            .select(['user_details.user_codename','user_details.user_image', 'user_details.user_detail_id','user_id'])
            .where('user_details.user_id','=',recipe_data.user_id)
            .executeTakeFirst();
        const recipe_instructions = await db.selectFrom("recipe_instructions_table").select(["recipe_instructions_id", "recipe_instructions_text"])
            .where("recipe_id", "=", recipeId).execute();
            
        const recipe_ingredients = await db.selectFrom("recipe_ingredients_table").select(["recipe_ingredient_id", "recipe_ingredients_name", "recipe_ingredients_amount"])
            .where("recipe_id", "=", recipeId).execute();

        const recipe_images = await db.selectFrom("recipe_images_table").select(["recipe_image_id", "recipe_image", "recipe_image_title", "recipe_image_subtext"])
            .where("recipe_id", "=", recipeId).execute();

        const recipe_comments = await getComments(0, recipeId);

        const recipe_rating_data = await getRecipeRatingData(recipeId);

        if(!recipe_rating_data) throw new Error(ERR_MSG.ERR27);

        return {message: 'asd!',body: {...recipe_data, user: user, recipe_instructions: recipe_instructions, recipe_ingredients: recipe_ingredients, recipe_images: recipe_images, recipe_comments: recipe_comments, recipe_rating_data: recipe_rating_data}, status: 200};
    } catch(e) {
        let _e = (e as Error).message;
        return {message: _e, body: undefined, status: 500};
    }
}

export const processRecipes = async (recipes: Array<DBRecipeData>) => {
    const with_image_recipes = await Promise.all( recipes.map(async recipe => {
        return {...recipe, 
            recipe_image: await db.selectFrom("recipe_images_table").select(["recipe_image_id", "recipe_image", "recipe_image_title", "recipe_image_subtext"])
            .where("recipe_id", "=", recipe.recipe_id).executeTakeFirst(),
            recipe_rating_data: await getRecipeRatingData(recipe.recipe_id)
        }
    }));

    const updated_recipes = with_image_recipes.map( recipe => {
        return {...recipe, recipe_image: recipe.recipe_image ? recipe.recipe_image.recipe_image : '/recipe-making/pic-background.png'}
    });

    return updated_recipes;
}

export const getWeeklyRecipes = async (page: number = 0) => {
    try {

        const OFFSET = page * FRONT_PAGE_RECIPE_QUERY_LIMIT;
        const recipes = await db.selectFrom("recipes_table").select(["recipe_name", "recipe_id", "recipe_age_tag", 
            "recipe_event_tag","recipe_size_tag", "recipe_description","user_id", "created_at", "total_likes", "total_views"
        ])
            .where("created_at", ">=", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
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

export const getPopularRecipes = async (page: number = 0) => {

    try {
        const OFFSET = page * FRONT_PAGE_RECIPE_QUERY_LIMIT;
        const recipes = await db.selectFrom("recipes_table").select(["recipe_name", "recipe_id", "recipe_age_tag", 
            "recipe_event_tag","recipe_size_tag", "recipe_description","user_id", "created_at", "total_likes", "total_views"
        ])
            // .where("created_at", ">=", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
            .orderBy("total_views", "desc")
            .limit(FRONT_PAGE_RECIPE_QUERY_LIMIT)
            .offset(OFFSET)
            .execute();

        const updated_recipes = await processRecipes(recipes);

        return {message: '完了',body: updated_recipes, status: 200};
    } catch(e) {
        let _e = (e as Error).message;
        return {message: _e, body: undefined, status: 500};
    }
}

export const updateRecipeViews = async (recipe_id: number) => {
    try {
        console.log("is updating!");
        const recipes = await db.updateTable("recipes_table").set(eb => ({
            total_views: eb("total_views","+",1)
        })).where("recipe_id","=",recipe_id).execute();

        return {message: '完了',body: undefined, status: 200};
    } catch(e) {
        let _e = (e as Error).message;
        return {message: _e, body: undefined, status: 500};
    }
}

export const deleteRecipe = async (recipe_id: number) => {
    try {

        const decryptedSession = await getDecryptedSession();
        const user_id = decryptedSession.user.user_id;
        
        if(!decryptedSession) throw new Error("Unauthorized delete!");

        const deletedIngredients = await db.deleteFrom("recipe_ingredients_table")
            .where("recipe_id", "=", recipe_id)
            .execute();
        
        const deletedInstructions = await db.deleteFrom("recipe_instructions_table")
            .where("recipe_id", "=", recipe_id)
            .execute();
        
        const deleteImages = await db.deleteFrom("recipe_images_table")
            .where("recipe_id","=",recipe_id)
            .execute();

        const deleteComments = await db.deleteFrom("recipe_comments_table")
            .where("recipe_id", "=", recipe_id)
            .execute();

        const deleteRecipe = await db.deleteFrom("recipes_table")
            .where("recipe_id","=",recipe_id)
            .execute();

        const directory = `${padStartIds(user_id)}/recipes/${padStartIds(String(recipe_id))}`;

        await deleteFilesinFolder(directory);

        return {message: "Successfully deleted!", body: undefined, status: 200};

    } catch(e) {
        return {message: (e as Error).message, body: undefined, status: 500};
    }
}