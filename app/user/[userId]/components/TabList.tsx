'use client';
import RecipeElementV3 from "@/app/components/RecipeElementV3";
import { DisplayRecipe } from "@/constants/interface";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const GAP = 2;

export default function TabList({owned_recipes, liked_recipes}:{owned_recipes: DisplayRecipe[], liked_recipes: DisplayRecipe[]}) {
    const [state, setState] = useState({
        active: true,
        imageLoaded: false,
        finishProcess: false,
    })

    const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imgContainer = useRef<HTMLDivElement>(null);

    const myRecipeActivate = () => setState(prev => ({...prev, active: true}));
    const likedRecipeActivate = () => setState(prev => ({...prev, active: false}));
    return (
        <div className="tab-list p-4">
            <div className="flex items-center">
                <button onClick={myRecipeActivate} className={`${state.active ? 'bg-[#5b5351] text-white' : 'bg-[#FFFAF0] text-[#5b5351]'} py-2 lg:py-4 lg:px-8 px-4 text-[10px] sm:text-xs font-bold rounded-tl`}>自分のレシピ</button>
                <button onClick={likedRecipeActivate} className={`${!state.active ? 'bg-[#5b5351] text-white' : 'bg-[#FFFAF0] text-[#5b5351]'} flex items-center gap-1 lg:gap-2 py-2 lg:py-4 lg:px-8 px-4 text-[10px] sm:text-xs font-bold rounded-tr`}>
                  <Heart size={16} color={`${state.active ? '#5b5351' : '#fff'}`}/>
                  <span>したレシピ</span>
                </button>
            </div>
            <div ref={imgContainer} className={`${!state.active ? 'hidden' : ''} recipe-list__container max-w-xl grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 masonry p-[2px] gap-[${GAP}px] bg-secondary-bg items-center relative`}>
                {owned_recipes.map( (recipe, idx) => <div key={idx} className="relative w-full pb-[100%] top-[0]" ref={ref => {imgRefs.current[idx] = ref}}>
                    <Link href={`/recipe/show/` + recipe.recipe_id}>
                        <RecipeElementV3  key={idx} recipe={recipe}/>
                    </Link>
                </div>)}
            </div>
            <div ref={imgContainer} className={`${state.active ? 'hidden' : ''} recipe-list__container max-w-xl grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 masonry p-[2px] gap-[${GAP}px] bg-[#FFFAF0] items-center relative`}>
                {liked_recipes.map( (recipe, idx) => <div key={idx} className="relative w-full pb-[100%] top-[0]" ref={ref => {imgRefs.current[idx] = ref}}>
                    <Link href={`/recipe/show/` + recipe.recipe_id}>
                        <RecipeElementV3  key={idx} recipe={recipe}/>
                    </Link>
                </div>)}
            </div>
            {
                state.active ? (
                    owned_recipes.length > 9 && (
                        <div className="w-[100%] flex justify-center">
                            <button className="text-[10px] font-bold p-[10px]">全てのレシピを見る</button>
                        </div>
                    )
                ) : (
                    liked_recipes.length > 9 && (
                        <div className="w-[100%] flex justify-center">
                            <button className="text-[10px] font-bold p-[10px]">全てのレシピを見る</button>
                        </div>
                    )
                )
            }
        </div>
    )
}