"use client";

import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {motion} from 'framer-motion';
import { inView, offView } from "@/lib/redux/states/formSlice";

export default function MainSearchForm({isInView}:{isInView:boolean}) {

    const [search, setSearch] = useState('');
    const router = useRouter();

    const searchFunc = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(search) {
            
            const encodedQuery = encodeURIComponent(search);
            router.push(`/recipe/search/${encodedQuery}`);
        }
    }

    const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

    

    return (
        <motion.form initial={{width: isInView ? '100%' : '10%', opacity: isInView ? 1 : 0}} animate={{width: isInView ? '100%' : '10%', opacity: isInView ? 1 : 0}} className="flex gap-[10px] w-[10%] opacity-0 flex justify-between md:justify-start" action="">
          <input value={search} onChange={searchOnChange} className="py-2 px-4 w-[80%] md:w-[75%] rounded-md text-xs md:text-sm" placeholder="キーワードで検索" type="text" />
          <button onClick={searchFunc} className="px-4 rounded-md bg-primary-text text-white text-xs" type="submit">検索</button>
        </motion.form>
    )
}