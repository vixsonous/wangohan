import { getAllComments, getComments, uploadComment } from "@/action/comments";
import { ERR_MSG, SUCC_MSG } from "@/constants/constants";
import { Comment } from "@/constants/interface";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest) => {
    try {
        const reqBody = await req.json();

        if(!reqBody.rating || Number(reqBody.rating) === 0) throw new Error(ERR_MSG.ERR23)
        if(!reqBody.subtext || reqBody.subtext === '') throw new Error(ERR_MSG.ERR24)

        const commentToUpload = {
            recipe_comment_rating: reqBody.rating,
            recipe_comment_subtext: reqBody.subtext,
            recipe_comment_title: reqBody.title,
            recipe_id: reqBody.recipe_id,
            user_id: reqBody.user_id,
        } as Comment;

        const uploadedComment = await uploadComment(commentToUpload);
        
        return NextResponse.json({message: "", body: uploadedComment.body}, {status: 200});
    } catch(e) {
        return NextResponse.json({message: (e as Error).message, body: {}}, {status: 500});
    }
}

export const GET = async (req:NextRequest) => {
    try {
        const search = req.nextUrl.searchParams;

        const recipeId = search.get('recipeId');
        const pageNo = search.get('pageNo');

        

        if(!pageNo) throw new Error(ERR_MSG.ERR25);
        if(!recipeId) throw new Error(ERR_MSG.ERR26);

        // const recipe_comments = await getComments(Number(pageNo), Number(recipeId));
        const recipe_comments = await getAllComments(Number(recipeId));

        return NextResponse.json({message: SUCC_MSG.SUCCESS1, body: recipe_comments}, {status: 200});
    } catch(e) {
        return NextResponse.json({message: (e as Error).message, body: {}}, {status: 500});
    }
}