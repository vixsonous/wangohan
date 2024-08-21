'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function User() {

    const userIcn = useRef<HTMLImageElement>(null);
    const div = useRef<HTMLDivElement>(null);

    const [display,setDisplay] = useState(false);

    useEffect(() => {
        function outsideClick(e:MouseEvent) {
            if(userIcn.current && div.current && !div.current.contains(e.target as Node)  && !userIcn.current.contains(e.target as Node) && display) {
                setDisplay(false)
            } 
                
        }

        document.addEventListener("click", outsideClick);

        
        // Cleanup function
        return () => {
            document.removeEventListener("click", outsideClick);
        };
    },[userIcn, div]);

    return (
        <div className="w-[40px] h-[40px] relative">
            <Image onClick={() => setDisplay(!display)} ref={userIcn} src={'/icons/user.png'} className="self-center bg-white border-[2px] border-[#6b4528] rounded-[50%] relative" width={10000} height={10000}  alt="website banner" />
            <div ref={div} className={`rounded-md bg-[#FFFAF0] top-[60px] absolute border-[1px] border-[#6b4528] px-[1.5em] py-[0.5em] right-0 shadow-md transform ${display ? 'scale-1' : 'scale-0'} transition-transform`}>
                <div className="border-b-[30px] border-b-[#FFFAF0] border-l-[25px] border-l-[transparent] w-0 h-0 absolute right-[20px] top-[-25px]"></div>
                <span className="text-[0.6em] sm:text-[.75em] flex gap-[1em] whitespace-nowrap">
                    <Link href="/login">ログイン</Link> / <Link href="/signup">登録</Link>
                </span>
            </div>
        </div>
    )
}