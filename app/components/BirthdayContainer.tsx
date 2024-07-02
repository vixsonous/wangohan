'use client';
import { useEffect, useRef, useState } from "react";
import BirthdayAvatar from "./BirthdayAvatar";

interface BirthdayAvatars {
    bdayAvt: Array<String>
}
export default function BirthdayContainer({bdayAvt} : BirthdayAvatars) {

    const sliderContainer = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState(0);
    

    useEffect(() => {
        if(sliderContainer.current == null)
            return;
        
        sliderContainer.current.style.transition = "all 1s linear";
        let start:DOMHighResTimeStamp = 0;
    
        setInterval(() => {
            if(sliderContainer.current != null) {
                sliderContainer.current.scrollTo({
                    left: sliderContainer.current.scrollLeft + 1,
                    behavior: 'smooth'
                })
            }
        },35);
      }, []);
    

    return (
        <div className="flex flex-col gap-[40px] justify-center items-center mt-[30px] relative">
            <div className="title">
                <h1 className="text-[23px] font-bold text-[#523636] relative after:content-[''] z-[1] after:w-[105%] after:left-[-7px] after:h-[40px] after:top-[5px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]">本日お誕生日のわんちゃん</h1>
                <div className="absolute z-[-1] left-[0px] w-full top-[17px] border-[2px] border-solid border-[#523636]"/>
            </div>
            <div ref={sliderContainer} className="bday-container flex w-full overflow-x-scroll gap-[20px]">
                {
                bdayAvt.map((el) => BirthdayAvatar({src: String(el)}))
                }
            </div>
        </div>
    )
}