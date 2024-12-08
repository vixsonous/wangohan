import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { memo } from "react";

export default memo(function InputLoading() {
  return (
    <div className="w-full justify-center flex items-center"><CircleNotch size={20} className="animate-spin"/></div>
  )
})