import { logEnd, logStart } from "@/action/lib";
import { deleteRecipe, postIngredients, postInstructions, postRecipe, updateIngredients, updateInstructions, updateRecipe } from "@/action/recipe";
import { ERR_MSG, SUCC_MSG } from "@/constants/constants";
import { instructions, recipe } from "@/constants/interface";
import { ingredients } from "@/constants/types";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {

    try {
        const body : recipe = await req.json();

        if(body.recipeTitle === '') throw new Error(ERR_MSG['ERR14']);
        if(body.recipeDescr === '') throw new Error(ERR_MSG['ERR15']);
        if(Number(body.fileThumbnailsLength) === 0) throw new Error(ERR_MSG['ERR16']);
        
        if(body.recipeInstructions.length === 0 || body.recipeInstructions[0].text === '') throw new Error(ERR_MSG['ERR17']);
        if(body.recipeIngredients.length === 0 || body.recipeIngredients[0].amount === '') throw new Error(ERR_MSG['ERR18']);

        body.recipeIngredients.forEach((inst, idx) => {
            if(inst.name !== '' && inst.amount === '') throw new Error(ERR_MSG['ERR18']);
            if(inst.name === '' && inst.amount !== '') throw new Error(ERR_MSG['ERR19']);
        });

        const data = await postRecipe(body);
        const recipe_id = (data.body as {recipe_id:number}).recipe_id;

        await postIngredients(body.recipeIngredients, recipe_id);
        await postInstructions(body.recipeInstructions, recipe_id);

        return NextResponse.json({message: SUCC_MSG.SUCCESS1, body: recipe_id}, {status: 200});
    } catch(e) {

        let _e = (e as Error).message;
        return NextResponse.json({message: _e, body: {}}, {status: 500});
    }
}

export const PUT = async (req: NextRequest) => {
    try {

        const body = await req.json();
        const recipe = body as recipe;
        const recipe_id = Number(body.recipeId);

        if(recipe.recipeTitle === '') throw new Error(ERR_MSG['ERR14']);
        if(recipe.recipeDescr === '') throw new Error(ERR_MSG['ERR15']);
        if(Number(recipe.fileThumbnailsLength) === 0) throw new Error(ERR_MSG['ERR16']);
        
        if(recipe.recipeInstructions.length === 0 || recipe.recipeInstructions[0].text === '') throw new Error(ERR_MSG['ERR17']);
        if(recipe.recipeIngredients.length === 0 || recipe.recipeIngredients[0].amount === '') throw new Error(ERR_MSG['ERR18']);

        recipe.recipeIngredients.forEach((inst, idx) => {
            if(inst.name !== '' && inst.amount === '') throw new Error(ERR_MSG['ERR18']);
            if(inst.name === '' && inst.amount !== '') throw new Error(ERR_MSG['ERR19']);
        });

        const existingIngredients = (body.recipeIngredients as ingredients[]).filter(ingr => ingr.id !== undefined);
        const nonExistingIngredients = (body.recipeIngredients as ingredients[]).filter(ingr => ingr.id === undefined);

        const existingInstructions = (body.recipeInstructions as instructions[]).filter(ingr => ingr.id !== undefined);
        const nonExistingInstructions = (body.recipeInstructions as instructions[]).filter(ingr => ingr.id === undefined);

        const st = logStart("Updating Recipe");
        const resUpdRec = await updateRecipe(recipe, recipe_id);
        logEnd(st);
        if(resUpdRec.status === 500) throw new Error(resUpdRec.message);

        if(existingIngredients.length > 0) {
            const st1 = logStart("Updating Ingredients");
            const resUpdIngr = await updateIngredients(existingIngredients as Array<ingredients>);
            logEnd(st1);
            if(resUpdIngr.status === 500) throw new Error(resUpdIngr.message);
        }

        if(nonExistingIngredients.length > 0) {
            const st2 = logStart("Uploading Ingredients");
            const resPosIngr = await postIngredients(nonExistingIngredients, recipe_id);
            logEnd(st2);
            if(resPosIngr.status === 500) throw new Error(resPosIngr.message);
        }

        if(existingInstructions.length > 0) {
            const st3 = logStart("Updating Instructions");
            const resUpdInstr = await updateInstructions(existingInstructions as Array<instructions>);
            logEnd(st3);
            if(resUpdInstr.status === 500) throw new Error(resUpdInstr.message);
        }

        if(nonExistingInstructions.length > 0) {
            const st4 = logStart("Uploading Instructions");
            const resPosInstr = await postInstructions(nonExistingInstructions, recipe_id);
            logEnd(st4);
            if(resPosInstr.status === 500) throw new Error(resPosInstr.message);
        }

        return NextResponse.json({message: SUCC_MSG.SUCCESS1, body: resUpdRec.body}, {status: 200});
    } catch(e) {
        return NextResponse.json({message: (e as Error).message, body: {}}, {status: 500});
    }
}

export const GET = async (req: NextRequest) => {
    try {
        const params = req.nextUrl.searchParams;
        console.log(params);
        return NextResponse.json({message: SUCC_MSG.SUCCESS1, body: {}}, {status: 200});
    } catch(e) {
        let _e = (e as Error).message;
        return NextResponse.json({message: _e, body: {}}, {status: 500});
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        const reqBody = await req.json();

        const retSts = await deleteRecipe(reqBody.recipe_id);
        
        return NextResponse.json(retSts);
    } catch(e) {
        return NextResponse.json({message: (e as Error).message, body: {}}, {status: 500});
    }
}