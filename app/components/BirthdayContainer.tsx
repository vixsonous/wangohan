'use client';
import { memo, useEffect, useRef, useState } from "react";
import BirthdayAvatar from "./BirthdayAvatar";
import Image from "next/image";
import Slider from "react-slick";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { md } from "@/constants/constants";
import { DogData } from "@/constants/interface";

interface BirthdayAvatars {
    bdayAvt: Array<DogData>
}
export default memo(function BirthdayContainer({bdayAvt} : BirthdayAvatars) {

  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
      if(vidRef.current) vidRef.current.play();
  },[]);
  return (
      <div className="flex flex-col gap-24 justify-center items-center mt-[30px] relative">
          <div className="title">
              <h1 className="text-2xl font-bold text-[#523636] relative after:content-[''] z-[1] after:w-[105%] after:left-[-7px] after:h-[40px] after:top-[5px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]">本日お誕生日のわんちゃん</h1>
              <div className="absolute z-[-1] left-[0px] w-full top-[17px] border-[1px] border-solid border-[#523636]"/>
          </div>
          <div className="w-full">
          <Swiper  
              breakpoints= {{
                300: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
              
              loop={bdayAvt.length > 8}
              centeredSlides
              modules={[Autoplay]}
              autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
              }}
              speed={3000}
              style={{overflow: 'visible', width: '100%'}}
          >
          {
              bdayAvt.map((pet, idx) => {
                  return (
                      <SwiperSlide key={idx}>
                          {
                            ({isActive}) => (
                              <BirthdayAvatar pet={pet} active={isActive}/>
                            )
                          }
                      </SwiperSlide>
                  )
              })
          }
          </Swiper>
          </div>
          <div className="relative">
              {/* <img src={'/LP/bdayvideo.gif'} className="rounded-md w-[100%] h-[100%] inline max-w-none object-fill" width={10000} height={10000}  alt="website banner" /> */}
              <video ref={vidRef} src="/LP/birthdayanimation.mp4" autoPlay playsInline muted controls={false} loop></video>
          </div>
      </div>
  )
});