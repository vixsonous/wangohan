import { postIngredients, postInstructions, postRecipe } from "@/action/recipe";
import { ERR_MSG } from "@/constants/constants";
import { recipe } from "@/constants/interface";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {

    try {
        const body : recipe = await req.json();

        if(body.recipeTitle === '') throw new Error(ERR_MSG['ERR14']);
        if(body.recipeDescr === '') throw new Error(ERR_MSG['ERR15']);
        if(body.recipeThumbnail === '/recipe-making/pic-background.png') throw new Error(ERR_MSG['ERR16']);
        
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

        return NextResponse.json({message: 'Success', body: recipe_id}, {status: 200});
    } catch(e) {

        let _e = (e as Error).message;
        return NextResponse.json({message: _e, body: {}}, {status: 500});
    }
}