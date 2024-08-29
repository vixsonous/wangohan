'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Timer() {

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 5000);
    },[]);
    return (
        <div></div>
    )
}