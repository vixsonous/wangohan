'use client';

import Image from "next/image";
import { SyntheticEvent, useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { GlobalValueContext } from "./global-context";
import { faBook, faDog, faLanguage, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Settings() {
    const settings = useRef<HTMLDivElement>(null);
    const btn = useRef<HTMLImageElement>(null);

    const openSettings = () => {

        if(settings.current !== null) {
            settings.current.style.width = settings.current.style.width === undefined 
            || settings.current.style.width === '0%' 
            || settings.current.style.width === null 
            ? 'clamp(200px, 50%, 300px)' : '0%';
        }
    }

    useEffect(() => {
        function outsideClick(e:MouseEvent) {
            if(settings.current && btn.current && !btn.current.contains(e.target as Node)  && !settings.current.contains(e.target as Node) && settings.current.style.width !== "0%") 
                settings.current.style.width = "0%";
        }

        document.addEventListener("click", outsideClick);

        
        // Cleanup function
        return () => {
            document.removeEventListener("click", outsideClick);
        };
    },[settings, btn]);
    return (
        <>
        <Image ref={btn} onClick={openSettings} src={'/icons/bone.png'} className="self-center rounded-md h-[auto] w-[50px] relative" width={10000} height={10000}  alt="website banner" />
        <div ref={settings} style={{width: '0%'}} className="absolute overflow-x-hidden h-[100vh] top-[65.68px] bg-[#FFFAF0] transition-all ease-in-out w-[0%] right-0 transform-x-4">
            <div className="p-[30px] flex flex-col w-full items-center justify-center text-[26px] gap-[20px]">
                <Link onClick={openSettings} className="w-full" href="/">
                <div className="w-full text-[.5em] sm:text-[.75em] flex justify-between items-center border-b-[1px] border-black border-solid">
                    <FontAwesomeIcon icon={faHouse} style={{color: '#523636'}}  />
                    ホーム
                </div>
                </Link>

                <Link onClick={openSettings} className="w-full" href="/user">
                <div className="w-full text-[.5em] sm:text-[.75em] flex justify-between items-center border-b-[1px] border-black border-solid">
                    <FontAwesomeIcon icon={faUser} style={{color: '#523636'}}  />
                    マイページ
                </div>
                </Link>

                <Link onClick={openSettings} className="w-full" href="/recipe/list/1">
                <div className="w-full text-[.5em] sm:text-[.75em] flex justify-between items-center border-b-[1px] border-black border-solid">
                    <FontAwesomeIcon icon={faBook} style={{color: '#523636'}}  />
                    レシピ図鑑
                </div>
                </Link>

                <Link onClick={openSettings} className="w-full" href="/user/settings">
                <div className="w-full text-[.5em] sm:text-[.75em] flex justify-between items-center border-b-[1px] border-black border-solid">
                    <FontAwesomeIcon icon={faLanguage} style={{color: '#523636'}}  />
                    言語
                </div>
                </Link>

                <div className="w-full text-[.5em] sm:text-[.75em] flex justify-between items-center border-b-[1px] border-black border-solid">
                    <FontAwesomeIcon icon={faDog} style={{color: '#523636'}}  />
                    コラム
                </div>
            </div>
        </div>
        </>
    );
}