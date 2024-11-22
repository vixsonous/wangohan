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
        <form className="flex gap-[10px] w-[100%] flex justify-start" action="">
            <input value={search} onChange={searchOnChange} className="py-1 px-4 w-[80%] rounded-md text-xs md:text-sm" placeholder="キーワードで検索" type="text" />
            <button onClick={searchFunc} className="px-4 rounded-md bg-black text-white text-xs" type="submit">検索</button>
        </form>
    )
}