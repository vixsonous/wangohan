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
    containerClass='',
    fit='contain',
    resize=false,
    style={}
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
    fit?: 'contain' | 'cover' | 'fill' | 'inside' | 'outside',
    resize?: boolean
    style?:object
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
    const [srcState, setSrcState] = useState(src);

    const setOnLoad = () => setLoaded(true);

    // useEffect(() => {
    //   console.log(loaded);
    //   const reload = setTimeout(() => {
    //     setSrcState(srcState);
    //   },5000);

    //   if(loaded) clearTimeout(reload);

    //   return () => clearTimeout(reload);
    // },[loaded]);
    return (
        <div className={`${containerClass} w-full h-full ${centered ? 'flex justify-center items-center' : ''}`}>
          <picture className={`relative ${centered ? 'flex justify-center items-center' : ''} h-[${height}px] w-[${width}px]`}>
            { resize ? (
              <>
              <source media="(max-width: 340px)" srcSet={`/api/image?src=${src}&w=60&h=60&fit=${fit}`} type="image/webp"  /> 
              <source media="(max-width: 640px)" srcSet={`/api/image?src=${src}&w=${width}&h=${height}&fit=${fit}`} type="image/webp" />
              <source media="(max-width: 768px)" srcSet={`/api/image?src=${src}&w=${width}&h=${height}&fit=${fit}`} type="image/webp" />
              <source media="(max-width: 1024px)" srcSet={`/api/image?src=${src}&w=${width}&h=${height}&fit=${fit}`} type="image/webp" />
              <img style={style} onLoad={setOnLoad} src={`/api/image?src=${src}&w=${width}&h=${height}&fit=${fit}`} loading={loading} className={`${square ? 'aspect-square' : ''} h-[${height}px] w-[${width}px] relative top-0  ` + className} width={width} height={height} alt={alt} />
              {!loaded && <img style={style} src={`/api/image?src=${src}&w=60&h=60&fit=cover`} loading={loading} className={`h-[${60}px] w-[${60}px] ${square ? 'aspect-square' : ''}  absolute top-0 ` + className} width={60} height={60} alt={alt} />}
              </>
            ) : (
              <>
              <img onLoad={setOnLoad} style={style} src={src} loading={loading} className={`${!loaded ? 'hidden': 'block'} ${square ? 'aspect-square' : ''} h-[${height}px] w-[${width}px] relative top-0  ` + className} width={width} height={height} alt={alt} />
              {!loaded && <img src={`/api/image?src=${src}&w=60&h=60&fit=cover`} style={style} loading={loading} className={`h-[${60}px] w-[${60}px] ${square ? 'aspect-square' : ''} absolute top-0 ` + className} width={60} height={60} alt={alt} />}
              </>
            )}
            
          </picture>
        </div>
    )
}