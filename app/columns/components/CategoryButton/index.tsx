import Button from "@/app/components/Button";
import OptImage from "@/app/components/ElementComponents/Image";
import React, { memo } from "react";

export default memo(function CategoryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      className={`${props.className} px-2 md:px-6 py-2 bg-secondary-bg flex gap-2 items-center justify-center rounded-full border-2 border-button`}
      {...props}
    >
      <OptImage
        fullContainer={false}
        width={16}
        height={16}
        src={"/columns/paw2.png"}
      />
      {children}
    </Button>
  );
});
