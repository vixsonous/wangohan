"use client";
import { sm } from "@/constants/constants";
import { memo, useEffect, useState } from "react";

interface BirthdayAvatarInterface {
    src: String,
    active: boolean
}

export default memo(function BirthdayAvatar({src, active} : BirthdayAvatarInterface){

  const [state, setState] = useState({
    lg: 4,
    md: 3
  })
  useEffect(() => {
    const isSm = sm(window.innerWidth);
    setState({
      lg: isSm ? 2.5 : 4,
      md: isSm ? 1.5 : 3
    })
  },[]);
  
  return (
    <div className="relative flex flex-[0_0_100%] text-white flex flex-col items-center justify-center">
      <div className="w-full flex justify-center">
          <img src={src.toString()} loading="lazy" style={{scale: active ? state.lg : state.md}} className="w-12 h-12 transition-all duration-1000 rounded-full object-cover overflow-hidden max-w-none" width={100} height={100} alt="website banner" />
      </div>
      <h1 className="relative text-sm opacity-90 z-10 bg-primary-bg px-20 font-bold text-[#523636] text-center">
        Name
        <div className='absolute w-full h-full top-0 left-0 bg-primary-bg opacity-10'></div>
      </h1>
    </div>
  )
});