'use client';
import { sm } from "@/constants/constants";
import { DisplayRecipe } from "@/constants/interface";
import Image from "next/image";
import Link from "next/link";
import StarReviews from "./ElementComponents/StarReviews";
import OptImage from "./ElementComponents/Image";

interface Props {
    recipe: DisplayRecipe
}

export default function RecipeElementV1 ({recipe}:Props) {
    const CardFontSize = '12px';
    const CardTagSize = '9px';

    return (
    <Link href={`/recipe/show/${recipe.recipe_id}`}>
        <div className="flex flex-col gap-[8px]">
            <OptImage src={recipe.recipe_image} loading="lazy" className="will-change-transform object-cover rounded-md w-full h-[130px] relative max-w-[100%] block" height={50} width={50} />
            <h1 className={`text-[${CardFontSize}] overflow-hidden text-ellipsis font-bold line-clamp-2`}>{recipe.recipe_name}</h1>
            <div className="flex justify-between mt-[-4px]">
                <div className="flex items-center ml-[-4px]">
                    <StarReviews value={recipe.recipe_rating_data ? recipe.recipe_rating_data.avgRating : 0} interactive={false} large={true}/>
                </div>
                <div className="flex gap-[5px] items-center">
                    <span className={`text-[${CardFontSize}]`}>{recipe.total_views} views</span>
                </div>
            </div>
            <div className={`flex justify-between`}>
                <div className={`w-full flex gap-[5px] flex-wrap items-center `}>
                    {recipe.recipe_size_tag === '' && recipe.recipe_age_tag === '' && recipe.recipe_event_tag === '' && (<span className={`bg-[#523636] text-xs opacity-[0] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px]`}>Null</span>)}
                    {recipe.recipe_size_tag !== '' ? <span className={`bg-[#523636] text-xs self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px]`}>{recipe.recipe_size_tag}</span> : null}
                    {recipe.recipe_age_tag !== '' ? <span className={`bg-[#523636] text-xs self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px]`}>{recipe.recipe_age_tag}</span> : null}
                    {recipe.recipe_event_tag !== '' ? <span className={`bg-[#523636] text-xs self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px]`}>{recipe.recipe_event_tag}</span> : null}
                </div>
            </div>
        </div>
    </Link>
    )
}