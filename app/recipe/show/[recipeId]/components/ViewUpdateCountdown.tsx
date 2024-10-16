"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import { useEffect } from "react";

export default function ViewUpdateCountdown({recipe_id} : {recipe_id: number}) {

    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);

    useEffect(() => {

        const abortSignal = new AbortController();
        const countdown = async () => {
            const ctd = setTimeout( async () => {
                await fetch('/api/update-recipe-view', {
                    method: 'PATCH',
                    body: JSON.stringify({recipe_id: recipe_id}),
                    signal: abortSignal.signal
                });

                clearTimeout(ctd);
            },10000);
        };
        
        if(isLoggedIn) countdown();

        return () => abortSignal.abort('Fetch cleanup...');
    },[]);
    return null;
}