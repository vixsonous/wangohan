import { decrypt, encrypt } from "@/action/lib";
import { updateRecipeViews } from "@/action/recipe";
import { getExpireDate } from "@/constants/constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH (req: NextRequest) {
    try {

        // Structure of body = {recipe_id: x}
        const body = await req.json();
        const recipe_id = body.recipe_id as number;

        const docCookies = cookies();
        const session = docCookies.get('session')?.value;
        if(session) {
            const decrypted = await decrypt(session);
            const user = decrypted.user;
            console.log(user);

            if(!user.viewed_recipes) {
                user.viewed_recipes = new Array<number>();
                user.viewed_recipes.push(recipe_id);
                await updateRecipeViews(recipe_id);
            } else if(!user.viewed_recipes.includes(recipe_id)){
                user.viewed_recipes.push(recipe_id);
                await updateRecipeViews(recipe_id);
            }
            
            decrypted.user = user;
            decrypted.expires = getExpireDate();
            const res = NextResponse.json({message: 'Updated', body: {}}, {status: 200});

            res.cookies.set({
                name: 'session',
                value: await encrypt(decrypted),
                httpOnly:true,
                expires: decrypted.expires
            });

            return res;
        } else {
            return NextResponse.redirect(process.env.BASE_URL + "/",{status: 302});
        }
    } catch(e) {
        let _e = (e as Error).message;
        return NextResponse.json({message: _e, body: {}}, {status: 500});
    }
}