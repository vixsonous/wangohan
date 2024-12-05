import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import RecipeIngredients from "./components/RecipeIngredients";
import RecipeInstructions from "./components/RecipeInstructions";
import CreateRecipeForm from "./components/EditRecipeForm";
import { getRecipeData, getRecipeTitle } from "@/action/recipe";
import { redirect } from "next/navigation";
import { getDecryptedSession } from "@/action/lib";
import EditRecipeForm from "./components/EditRecipeForm";

type Props = {
    params: {recipeId: String},
    searchParams: {[key: string]: string | string[] | undefined}
}

export async function generateMetadata({params} : Props, parent: ResolvingMetadata):Promise<Metadata> {
    const {recipeId} = params;
    const recipeData = await getRecipeTitle(Number(recipeId));

    let title = '';
    if(recipeData.status === 200 && recipeData.body !== undefined) {
        title = recipeData.body.recipe_name;
    }

    return {
        title: title,
        keywords: ["愛犬のための手作りごはんレシピサイト","わんごはん","Wangohan", "Dog food", "Pet food", "Pets", "Inu"],
        creator: "Victor Chiong",
        description: "Web for WanWan"
    }
}

export default async function RecipeCreate({params, searchParams}:{params: {recipeId:string}, searchParams: { [key: string]:string | string[] | undefined}}) {
    
    const {recipeId} = params;

    const ret = await getRecipeData(Number(recipeId));
    const recipe_data = ret.body;

    if(recipe_data === undefined || recipe_data.user === undefined ) redirect("/"); 

    const user_image = recipe_data.user.user_image === '' ? '/LP/bday-dogs/puppy1.jpg' : recipe_data.user.user_image;

    const decryptedSession = await getDecryptedSession();
    const isLoggedIn = decryptedSession ? true : false;

    return(
        <div className="flex flex-col p-[20px] gap-[20px]">
            <div className="flex justify-center items-center relative mt-[10px] mb-[30px]">
                <h1 className="absolute top-[55px] font-semibold text-[#523636] text-[2em]">レシピを書く</h1>
                <img src={'/recipe-button.webp'} className="h-[auto] w-[300px] max-w-none" width={10000} height={10000}  alt="ribbon" />
            </div>

            <div className="create-form-container flex justify-center items-center">
                <EditRecipeForm recipe_data={recipe_data} userId={decryptedSession.user.user_id} />
            </div>
        </div>
    )
}