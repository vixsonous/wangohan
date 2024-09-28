'use client';
import RecipeElementV3 from "@/app/components/RecipeElementV3";
import { lgScreen } from "@/constants/constants";
import { DisplayRecipe } from "@/constants/interface";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const GAP = 2;

export default function TabList({recipes_data}:{recipes_data: DisplayRecipe[]}) {
    const [state, setState] = useState({
        active: true,
        imageLoaded: false,
        finishProcess: false,
    })

    const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imgContainer = useRef<HTMLDivElement>(null);

    // const processImages = () => {
    //     if(!imgRefs.current || !imgContainer.current) return;
        
    //     imgRefs.current.forEach((el, idx) => {
    //         const container = imgContainer.current;
    //         if(!el || !container) return;
    //         const img = el.querySelector('img');
    //         if(!img) return;
    //         const imgPos = img.getBoundingClientRect();
    //         if(idx < 3) {
    //             const containerGap = Math.floor(imgPos.top - container.getBoundingClientRect().top) - 2;
    //             if(img.parentElement) img.parentElement.style.top = `-${containerGap}px`;
    //         }

    //         const botEl = imgRefs.current[idx + 3];
    //         if(!botEl) return;
    //         const botImg = botEl.querySelector('img');
    //         if(!botImg) return;

    //         const newTopPos = img.getBoundingClientRect();
    //         const botImgPos = botImg.getBoundingClientRect();
    //         const gap = Math.round((botImgPos.top - newTopPos.bottom)) - 2;

    //         if(gap === 0) return;
    //         if(botImg.parentElement) botImg.parentElement.style.top = `-${gap}px`;
    //     });
    //     setState(prev => ({...prev, finishProcess: true}));
    // }
    
    // useEffect(() => {
    //     try {
    //         if(!imgRefs.current) throw new Error("The image refs are not initiated!");
    //         const lastEl = imgRefs.current[imgRefs.current.length - 1];
    //         if(!lastEl) throw new Error("The last element is not found!");
    //         const img = lastEl.querySelector('img');
    //         if(!img) throw new Error('The image of the last element is not found!');

    //         img.onload = function() {
    //             setState(prev => ({...prev, imageLoaded: true}))
    //         }
    //     } catch(e) {
    //         console.error((e as Error).message);
    //     }

    //     window.addEventListener('resize', processImages);
    // },[imgRefs]);

    // useEffect(() => {
    //     if(state.imageLoaded) processImages();
    // },[state.imageLoaded]);

    // useEffect(() => {
    //     console.log(state.finishProcess);
    // },[state.imageLoaded]);

    return (
        <div className="tab-list p-[20px]">
            <div>
                <button onClick={() => setState(prev => ({...prev, active: true}))} className={`${state.active ? 'bg-[#5b5351] text-white' : 'bg-[#FFFAF0] text-[#5b5351]'} py-[10px] px-[5px] text-[10px] font-bold rounded-tl`}>自分のレシピ</button>
                <button onClick={() => setState(prev => ({...prev, active: false}))} className={`${!state.active ? 'bg-[#5b5351] text-white' : 'bg-[#FFFAF0] text-[#5b5351]'} py-[10px] px-[5px] text-[10px] font-bold rounded-tr`}>したレシピ</button>
            </div>
            <div ref={imgContainer} className={`${!state.active ? 'hidden' : ''} recipe-list__container w-[calc(100vw-40px)] max-w-[768px] grid grid-cols-3 masonry p-[2px] gap-[${GAP}px] bg-[#FFFAF0] items-center relative`}>
                {recipes_data.map( (recipe, idx) => <div key={idx} className="relative w-full pb-[100%] top-[0]" ref={ref => {imgRefs.current[idx] = ref}}>
                    <Link href={`/recipe/show/` + recipe.recipe_id}>
                        <RecipeElementV3  key={idx} recipe={recipe}/>
                    </Link>
                </div>)}
            </div>
            <div ref={imgContainer} className={`${state.active ? 'hidden' : ''} recipe-list__container w-[calc(100vw-40px)] max-w-[768px] grid grid-cols-3 masonry p-[2px] gap-[${GAP}px] bg-[#FFFAF0] items-center relative`}>
                {recipes_data.map( (recipe, idx) => <div key={idx} className="relative w-full pb-[100%] top-[0]" ref={ref => {imgRefs.current[idx] = ref}}>
                    <Link href={`/recipe/show/` + recipe.recipe_id}>
                        <RecipeElementV3  key={idx} recipe={recipe}/>
                    </Link>
                </div>)}
            </div>
            {
                recipes_data.length > 9 && (
                    <div className="w-[100%] flex justify-center">
                        <button className="text-[10px] font-bold p-[10px]">全てのレシピを見る</button>
                    </div>
                )
            }
        </div>
    )
}