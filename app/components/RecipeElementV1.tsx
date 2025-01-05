'use client';
import { sm, textColor } from "@/constants/constants";
import { DisplayRecipe } from "@/constants/interface";
import Image from "next/image";
import Link from "next/link";
import StarReviews from "./ElementComponents/StarReviews";
import OptImage from "./ElementComponents/Image";
import { Heart } from "@phosphor-icons/react/dist/ssr";

interface Props {
    recipe: DisplayRecipe
}

export default function RecipeElementV1 ({recipe}:Props) {
    const CardFontSize = '12px';
    const CardTagSize = '9px';

    return (
    <Link href={`/recipe/show/${recipe.recipe_id}`}>
        <div className="relative flex flex-col gap-[8px]">
            <div className="absolute flex items-center gap-2 px-2 py-1 bg-white rounded-full top-2 right-2 z-50">
              <Heart color={textColor.error} weight="fill" size={16}/>
              <span className="text-xs font-bold">{recipe.total_likes > 1000 ? `${recipe.total_likes / 1000}k` : recipe.total_likes}</span>
            </div>
            <OptImage fit="cover" resize src={recipe.recipe_image} loading="lazy" className="will-change-transform object-cover rounded-md w-full h-[100px] sm:h-[130px] lg:h-[170px] max-w-[100%] block" height={300} width={500} />
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