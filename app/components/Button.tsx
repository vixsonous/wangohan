import { memo } from "react";

export default memo(function Button({children, ...props}:React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props}>{children}</button>
});