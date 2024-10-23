import { logEnd, logStart } from "@/action/lib";
import { isLikedExist, postLike, updateLike } from "@/action/recipe";
import { getUserId } from "@/action/users";
import { ERR_MSG, SUCC_MSG } from "@/constants/constants";
import { db } from "@/lib/database/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    try {
        const body = await req.json();

        const recipe_id = Number(body.recipe_id);
        const user_id = await getUserId();

        if(!user_id) throw new Error(ERR_MSG.ERR10);

        const st = logStart("Posting Like")
        const res = await postLike(recipe_id, user_id);
        logEnd(st);

        if(!res || res.status === 500) throw new Error(res.message);

        return NextResponse.json({message: SUCC_MSG.SUCCESS1, body: true}, {status: 200});
    } catch(e) {
        return NextResponse.json({message: (e as Error).message, body: {}}, {status: 500});
    }
}

export const PATCH = async (req: NextRequest) => {

    try {
        const body = await req.json();

        const recipe_id = Number(body.recipe_id);
        const user_id = await getUserId();
        const liked = body.isLiked;

        if(!user_id) throw new Error(ERR_MSG.ERR10);

        const st = logStart("Updating Like")
        const res = await updateLike(recipe_id, user_id, liked);
        logEnd(st);

        if(!res || res.status === 500) throw new Error(res.message);

        return NextResponse.json({message: SUCC_MSG.SUCCESS1, body: true}, {status: 200});
    } catch(e) {
        return NextResponse.json({message: (e as Error).message, body: {}}, {status: 500});
    }
}