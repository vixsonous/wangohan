"use client";

import { AnimatePresence } from "framer-motion";
import ModalCore from "./ModalCore";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { textColor } from "@/constants/constants";
import React, { useEffect } from "react";
import { hideModal } from "@/lib/redux/states/messageSlice";

export default function Modal({
  children,
  modalIdProps,
}: {
  children: React.ReactNode;
  modalIdProps: string;
}) {
  const { show, modalId } = useAppSelector((state) => state.message.modal);
  const dispatch = useAppDispatch();
  const hide = (e: React.MouseEvent<HTMLDivElement>) => dispatch(hideModal());

  return (
    <AnimatePresence>
      {show && modalId === modalIdProps && (
        <ModalCore>
          <div
            onClick={hide}
            className="fixed z-0 w-full h-full top-0 bg-black opacity-[0.5]"
          ></div>
          <div className="z-10 relative mx-auto">{children}</div>
        </ModalCore>
      )}
    </AnimatePresence>
  );
}
