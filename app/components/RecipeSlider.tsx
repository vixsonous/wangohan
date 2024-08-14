'use client';
import Image from "next/image";
import { createElement, useEffect, useRef } from "react";
import RecipeElementV1 from "./RecipeElementV1";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

interface RecipeSliderInterface {
    title: String,
    recipes: Array<Number>,
    width: String
}

export default function RecipeSlider ({title, recipes, width}:RecipeSliderInterface) {
    

return (
    <div className="pt-[30px] w-full relative">
        <h1 className={`text-[26px] font-bold tracking-tighter inline-block text-[#523636] relative pb-[10px] after:content-[''] z-[10] after:w-[110%] after:h-[20px] after:top-[5px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]`}>{title}</h1>
        <div className="absolute w-full top-[51px] border-[1px] border-solid border-[#523636]"/>
        <div className="slider-container overflow-hidden">
            <Slider infinite slidesToShow={2} speed={1000} autoplay autoplaySpeed={5000}>
                {recipes.map(el => <div key={new Date().getTime() * Math.random()}><RecipeElementV1  element={Number(el)} /></div>)}
            </Slider>
        </div>
    </div>
)
}