'use client';
import Image from "next/image";
import { createElement, useEffect, useRef } from "react";
import RecipeElementV1 from "./RecipeElementV1";

interface RecipeSliderInterface {
    title: String,
    recipes: Array<Number>,
    width: String
}

export default function RecipeSlider ({title, recipes, width}:RecipeSliderInterface) {

    

    const sliderContainer = useRef<HTMLDivElement>(null);
    

    useEffect(() => {
        setInterval(() => {
            if(sliderContainer.current != null) {
                const {clientWidth, scrollLeft} = sliderContainer.current;

                sliderContainer.current.scrollTo({
                    left: scrollLeft + clientWidth,
                    behavior: 'smooth'
                })
            }
        },5000);
    },[]);


return (
    <div className="pt-[30px] w-full relative">
    <h1 className={`text-[26px] font-bold tracking-tighter inline-block text-[#523636] relative pb-[10px] after:content-[''] z-[10] after:w-[110%] after:h-[20px] after:top-[5px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]`}>{title}</h1>
    <div className="absolute w-full top-[51px] border-[1px] border-solid border-[#523636]"/>
    <div ref={sliderContainer} className="slider-container flex gap-[5px] overflow-x-scroll">
        {recipes.map(el => <RecipeElementV1 key={new Date().getTime() * Math.random()} element={Number(el)} />)}
    </div>
    </div>
)
}