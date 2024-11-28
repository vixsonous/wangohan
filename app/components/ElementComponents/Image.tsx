"use client";
import { useCallback, useEffect, useState } from "react";

type LoadingType = "eager" | "lazy" | undefined;

export default function OptImage({
    src, 
    className="", 
    width, 
    height=100, 
    alt="", 
    loading="lazy",
    centered=false,
    square=false,
    containerClass=''
}: {
    src: string, 
    className?: string, 
    width?: number, 
    height?: number, 
    alt?: string, 
    loading?: LoadingType,
    centered?:boolean,
    square?: boolean,
    containerClass?:string
}) {

  const getSrcVariants = useCallback((src: string) => {
    if (!src.includes("type_or")) return { xs: src, sm: src, md: src, lg: src };
      return {
          xs: src.replace("type_or", "type_xs"),
          sm: src.replace("type_or", "type_sm"),
          md: src.replace("type_or", "type_md"),
          lg: src.replace("type_or", "type_lg"),
      };
  },[]);
  
    const { xs, sm, md, lg } = getSrcVariants(src);
    const [loaded, setLoaded] = useState(false);

    const setOnLoad = () => setLoaded(true);
    return (
        <div className={`${containerClass} w-full h-full ${centered ? 'flex justify-center items-center' : ''}`}>
          <picture className={`${centered ? 'flex justify-center items-center' : ''}`}>
            <source media="(max-width: 340px)" srcSet={`${xs}`} type="image/webp"  /> 
            <source media="(max-width: 340px)" srcSet={xs} type="image/jpeg"  /> 
            <source media="(max-width: 640px)" srcSet={`${sm}`} type="image/webp" />
            <source media="(max-width: 640px)" srcSet={sm} type="image/jpeg" />
            <source media="(max-width: 768px)" srcSet={`${md}`} type="image/webp" />
            <source media="(max-width: 768px)" srcSet={md} type="image/jpeg" />
            <source media="(max-width: 1024px)" srcSet={`${lg}`} type="image/webp" />
            <source media="(max-width: 1024px)" srcSet={lg} type="image/jpeg" />
            <img onLoad={setOnLoad} src={src} loading={loading} className={`${!loaded ? 'hidden': 'block'} ${square ? 'aspect-square' : ''} h-[${height}px] w-[${width}px] ` + className} width={width} height={height} alt={alt} />
            {!loaded && <img src={xs} loading={loading} className={`h-[${height}px] w-[${width}px] ${square ? 'aspect-square' : ''} absolute top-0 ` + className} width={width} height={height} alt={alt} />}
          </picture>
        </div>
    )
}