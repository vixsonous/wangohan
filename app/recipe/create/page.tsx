import { Metadata } from "next";
import Image from "next/image";
import RecipeIngredients from "./components/RecipeIngredients";
import RecipeInstructions from "./components/RecipeInstructions";
import CreateRecipeForm from "./components/CreateRecipeForm";


export const metadata:Metadata = {
    title: 'Create Recipe'
}

export default function RecipeCreate() {
    
    return(
        <div className="flex flex-col p-[20px] gap-[20px]">
            <div className="flex justify-center items-center relative mt-[10px] mb-[30px]">
                <h1 className="absolute top-[55px] font-semibold text-[#523636] text-[2em]">レシピを書く</h1>
                <img src={'/recipe-button.png'} className="h-[auto] w-[300px] max-w-none" width={10000} height={10000}  alt="ribbon" />
            </div>

            <div className="create-form-container flex justify-center items-center">
                <CreateRecipeForm />
            </div>
        </div>
    )
}