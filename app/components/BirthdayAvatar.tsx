import Image from "next/image";
import { memo } from "react";

interface BirthdayAvatarInterface {
    src: String,
    active: boolean
}

export default memo(function BirthdayAvatar({src, active} : BirthdayAvatarInterface){
  return (
    <div className="relative flex flex-[0_0_100%] text-white flex flex-col items-center justify-center">
      <div className="w-full flex justify-center">
          <img src={src.toString()} loading="lazy" style={{scale: active ? 2 : 1}} className="w-12 h-12 transition-all duration-1000 rounded-full object-cover overflow-hidden max-w-none" width={100} height={100} alt="website banner" />
      </div>
      <h1 className="relative text-sm opacity-90 z-10 bg-primary-bg px-12 font-bold text-[#523636] text-center">
        Name
        <div className='absolute w-full h-full top-0 left-0 bg-primary-bg opacity-10'></div>
      </h1>
    </div>
  )
});