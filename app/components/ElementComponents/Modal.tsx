'use client';

import { AnimatePresence } from "framer-motion";
import ModalCore from "./ModalCore";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { textColor } from "@/constants/constants";
import React, { useEffect } from "react";
import { hideModal } from "@/lib/redux/states/messageSlice";

export default function Modal({ children }: { children: React.ReactNode }) {

  const { show } = useAppSelector(state => state.message.modal);
  const dispatch = useAppDispatch();
  const hide = (e: React.MouseEvent<HTMLDivElement>) => dispatch(hideModal());

  return (
    <AnimatePresence>
      {show && (
        <ModalCore>
          <div onClick={hide} className="fixed w-full h-full top-0 bg-black opacity-[0.5]"></div>
          <div className="relative p-[10px]">
            <span className="z-[5]">
              {children}
            </span>
          </div>
        </ModalCore>
      )}
    </AnimatePresence>
  )
}