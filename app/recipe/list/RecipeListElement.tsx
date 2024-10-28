import Image from "next/image";

interface RecipeListProps {
    recipes: Array<Number>
}

export default function RecipeListElement({recipes} : RecipeListProps) {

    const divElements = (element:Number) => {
        const CardFontSize = '10px';
        const CardTagSize = '9px';

        return (
        <div key={String(element)} className="w-[32%] pb-[32%] lg:w-[19%] lg:pb-[19%] relative flex flex-col">
            <img src={'/dashboard.webp'} className="w-[100%] h-[100%] object-cover absolute max-w-none" width={10000} height={10000} alt="website banner" />
        </div>
        )
    }

    return (
        <div className="flex w-[100%] gap-[2px] justify-center items-center flex-wrap">
            {recipes.map(el => divElements(el))}
        </div>
    )
}