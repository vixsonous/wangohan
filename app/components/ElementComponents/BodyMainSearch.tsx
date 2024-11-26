"use client";

import { useInView } from "framer-motion";
import { memo, useEffect, useRef } from "react";
import MainSearchForm from "../MainSearchForm";
import { inView, offView } from "@/lib/redux/states/formSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

export default memo(function BodyMainSearch() {
  const div = useRef<HTMLDivElement>(null);
  const isInView = useInView(div, {margin: "-80.68px 0px 0px 0px"});
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(isInView) dispatch(inView());
    if(!isInView) dispatch(offView());
  },[isInView]);
  return (
    <div className="w-full lg:w-[400px]" ref={div}>
      <MainSearchForm isInView={isInView}/>
    </div>
  )
});