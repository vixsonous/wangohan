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
    centered=false
}: {
    src: string, 
    className?: string, 
    width?: number, 
    height?: number, 
    alt?: string, 
    loading?: LoadingType,
    centered?:boolean
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
        <div className={`w-full h-full ${centered ? 'flex justify-center items-center' : ''}`}>
          <picture className={`${centered ? 'flex justify-center items-center' : ''}`}>
            <source media="(max-width: 340px)" srcSet={`${xs}.webp`} type="image/webp"  /> 
            <source media="(max-width: 340px)" srcSet={xs} type="image/jpeg"  /> 
            <source media="(max-width: 640px)" srcSet={`${sm}.webp`} type="image/webp" />
            <source media="(max-width: 640px)" srcSet={sm} type="image/jpeg" />
            <source media="(max-width: 768px)" srcSet={`${md}.webp`} type="image/webp" />
            <source media="(max-width: 768px)" srcSet={md} type="image/jpeg" />
            <source media="(max-width: 1024px)" srcSet={`${lg}.webp`} type="image/webp" />
            <source media="(max-width: 1024px)" srcSet={lg} type="image/jpeg" />
            <img onLoad={setOnLoad} src={src} loading={loading} className={`${!loaded ? 'hidden': 'visible'} ` + className} width={width} height={height} alt={alt} />
          </picture>
          {!loaded && <img src={xs} loading={loading} className={className} width={width} height={height} alt={alt} />}
        </div>
    )
}