type LoadingType = "eager" | "lazy" | undefined;

export default function OptImage({
    src, 
    className="", 
    width=100, 
    height=100, 
    alt="", 
    loading="lazy"
}: {
    src: string, 
    className?: string, 
    width?: number, 
    height?: number, 
    alt?: string, 
    loading?: LoadingType
}) {
    const isFound = src.search("type_or") !== -1;
    const tb = isFound ? src.replace("type_or","type_thumbnail") : src;
    const xs = isFound ? src.replace("type_or","type_xs") : src;
    const sm = isFound ? src.replace("type_or","type_sm") : src;
    const md = isFound ? src.replace("type_or","type_md") : src;
    const lg = isFound ? src.replace("type_or","type_lg") : src;
    return (
        <picture>
            <source media="(max-width: 340px)" srcSet={xs} /> 
            <source media="(max-width: 640px)" srcSet={sm} />
            <source media="(max-width: 768px)" srcSet={md}/>
            <source media="(max-width: 1024)" srcSet={lg}/>
            <img src={src} loading={loading} className={className} width={width} height={height} alt={alt} />
        </picture>
    )
}