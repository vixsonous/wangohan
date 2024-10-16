"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { hideLoading } from "@/lib/redux/states/globalSlice";
import { useEffect, useRef } from "react";

export default function LoadingPopup() {

    const dispatch = useAppDispatch();

    let oldHref = document.location.href
    const body = document.querySelector("body");
    const conf = {childList: true, subtree: true}


    useEffect(() => {

        if(body) {
            const observer = new MutationObserver(() => {
                if(oldHref != document.location.href) {
                    oldHref = document.location.href;

                    dispatch(hideLoading());
                }
            });
        
            observer.observe(body, conf);
        }
    },[]);


    return (
        <div></div>
    )
}