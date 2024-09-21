"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CreateRecipeForm from "../recipe/create/components/CreateRecipeForm";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { hide } from "@/lib/redux/states/createRecipe";

export default function CreateRecipeComponent() {
    const show = useAppSelector(state => state.createRecipe.value);
    const dispatch = useAppDispatch();

    const variants = {
        open: {opacity: 1, x: 0},
        closed: {opacity: 0, x: -800}
    }

    return (
        <motion.div initial={"closed"} variants={variants} animate={show ? 'open' : 'closed'} exit={{opacity: 0, x: -500}} className="fixed min-h-modal bottom-0 overflow-y-scroll left-[0px] bg-[#FFE9C9] top-0 flex flex-col p-[20px] gap-[20px] z-[9999] border-b-[2px] border-b-[#00]">
            <div className="flex justify-end">
                <button onClick={() => dispatch(hide())}>
                    <FontAwesomeIcon icon={faClose} size="lg"/>
                </button>
            </div>
            <motion.div className="flex justify-center items-center relative mt-[10px] mb-[30px]">
                <motion.h1 className="absolute top-[55px] font-semibold text-[#523636] text-[2em]">レシピを書く</motion.h1>
                <motion.img src={'/recipe-button.png'} className="h-[auto] w-[300px] max-w-none" width={10000} height={10000}  alt="ribbon" />
            </motion.div>
            <motion.div className="create-form-container flex justify-center items-center">
                <CreateRecipeForm />
            </motion.div>
            <div className="pb-[10vh]"></div>
        </motion.div>
    )
}