"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {motion } from "framer-motion";
import React, { memo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { hide } from "@/lib/redux/states/recipeSlice";
import dynamic from "next/dynamic";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

const CreateRecipeForm = dynamic(() => import('./CreateRecipeForm'), { ssr: false, loading: () => <CircleNotch size={20} className="animate-spin"/> });

export default memo(function CreateRecipeComponent() {
  const show = useAppSelector(state => state.recipeSlice.show);
  const dispatch = useAppDispatch();

  const variants = {
      open: {opacity: 1, x: 0},
      closed: {opacity: 0, x: -800}
  }

  return (
      <motion.div initial={"closed"} variants={variants} animate={show ? 'open' : 'closed'} exit={{opacity: 0, x: -500}} className={`fixed min-h-modal w-full bottom-0 overflow-y-scroll left-[0px] bg-[#FFE9C9] top-0 flex flex-col p-[20px] gap-[20px] ${show ? 'z-[9999]' : 'z-[-9999]'} border-b-[2px] border-b-[#ffb762]`}>
          <div className="flex justify-end">
              <button aria-label="close-create-recipe" onClick={() => dispatch(hide())}>
                  <FontAwesomeIcon icon={faClose} size="lg"/>
              </button>
          </div>
          <div className="flex justify-center items-center relative mt-[10px] mb-[30px]">
              <h1 className="absolute top-[55px] font-semibold text-[#523636] text-[2em]">レシピを書く</h1>
              <img src={'/recipe-button.webp'} loading="lazy" className="h-[auto] w-[300px] max-w-none" width={100} height={100}  alt="ribbon" />
          </div>
          <div className="create-form-container flex justify-center items-center">
              <CreateRecipeForm />
          </div>
          <div className="pb-[10vh]"></div>
      </motion.div>
  )
});