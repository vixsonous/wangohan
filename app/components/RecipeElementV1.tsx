'use client';
import { sm } from "@/constants/constants";
import { DisplayRecipe } from "@/constants/interface";
import Image from "next/image";
import Link from "next/link";
import StarReviews from "./ElementComponents/StarReviews";

interface Props {
    recipe: DisplayRecipe
}

export default function RecipeElementV1 ({recipe}:Props) {
    const CardFontSize = '10px';
    const CardTagSize = '9px';

    return (
    <Link href={`/recipe/show/${recipe.recipe_id}`}>
        <div className="flex flex-col gap-[10px]">
            <picture className="w-[100%] h-[130px]">
                <source srcSet={recipe.recipe_image} media="(max-height: 110px)" />
                <img src={recipe.recipe_image} loading="lazy" className="will-change-transform object-cover rounded-md w-full h-full relative max-w-[100%] block" width={1000} height={1000} alt={recipe.recipe_name} />
            </picture>
            <div className={`flex justify-between`}>
                <div className={`w-full flex gap-[5px] flex-wrap items-center `}>
                    {recipe.recipe_size_tag !== '' ? <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>{recipe.recipe_size_tag}</span> : null}
                    {recipe.recipe_age_tag !== '' ? <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>{recipe.recipe_age_tag}</span> : null}
                    {recipe.recipe_event_tag !== '' ? <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>{recipe.recipe_event_tag}</span> : null}
                </div>
            </div>
            <h1 className={`text-[${CardFontSize}] whitespace-nowrap text-ellipsis overflow-hidden`}>{recipe.recipe_name}</h1>
            <div className="flex justify-between">
                <div className="flex items-center ml-[-4px]">
                    <StarReviews value={recipe.recipe_rating_data ? recipe.recipe_rating_data.avgRating : 0} interactive={false} large={true}/>
                </div>
                <div className="flex gap-[5px] items-center">
                    <span className={`text-[${CardFontSize}]`}>{recipe.total_views} views</span>
                </div>
            </div>
        </div>
    </Link>
    )
}