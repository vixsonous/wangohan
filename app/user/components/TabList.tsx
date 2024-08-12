'use client';
import RecipeElementV3 from "@/app/components/RecipeElementV3";
import { useState } from "react";

export default function TabList() {
    const [active,setActive] = useState<Boolean>(true);
    return (
        <div className="tab-list p-[20px]">
            <div>
                <button onClick={() => setActive(true)} className={`${active ? 'bg-[#5b5351] text-white' : 'bg-[#FFFAF0] text-[#5b5351]'} py-[10px] px-[5px] text-[10px] font-bold rounded-tl`}>自分のレシピ</button>
                <button onClick={() => setActive(false)} className={`${!active ? 'bg-[#5b5351] text-white' : 'bg-[#FFFAF0] text-[#5b5351]'} py-[10px] px-[5px] text-[10px] font-bold rounded-tr`}>したレシピ</button>
            </div>
            <div className={`${!active ? 'hidden' : ''} recipe-list__container grid grid-cols-3  p-[2px] gap-[2px] bg-[#FFFAF0] items-center`}>
                {[1,2,3,4,5,6].map(el => <RecipeElementV3 key={new Date().getTime() * Math.random()} element={Number(el)}/>)}
            </div>
            <div className={`${active ? 'hidden' : ''} recipe-list__container grid grid-cols-3 p-[2px] gap-[2px] bg-[#FFFAF0] items-center`}>
                {[1,2,3,4,5,6,7,8,9].map(el => <RecipeElementV3 key={new Date().getTime() * Math.random()} element={Number(el)}/>)}
            </div>
            <div className="w-[100%] flex justify-center">
                <button className="text-[10px] font-bold p-[10px]">全てのレシピを見る</button>
            </div>
        </div>
    )
}