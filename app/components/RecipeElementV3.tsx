'use client';
import Image from "next/image";

interface Props {
    element: number
}

export default function RecipeElementV3 ({element} : Props) {
    const CardFontSize = '10px';
    const CardTagSize = '9px';

    return (
        // w-[32%] pb-[32%] lg:w-[19%] lg:pb-[19%]
    <div key={String(element)} className="flex-grow flex-shrink-0 basis-[30%] h-[auto] relative flex flex-col">
        <Image src={'/dashboard.png'} className="w-[100%] h-[100%] object-cover" width={10000} height={10000} alt="website banner" />
    </div>
    )
}