"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import Button from "@/app/components/Button";

const IconSize = 20;
export default memo(function Dropdown({
  children,
  openIcon = (
    <Button>
      <List size={IconSize} />
    </Button>
  ),
  closeIcon = (
    <Button>
      <X size={IconSize} />
    </Button>
  ),
  closeOnClick = true,
  className = "",
}: {
  children: React.ReactNode;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  closeOnClick?: boolean;
  className?: string;
}) {
  const [state, setState] = useState({
    open: false,
    overflow: false,
  });

  const dropdown = useRef<HTMLDivElement>(null);
  const nav = useRef<HTMLDivElement>(null);

  const triggerOnClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      setState((prev) => ({ ...state, open: !state.open }));
      const t = dropdown.current;
      if (t) {
        setState((prev) => ({
          ...prev,
          overflow: t.getBoundingClientRect().left < 50,
        }));
      }
    },
    [state.open]
  );
  const closeActionOnClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) =>
      closeOnClick ? setState((prev) => ({ ...state, open: false })) : null,
    [state.open]
  );

  useEffect(() => {
    function outsideClick(e: MouseEvent) {
      if (nav.current && !nav.current.contains(e.target as Node))
        setState((prev) => ({ ...prev, open: false }));
    }

    document.addEventListener("click", outsideClick);
    // Cleanup function
    return () => {
      document.removeEventListener("click", outsideClick);
    };
  }, [nav]);

  return (
    <nav
      ref={nav}
      className={`relative ${
        state.open ? "z-[999]" : "z-50"
      } self-center ${className}`}
    >
      <span className="flex" onClick={triggerOnClick}>
        {state.open ? closeIcon : openIcon}
      </span>
      <motion.section
        ref={dropdown}
        onClick={closeActionOnClick}
        className={`rounded-md absolute w-96 max-w-max bg-secondary-bg top-[100%] ${
          state.overflow ? "left-0" : "right-0"
        } origin-top`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: state.open ? 1 : 0 }}
      >
        {children}
      </motion.section>
    </nav>
  );
});
