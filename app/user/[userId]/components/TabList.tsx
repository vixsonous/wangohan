'use client';
import RecipeElementV3 from "@/app/components/RecipeElementV3";
import { DisplayRecipe } from "@/constants/interface";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const GAP = 2;

export default function TabList({owned_recipes, liked_recipes}:{owned_recipes: DisplayRecipe[], liked_recipes: DisplayRecipe[]}) {
    const [state, setState] = useState({
        active: true,
        imageLoaded: false,
        finishProcess: false,
        loadingRecipes: false,
        error: '',
    })

    const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imgContainer = useRef<HTMLDivElement>(null);

    const myRecipeActivate = () => setState(prev => ({...prev, active: true}));
    const likedRecipeActivate = () => setState(prev => ({...prev, active: false}));

    const getAllCreatedRecipes = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const res = await fetch('/api/recipe?category=created');
      if(!res.ok) {
        setState(prev => ({...prev, error: 'There was an error getting the recipes!'}));
        return;
      }

      const r = await res.json();
      console.log(r.body);
    }
    return (
        <div className="tab-list p-4 w-full">
            <div className="flex items-center">
                <button onClick={myRecipeActivate} className={`${state.active ? 'bg-[#5b5351] text-white' : 'bg-[#FFFAF0] text-[#5b5351]'} py-2 lg:py-4 lg:px-8 px-4 text-[10px] sm:text-xs font-bold rounded-tl`}>自分のレシピ</button>
                <button onClick={likedRecipeActivate} className={`${!state.active ? 'bg-[#5b5351] text-white' : 'bg-[#FFFAF0] text-[#5b5351]'} flex items-center gap-1 lg:gap-2 py-2 lg:py-4 lg:px-8 px-4 text-[10px] sm:text-xs font-bold rounded-tr`}>
                  <Heart size={16} color={`${state.active ? '#5b5351' : '#fff'}`}/>
                  <span>したレシピ</span>
                </button>
            </div>
            <div ref={imgContainer} className={`${!state.active ? 'hidden' : ''} min-h-[50vh] lg:min-h-screen recipe-list__container max-w-xl grid ${owned_recipes.length > 0 ? 'grid-cols-3 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1'} masonry p-1 gap-1 bg-secondary-bg items-center relative`}>
                {
                  owned_recipes.length > 0 ? (
                    owned_recipes.map( (recipe, idx) => <div key={idx} className="relative pb-[100%] top-[0]" ref={ref => {imgRefs.current[idx] = ref}}>
                        <Link href={`/recipe/show/` + recipe.recipe_id}>
                            <RecipeElementV3  key={idx} recipe={recipe}/>
                        </Link>
                    </div>)
                  ) : (
                    <div className="w-full h-full flex justify-center items-center">
                      <span className="font-bold text-lg lg:text-2xl">
                        レシピを投稿してみましょう。
                      </span>
                    </div>
                  )
                }
            </div>
            <div ref={imgContainer} className={`${state.active ? 'hidden' : ''} min-h-[50vh] lg:min-h-screen recipe-list__container max-w-xl grid ${liked_recipes.length > 0 ? 'grid-cols-3 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1'} masonry p-1 gap-1 bg-[#FFFAF0] items-center relative`}>
                {liked_recipes.length > 0 ? (
                  liked_recipes.map( (recipe, idx) => <div key={idx} className="relative pb-[100%] top-[0]" ref={ref => {imgRefs.current[idx] = ref}}>
                    <Link href={`/recipe/show/` + recipe.recipe_id}>
                      <RecipeElementV3  key={idx} recipe={recipe}/>
                    </Link>
                  </div>)
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <span className="font-bold text-lg lg:text-2xl">
                      お気に入りのレシピを見つけましょう。
                    </span>
                  </div>
                )}
            </div>
            {
                state.active ? (
                    owned_recipes.length > 9 && (
                        <div className="w-[100%] flex justify-center">
                            <button onClick={getAllCreatedRecipes} className="text-sm md:text-base font-bold p-4">全てのレシピを見る</button>
                        </div>
                    )
                ) : (
                    liked_recipes.length > 9 && (
                        <div className="w-[100%] flex justify-center">
                            <button className="text-sm md:text-base font-bold p-4">全てのレシピを見る</button>
                        </div>
                    )
                )
            }
        </div>
    )
}