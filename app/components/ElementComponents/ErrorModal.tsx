'use client';

import { AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import { useAppSelector } from "@/lib/redux/hooks";

export default function ErrorModal({children} : {children: React.ReactNode}) {

    const show = useAppSelector(state => state.message.error.show);
    return (
        <AnimatePresence>
            {show && (
                <Modal>
                    {children}
                </Modal>
            )}
        </AnimatePresence>
    )
}