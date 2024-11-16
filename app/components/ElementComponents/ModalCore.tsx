'use client';
import {AnimatePresence, motion} from "framer-motion";
import { useState } from "react";

export default function ModalCore({children}:{children: React.ReactNode}) {
    
    return (
        <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} className="z-[9999] fixed top-20 left-0 right-0 w-full flex justify-center">
            {children}
        </motion.div>
    )
}