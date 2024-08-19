'use client';
import { useEffect, useRef, useState } from "react";
import BirthdayAvatar from "./BirthdayAvatar";
import Image from "next/image";
import Slider from "react-slick";

interface BirthdayAvatars {
    bdayAvt: Array<String>
}
export default function BirthdayContainer({bdayAvt} : BirthdayAvatars) {

    return (
        <div className="flex flex-col gap-[40px] justify-center items-center mt-[30px] relative">
            <div className="title">
                <h1 className="text-[23px] font-bold text-[#523636] relative after:content-[''] z-[1] after:w-[105%] after:left-[-7px] after:h-[40px] after:top-[5px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]">本日お誕生日のわんちゃん</h1>
                <div className="absolute z-[-1] left-[0px] w-full top-[17px] border-[1px] border-solid border-[#523636]"/>
            </div>
            <div className="overflow-hidden w-full">
            <Slider autoplay slidesToShow={5} infinite autoplaySpeed={2000} speed={2000}>
            {
                bdayAvt.map((el) => BirthdayAvatar({src: String(el)}))
            }
            </Slider>
            </div>
            <div className="relative top-[-40px]">
                <Image src={'/LP/bdayvideo.gif'} unoptimized className="rounded-md w-[100%] h-[100%] inline max-w-none object-fill" width={10000} height={10000}  alt="website banner" />
            </div>
        </div>
    )
}