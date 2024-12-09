'use client';

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {motion, AnimatePresence} from "framer-motion";
import {  faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/redux/hooks";
import { initializeCount } from "@/lib/redux/states/counterSlice";
import { show } from "@/lib/redux/states/recipeSlice";
import Button from "./Button";
import { Book, House, PawPrint, SignOut, Translate, User } from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";

export default function Settings() {
    const settings = useRef<HTMLDivElement>(null);
    const btn = useRef<HTMLButtonElement>(null);
    const [showSettings, setShowSettings] = useState(false);
    const pathname = usePathname();

    const [active, setActive] = useState({
      home: false,
      user: false,
      list: false,
      language: false,
      column: false,
    });

    useEffect(() => {
      const path = window.location.pathname;
      setActive({
        home: path === "/" ,
        user: path.includes("/user") ,
        list: path.includes("/recipe/list") ,
        language: path === "/",
        column: path === "/" ,
      });
    },[pathname]);

    const openSettings = () => {
        setShowSettings( prev => !prev);;
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
            <img src={'/icons/bone.webp'} className="self-center rounded-md h-[auto] w-[40px] relative" width={100} height={100}  alt="website banner" />
        </button>
        <AnimatePresence>
            {showSettings && (
                <motion.div initial={{x: 100}} animate={{x: 0}} exit={{x: 500}} ref={settings} style={{width: 'clamp(300px, 50%, 300px)'}} className="z-50 absolute border-l-2 border-[#ffb762] right-0 overflow-x-hidden h-[100vh] top-[0px] bg-primary-bg">
                    <div className="w-full p-[10px]">
                        <button onClick={openSettings}>
                            <FontAwesomeIcon icon={faArrowRight} size="lg"/>
                        </button>
                    </div>
                    <div className="px-8 flex flex-col w-full items-center justify-center text-[26px] gap-[20px]">
                        <button onClick={() => {
                            openSettings();
                            dispatch(show());
                        }} className={` w-[100%] rounded-md text-[12px] sm:text-[16px] relative active:scale-[1.075] md:hover:scale-[1.075] transition-all duration-500`} type="submit">
                            <span className="absolute z-[1] w-full top-[50%] left-0 font-bold">レシピを作成する</span>
                            <img src={'/recipe-button.webp'} className="self-center rounded-md h-[auto] w-full relative top-0" width={100} height={100}  alt="website banner" />
                        </button>
                        
                        <div className="font-bold flex flex-col bg-secondary-bg w-full p-2 gap-2 rounded-2xl border border-primary-text">
                          <Link onClick={openSettings} className={`${active.home ? 'bg-primary-text text-secondary-bg py-2' : 'hover:opacity-75 py-1'}  px-4  rounded-full w-full`} href="/">
                            <div className="w-full text-sm flex justify-between items-center">
                                <House size={20}/>
                                ホーム
                            </div>
                          </Link>
          
                          <Link onClick={openSettings} className={`${active.user ? 'bg-primary-text text-secondary-bg py-2' : 'hover:opacity-75 py-1'} w-full px-4 py-1 rounded-full`} href={`/user/${user.user_id}`}>
                            <div className="w-full text-sm flex justify-between items-center">
                                <User size={20}/>
                                マイページ
                            </div>
                          </Link>
          
                          <Link onClick={openSettings} className={`${active.list ? 'bg-primary-text text-secondary-bg py-2' : 'hover:opacity-75 py-1'} w-full px-4 py-1 rounded-full`} href="/recipe/list/1">
                            <div className="w-full text-sm flex justify-between items-center">
                                <Book size={20}/>
                                レシピ図鑑
                            </div>
                          </Link>
          
                          <Link onClick={openSettings} className="w-full hover:opacity-75 px-4 py-1 rounded-full" href="/user/settings">
                            <div className="w-full text-sm flex justify-between items-center">
                                <Translate size={20}/>
                                言語
                            </div>
                          </Link>
          
                          <Link onClick={openSettings} className="w-full hover:opacity-75 px-4 py-1 rounded-full" href="/">
                            <div className="w-full text-sm flex justify-between items-center">
                                <PawPrint size={20}/>
                                コラム
                            </div>
                          </Link>
          
                          <Button onClick={logout}>
                            <div  className="w-full hover:opacity-75 text-sm flex justify-between items-center px-4 py-1 rounded-full">
                                <SignOut />
                                ログアウト
                            </div>
                          </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
}