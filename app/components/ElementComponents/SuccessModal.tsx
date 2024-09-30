'use client';

import { AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import { useAppSelector } from "@/lib/redux/hooks";
import { textColor } from "@/constants/constants";

export default function SuccessModal() {

    const {show, message} = useAppSelector(state => state.message.success);
    return (
        <AnimatePresence>
            {!show && (
                <Modal>
                    <div className="relative p-[10px]">
                        <span className="z-[5]">Success</span>
                        <div style={{background: textColor.success}} className="opacity-[1] rounded-md w-full h-full absolute top-0 left-0 z-[-1]"></div>
                    </div>
                </Modal>
            )}
        </AnimatePresence>
    )
}