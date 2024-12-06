"use client";
import { sm } from "@/constants/constants";
import { memo, useEffect, useState } from "react";
import OptImage from "./ElementComponents/Image";
import { DogData } from "@/constants/interface";

interface BirthdayAvatarInterface {
    pet: DogData,
    active: boolean
}

export default memo(function BirthdayAvatar({pet, active} : BirthdayAvatarInterface){

  const [state, setState] = useState({
    lg: 4,
    md: 3
  })
  useEffect(() => {
    const isSm = sm(window.innerWidth);
    setState({
      lg: isSm ? 1.3 : 2,
      md: isSm ? 1 : 1.5
    })
  },[]);
  
  return (
    <div className="relative flex-[0_0_100%] text-white flex flex-col items-center justify-center">
      <div style={{scale: active ? state.lg : state.md}} className={`transition-all duration-1000 w-full flex justify-center ${active ? 'animate-bubble': ''}`}>
          <OptImage width={200} fit="cover" height={150} resize centered containerClass="aspect-square max-w-[100px] max-h-[100px]" src={pet.pet_image} loading="lazy" className="aspect-square max-w-[100px] max-h-[100px] rounded-full object-cover overflow-hidden" alt="website banner" />
      </div>
      <h1 className="relative text-sm opacity-90 z-10 bg-primary-bg px-20 font-bold text-[#523636] text-center">
        {pet.pet_name}
        <div className='absolute w-full h-full top-0 left-0 bg-primary-bg opacity-10'></div>
      </h1>
    </div>
  )
});