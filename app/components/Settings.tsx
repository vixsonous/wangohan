'use client';

import Image from "next/image";
import { SyntheticEvent, useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { GlobalValueContext } from "./global-context";
import { faBook, faDog, faLanguage, faList, faUser } from "@fortawesome/free-solid-svg-icons";

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
            if(settings.current && btn.current && !btn.current.contains(e.target as Node)  && !settings.current.contains(e.target as Node) && settings.current.style.width === "70%") 
                settings.current.style.width = "0%";
        }

        document.addEventListener("click", outsideClick);

        
        // Cleanup function
        return () => {
            document.removeEventListener("click", outsideClick);
        };
    },[settings]);
    return (
        <>
        <Image ref={btn} onClick={openSettings} src={'/icons/bone.png'} className="self-center rounded-md h-[auto] w-[50px] relative" width={10000} height={10000}  alt="website banner" />
        <div ref={settings} style={{width: '0%'}} className="absolute overflow-x-hidden h-[90vh] top-[65.68px] bg-[#ffe9c9] opacity-[0.9] transition-all delay-150 ease-in-out w-[0%] right-0 transform-x-4">
            <div className="p-[30px] flex flex-col w-full items-center justify-center text-[26px] gap-[20px]">
                <div className="w-full text-[16px] flex justify-between items-center border-b-[1px] border-black border-solid">
                    <FontAwesomeIcon icon={faHouse} style={{color: '#523636'}}  />
                    ホーム
                </div>

                <div className="w-full text-[16px] flex justify-between items-center border-b-[1px] border-black border-solid">
                    <FontAwesomeIcon icon={faUser} style={{color: '#523636'}}  />
                    マイページ
                </div>

                <div className="w-full text-[16px] flex justify-between items-center border-b-[1px] border-black border-solid">
                    <FontAwesomeIcon icon={faBook} style={{color: '#523636'}}  />
                    レシピ図鑑
                </div>

                <div className="w-full text-[16px] flex justify-between items-center border-b-[1px] border-black border-solid">
                    <FontAwesomeIcon icon={faLanguage} style={{color: '#523636'}}  />
                    言語
                </div>

                <div className="w-full text-[16px] flex justify-between items-center border-b-[1px] border-black border-solid">
                    <FontAwesomeIcon icon={faDog} style={{color: '#523636'}}  />
                    コラム
                </div>
            </div>
        </div>
        </>
    );
}