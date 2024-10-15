"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MainSearchForm() {

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
        <form className="flex gap-[10px] w-[100%] flex justify-end" action="">
            <input value={search} onChange={searchOnChange} className="py-[5px] px-[5px] w-[50%] h-[25px] rounded-[3px] text-[9px]" placeholder="キーワードで検索" type="text" />
            <button onClick={searchFunc} className="px-[10px] w-[50px] h-[25px] rounded-[3px] bg-black text-white text-[9px]" type="submit">検索</button>
        </form>
    )
}