"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { showLoading } from "@/lib/redux/states/globalSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoadingModal() {
    
    const loading = useAppSelector(state => state.global.isLoading);
    const dispatch = useAppDispatch();

    let oldHref = document.location.href
    const body = document.querySelector("body");
    const conf = {childList: true, subtree: true}

    
    useEffect(() => {
        if(body) {
            const observer = new MutationObserver(() => {
                if(oldHref != document.location.href) {
                    oldHref = document.location.href;
        
                    dispatch(showLoading());
                }
            });
        
            observer.observe(body, conf);
        }
    },[]);
    return (
        <div>
            {loading ? "true" : "false"}
        </div>
    )
}