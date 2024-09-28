import { Comment } from "@/constants/interface";
import { db } from "@/lib/database/db";
import { getFile } from "./file-lib";

export const uploadComment = async (comment: Comment) => {
    
    try {
        const uploadedComment = await db.insertInto("recipe_comments_table").values({
            recipe_comment_subtext: comment.recipe_comment_subtext,
            recipe_comment_rating: comment.recipe_comment_rating,
            recipe_comment_title: comment.recipe_comment_title,
            recipe_id: comment.recipe_id,
            user_id: comment.user_id,
            created_at: new Date(),
            updated_at: new Date()
        })
        .returningAll()
        .executeTakeFirstOrThrow();

        return {message: 'Success!', body: uploadedComment, status: 200};
    } catch(e) {

        return {message: (e as Error).message, body: {}, status: 500};
    }
}

export const getComments = async (pageNo: number, recipe_id: number) => {
    try {
        const RECIPE_COMMENT_QUERY_LIMIT = 10;
        
        const recipe_comments = await db.selectFrom("recipe_comments_table").select(["recipe_comment_id", "recipe_comment_rating", "recipe_comment_subtext", "recipe_comment_title", "user_id", "created_at", "recipe_id"])
            .where("recipe_id","=", recipe_id)
            .orderBy("created_at desc")
            .limit(RECIPE_COMMENT_QUERY_LIMIT)
            .offset(pageNo * RECIPE_COMMENT_QUERY_LIMIT)
            .execute();

        const with_user_comments = await Promise.all(recipe_comments.map( async com => {
            return {...com, user: await db.selectFrom("user_details_table").select(["user_id","user_image","user_codename"]).where("user_id","=",com.user_id).executeTakeFirstOrThrow()}
        }));

        const updated_recipe_comments = with_user_comments.map(com => {
            return {...com, user: {...com.user, user_image: com.user ? com.user.user_image : ''}, created_at: new Date(com.created_at).toDateString()}
        });

        return updated_recipe_comments;
    } catch(e) {
        return [];
    }
}

export const getAllComments = async (recipe_id: number) => {
    try {
        
        const recipe_comments = await db.selectFrom("recipe_comments_table").select(["recipe_comment_id", "recipe_comment_rating", "recipe_comment_subtext", "recipe_comment_title", "user_id", "created_at", "recipe_id"])
            .where("recipe_id","=", recipe_id)
            .orderBy("created_at desc")
            .offset(10)
            .execute();

        const with_user_comments = await Promise.all(recipe_comments.map( async com => {
            return {...com, user: await db.selectFrom("user_details_table").select(["user_id","user_image","user_codename"]).where("user_id","=",com.user_id).executeTakeFirstOrThrow()}
        }));

        const updated_recipe_comments = with_user_comments.map(com => {
            return {...com, user: {...com.user, user_image: com.user ? com.user.user_image : ''}, created_at: new Date(com.created_at).toDateString()}
        });

        return updated_recipe_comments;
    } catch(e) {
        return [];
    }
}