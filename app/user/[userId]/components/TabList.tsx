'use client';
import RecipeElementV3 from "@/app/components/RecipeElementV3";
import { lgScreen } from "@/constants/constants";
import { DisplayRecipe } from "@/constants/interface";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

    return (
        <div className="tab-list p-4">
            <div>
                <button onClick={() => setState(prev => ({...prev, active: true}))} className={`${state.active ? 'bg-[#5b5351] text-white' : 'bg-[#FFFAF0] text-[#5b5351]'} py-[10px] px-[5px] text-[10px] font-bold rounded-tl`}>自分のレシピ</button>
                <button onClick={() => setState(prev => ({...prev, active: false}))} className={`${!state.active ? 'bg-[#5b5351] text-white' : 'bg-[#FFFAF0] text-[#5b5351]'} py-[10px] px-[5px] text-[10px] font-bold rounded-tr`}>したレシピ</button>
            </div>
            <div ref={imgContainer} className={`${!state.active ? 'hidden' : ''} recipe-list__container w-[calc(100vw-40px)] max-w-[768px] grid grid-cols-3 masonry p-[2px] gap-[${GAP}px] bg-[#FFFAF0] items-center relative`}>
                {owned_recipes.map( (recipe, idx) => <div key={idx} className="relative w-full pb-[100%] top-[0]" ref={ref => {imgRefs.current[idx] = ref}}>
                    <Link href={`/recipe/show/` + recipe.recipe_id}>
                        <RecipeElementV3  key={idx} recipe={recipe}/>
                    </Link>
                </div>)}
            </div>
            <div ref={imgContainer} className={`${state.active ? 'hidden' : ''} recipe-list__container w-[calc(100vw-40px)] max-w-[768px] grid grid-cols-3 masonry p-[2px] gap-[${GAP}px] bg-[#FFFAF0] items-center relative`}>
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