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
        <div className="relative">
            <div ref={div} className={`rounded-md bg-[#FFFAF0] right-0`}>
                <span className="text-[0.75em] text-[#6b4528] font-semibold flex gap-[1em] whitespace-nowrap">
                    <Link href="/login">ログイン</Link>  <Link href="/signup">登録</Link>
                </span>
            </div>
        </div>
    )
}