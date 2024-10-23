import { deleteRecipeFiles } from "@/action/files";
import { logEnd, logStart } from "@/action/lib";
import { deleteRecipeInfo } from "@/action/recipe";
import { ERR_MSG, SUCC_MSG } from "@/constants/constants";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json();

        const files: Array<number> = body.files;
        const ingredients: Array<number> = body.ingredients;
        const instructions: Array<number> = body.instructions;

        const st = logStart("Deleting Recipe Files");
        if(files.length > 0) {
           await deleteRecipeFiles(files);
        }
        logEnd(st);
        
        const st2 = logStart("Deleting Recipe Info");
        if(ingredients.length > 0 || instructions.length > 0) {
            const res = await deleteRecipeInfo(ingredients, instructions);
            if(res.status === 500) throw new Error(res.message);
        }
        logEnd(st2);

        return NextResponse.json({message: SUCC_MSG.SUCCESS1, body: {}}, {status: 200});
    } catch(e) {
        return NextResponse.json({message: (e as Error).message, body: {}}, {status: 500});
    }
}