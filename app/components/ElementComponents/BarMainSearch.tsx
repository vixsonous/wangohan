"use client";

import { memo, useEffect, useState } from "react";
import MainSearchForm from "../MainSearchForm";
import { useAppSelector } from "@/lib/redux/hooks";

export default memo(function BarMainSearch() {
  const [state, setState] = useState(false);
  const barView = useAppSelector(state => state.form.barView);

  return (
    <div>
      <MainSearchForm isInView={barView}/>
    </div>
    
  )
});