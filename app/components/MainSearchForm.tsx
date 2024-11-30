"use client";

import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {motion} from 'framer-motion';
import { inView, offView } from "@/lib/redux/states/formSlice";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export default function MainSearchForm({isInView, isBar=false}:{isInView:boolean, isBar?:boolean}) {

    const [search, setSearch] = useState('');
    const router = useRouter();

    const searchFunc = (e: React.MouseEvent<HTMLButtonElement | SVGElement>) => {
        e.preventDefault();
        if(search) {
            
            const encodedQuery = encodeURIComponent(search);
            router.push(`/recipe/search/${encodedQuery}`);
        }
    }

    const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

    

    return (
        <motion.form initial={{width: isInView ? '100%' : '10%', opacity: isInView ? 1 : 0}} animate={{width: isInView ? '100%' : '10%', opacity: isInView ? 1 : 0}} className="flex gap-[10px] opacity-0 md:justify-start" action="">
          <div className="relative w-full flex items-center">
            <input value={search} onChange={searchOnChange} className={`py-2 px-4 ${isBar ? 'w-[100%]': 'w-[100%]'} border border-primary-text rounded-md text-xs md:text-sm`} placeholder="キーワードで検索" type="text" />
            <button onClick={searchFunc} className="absolute right-2">
              <MagnifyingGlass size={20} />
            </button>
          </div>
          {/* <button onClick={searchFunc} className="px-4 rounded-md bg-primary-text text-white text-xs" type="submit">検索</button> */}
        </motion.form>
    )
}