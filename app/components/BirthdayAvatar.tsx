import Image from "next/image";

interface BirthdayAvatarInterface {
    src: String
}

export default function BirthdayAvatar({src} : BirthdayAvatarInterface){
    const key = new Date().getTime() * Math.random();
    return (
      <div key={key} className="flex flex-[0_0_100%] text-white flex flex-col items-center justify-center gap-[10px]">
        <div className="w-full flex justify-center">
            <img src={src.toString()} className="w-[50px] rounded-full object-cover overflow-hidden h-[50px] max-w-none" width={100} height={100} alt="website banner" />
        </div>
        <h1 className="text-[13px] font-bold text-[#523636] text-center">Name</h1>
      </div>
    )
}