'use client';

import { AnimatePresence } from "framer-motion";
import ModalCore from "./ModalCore";
import { useAppSelector } from "@/lib/redux/hooks";
import { textColor } from "@/constants/constants";

export default function ErrorModal() {

    const {show, message} = useAppSelector(state => state.message.error);
    return (
        <AnimatePresence>
            {show && (
                <ModalCore>
                    <div className="relative p-[10px]">
                        <span className="z-[5]">{message}</span>
                        <div style={{background: textColor.warning}} className="opacity-[1] w-full h-full absolute top-0 left-0 z-[-1] rounded-md"></div>
                    </div>
                </ModalCore>
            )}
        </AnimatePresence>
    )
}