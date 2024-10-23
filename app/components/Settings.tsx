'use client';

import Image from "next/image";
import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import {motion, AnimatePresence} from "framer-motion";
import { faArrowAltCircleRight, faArrowRight, faBook, faClose, faDog, faLanguage, faList, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import CreateRecipeForm from "../recipe/edit/[recipeId]/components/EditRecipeForm";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/redux/hooks";
import { increment, initializeCount } from "@/lib/redux/states/counterSlice";
import { show } from "@/lib/redux/states/recipeSlice";
import { showError } from "@/lib/redux/states/messageSlice";

export default function Settings() {
    const settings = useRef<HTMLDivElement>(null);
    const btn = useRef<HTMLButtonElement>(null);
    const [showSettings, setShowSettings] = useState(false);

    const openSettings = () => {
        setShowSettings( prev => !prev);
    }

    const logout = async () => {
        await fetch('/api/logout')
        .then(res => {
            if(res.status === 200) {
                window.location.href = '/';
            }else if(res.status === 302) {
                window.location.href = res.url;
            }
        });
    }

    useEffect(() => {
        function outsideClick(e:MouseEvent) {
            if(settings.current && btn.current && !btn.current.contains(e.target as Node)  && !settings.current.contains(e.target as Node)) 
                setShowSettings( false);
        }
        document.addEventListener("click", outsideClick);
        // Cleanup function
        return () => {
            document.removeEventListener("click", outsideClick);
        };
    },[settings, btn]);

    const store = useAppStore();
    const initialized = useRef(false);
    if(!initialized.current) {
        store.dispatch(initializeCount(0));
        initialized.current = true;
    }
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user)

    return (
        <>
        <button ref={btn} onClick={() => {setShowSettings(true);}}>
            <img src={'/icons/bone.png'} className="self-center rounded-md h-[auto] w-[40px] relative" width={10000} height={10000}  alt="website banner" />
        </button>
        <AnimatePresence>
            {showSettings && (
                <motion.div initial={{x: 100}} animate={{x: 0}} exit={{x: 500}} ref={settings} style={{width: 'clamp(200px, 50%, 300px)'}} className="absolute border-l-2 border-[#ffb762] right-0 overflow-x-hidden h-[100vh] top-[0px] bg-[#FFFAF0]">
                    <div className="w-full p-[10px]">
                        <button onClick={openSettings}>
                            <FontAwesomeIcon icon={faArrowRight} size="lg"/>
                        </button>
                    </div>
                    <div className="px-[30px] flex flex-col w-full items-center justify-center text-[26px] gap-[20px]">
                        
                        <button onClick={() => {
                            openSettings();
                            dispatch(show());
                        }} className={` w-[100%] rounded-md text-[12px] sm:text-[16px] relative active:scale-[1.075] md:hover:scale-[1.075] transition-all duration-500`} type="submit">
                            <span className="absolute z-[1] w-full top-[50%] left-0 font-bold">レシピを作成する</span>
                            <img src={'/recipe-button.png'} className="self-center rounded-md h-[auto] w-full relative absolute top-0" width={10000} height={10000}  alt="website banner" />
                        </button>
                        <Link onClick={openSettings} className="w-full" href="/">
                        <div className="w-full text-[.5em] sm:text-[.75em] flex justify-between items-center border-b-[1px] border-black border-solid">
                            <FontAwesomeIcon icon={faHouse} style={{color: '#523636'}}  />
                            ホーム
                        </div>
                        </Link>
        
                        <Link onClick={openSettings} className="w-full" href={`/user/${user.user_id}`}>
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
        
                        <div onClick={logout} className="w-full text-[.5em] sm:text-[.75em] flex justify-between items-center border-b-[1px] border-black border-solid">
                            <FontAwesomeIcon icon={faSignOut} style={{color: '#523636'}}  />
                            ログアウト
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
}