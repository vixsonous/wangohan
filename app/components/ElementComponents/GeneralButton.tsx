import { memo } from "react";

export default memo(function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`bg-button text-white py-2 rounded-md text-sm px-4 font-semibold self-center ${
        props.disabled ? "opacity-50" : ""
      }`}
    >
      {children}
    </button>
  );
});
