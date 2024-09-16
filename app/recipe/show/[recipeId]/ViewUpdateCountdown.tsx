"use client";

import { useEffect } from "react";

export default function ViewUpdateCountdown({recipe_id} : {recipe_id: number}) {

    useEffect(() => {
        const countdown = async () => {
            const ctd = setTimeout( async () => {
                await fetch('/api/update-recipe-view', {
                    method: 'PATCH',
                    body: JSON.stringify({recipe_id: recipe_id})
                });

                clearTimeout(ctd);
            },10000);
        };
        countdown();
    },[]);
    return null;
}