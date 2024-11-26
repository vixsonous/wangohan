"use client";

import { memo, useEffect, useState } from "react";
import MainSearchForm from "../MainSearchForm";
import { useAppSelector } from "@/lib/redux/hooks";

export default memo(function BarMainSearch() {
  const [state, setState] = useState(false);
  const barView = useAppSelector(state => state.form.barView);

  return (
    <div className="w-[170px] sm:w-[250px] md:w-[500px]">
      <MainSearchForm isInView={barView} isBar={true}/>
    </div>
    
  )
});