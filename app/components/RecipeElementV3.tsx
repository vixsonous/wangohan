'use client';
import Image from "next/image";

interface Props {
    element: number
}

export default function RecipeElementV3 ({element} : Props) {
    const CardFontSize = '10px';
    const CardTagSize = '9px';

    return (
        <div key={element} className=" h-[auto] relative ">
            <Image src={'/dashboard.png'} className="w-[100%] h-[100%] object-cover" width={10000} height={10000} alt="website banner" />
        </div>
    )
}