'use client';
import {  CSSProperties, useEffect, useState } from "react";
import RecipeElementV1 from "./RecipeElementV1";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Virtual } from "swiper/modules";
import { DisplayRecipe } from "@/constants/interface";
import { defineScreenMode, sm } from "@/constants/constants";

interface RecipeSliderInterface {
    title: String,
    recipes: Array<DisplayRecipe>,
}

export default function RecipeSlider ({title, recipes}:RecipeSliderInterface) {

    const [scMode, setScMode] = useState<number>(0);
    useEffect(() => {
        if(typeof window === 'undefined') return;
        setScMode(defineScreenMode());
        window.addEventListener('resize', () => setScMode(defineScreenMode()));
        return () => {
            window.removeEventListener('resize', () => setScMode(defineScreenMode()));
        };
    },[]);

    return (
        <div className="pt-[30px] w-full relative">
            <h1 className={`text-[26px] font-bold tracking-tighter inline-block text-[#523636] relative pb-[10px] after:content-[''] z-[10] after:w-[110%] after:h-[20px] after:top-[5px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]`}>{title}</h1>
            <div className="absolute w-full top-[51px] border-[1px] border-solid border-[#523636]"/>
            { recipes.length > 0 ? <Swiper
                className='w-full'
                modules={[Navigation, Pagination, Autoplay, Virtual]}
                spaceBetween={10}
                slidesPerView={scMode <= 1 ? 2 : 4}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                style={{
                    "--swiper-pagination-color": "#FFBA08",
                    "--swiper-pagination-bullet-inactive-color": "#999999",
                    "--swiper-pagination-bullet-inactive-opacity": "1",
                    "--swiper-pagination-bullet-size": "16px",
                    "--swiper-pagination-bullet-horizontal-gap": "10px"
                } as CSSProperties} 
                speed={1000}
                virtual={recipes.length > 4}
                loop={recipes.length > 4}
            >
                {recipes.map( (recipe, idx) => {
                    return (
                        <SwiperSlide key={idx}>
                            <RecipeElementV1  recipe={recipe} />
                        </SwiperSlide>
                    )
                })}
            </Swiper> : <h1>レシピはありません！</h1>}
        </div>
    )
}