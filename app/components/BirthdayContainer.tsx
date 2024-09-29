'use client';
import { useEffect, useRef, useState } from "react";
import BirthdayAvatar from "./BirthdayAvatar";
import Image from "next/image";
import Slider from "react-slick";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

interface BirthdayAvatars {
    bdayAvt: Array<String>
}
export default function BirthdayContainer({bdayAvt} : BirthdayAvatars) {

    const vidRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if(vidRef.current) vidRef.current.play();
    },[]);
    return (
        <div className="flex flex-col gap-[40px] justify-center items-center mt-[30px] relative">
            <div className="title">
                <h1 className="text-[23px] font-bold text-[#523636] relative after:content-[''] z-[1] after:w-[105%] after:left-[-7px] after:h-[40px] after:top-[5px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]">本日お誕生日のわんちゃん</h1>
                <div className="absolute z-[-1] left-[0px] w-full top-[17px] border-[1px] border-solid border-[#523636]"/>
            </div>
            <div className="overflow-hidden w-full">
            <Swiper  
                slidesPerView={5}
                loop
                modules={[Autoplay]}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                speed={2000}
            >
            {
                bdayAvt.map((el, idx) => {
                    return (
                        <SwiperSlide key={idx}>
                            {BirthdayAvatar({src: String(el)})}
                        </SwiperSlide>
                    )
                })
            }
            </Swiper>
            </div>
            <div className="relative">
                {/* <img src={'/LP/bdayvideo.gif'} className="rounded-md w-[100%] h-[100%] inline max-w-none object-fill" width={10000} height={10000}  alt="website banner" /> */}
                <video ref={vidRef} src="/LP/birthdayanimation.mp4" muted controls={false} loop></video>
            </div>
        </div>
    )
}