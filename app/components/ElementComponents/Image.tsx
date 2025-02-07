"use client";
import { useCallback, useEffect, useState } from "react";

type LoadingType = "eager" | "lazy" | undefined;

export default function OptImage({
  src,
  className = "",
  width,
  height,
  alt = "",
  loading = "lazy",
  centered = false,
  square = false,
  rectangle = false,
  containerClass = "",
  fit = "contain",
  resize = false,
  style = {},
  fullContainer = true,
}: {
  src: string;
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
  loading?: LoadingType;
  centered?: boolean;
  square?: boolean;
  rectangle?: boolean;
  containerClass?: string;
  fit?: "contain" | "cover" | "fill" | "inside" | "outside";
  resize?: boolean;
  style?: object;
  fullContainer?: boolean;
}) {
  return (
    <div
      className={`${containerClass} ${fullContainer ? "w-full h-full" : ""} ${
        centered ? "flex justify-center items-center" : ""
      }`}
    >
      <picture
        style={{
          backgroundImage: `url(/api/image?src=${src}&w=60&h=60&fit=cover)`,
          backgroundSize: "cover",
          objectFit: "cover",
          objectPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className={
          `relative ${square && "aspect-square"} ${
            rectangle && "aspect-video"
          } h-[${height}px] w-[${width}px] relative top-0  ` + className
        }
      >
        {resize ? (
          <>
            <source
              media="(max-width: 340px)"
              srcSet={`/api/image?src=${src}&w=60&h=60&fit=${fit}`}
              type="image/webp"
            />
            <source
              media="(max-width: 640px)"
              srcSet={`/api/image?src=${src}&w=${width}&h=${height}&fit=${fit}`}
              type="image/webp"
            />
            <source
              media="(max-width: 768px)"
              srcSet={`/api/image?src=${src}&w=${width}&h=${height}&fit=${fit}`}
              type="image/webp"
            />
            <source
              media="(max-width: 1024px)"
              srcSet={`/api/image?src=${src}&w=${width}&h=${height}&fit=${fit}`}
              type="image/webp"
            />
            <img
              style={style}
              src={`/api/image?src=${src}&w=${width}&h=${height}&fit=${fit}`}
              loading={loading}
              className={
                `${square ? "aspect-square" : ""} ${
                  rectangle && "aspect-video"
                } h-[${height}px] w-[${width}px] relative top-0  ` + className
              }
              width={width}
              height={height}
              alt={alt}
            />
          </>
        ) : (
          <>
            <img
              className={
                `${square ? "aspect-square" : ""} ${
                  rectangle && "aspect-video"
                } h-[${height}px] w-[${width}px] relative top-0  ` + className
              }
              style={style}
              src={src}
              loading={loading}
              width={width}
              height={height}
              alt={alt}
            />
          </>
        )}
      </picture>
    </div>
  );
}
