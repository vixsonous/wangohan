import Image from "next/image";
import { memo } from "react";

interface RecipeListProps {
    recipes: Array<Number>
}

export default function RecipeListElement({recipes} : RecipeListProps) {

    const RecipeElements = memo(({recipe, idx}:{recipe:Number, idx: Number}) => {
      return (
      <div key={String(idx)} className="relative flex flex-col gap-4">
          <img src={'/dashboard.webp'} className="aspect-square w-[100%] h-[100%] object-cover max-w-none" width={10000} height={10000} alt="website banner" />
      </div>
      )
  });

    return (
        <div className=" w-[100%] gap-8 grid grid-cols-4 lg:grid-cols-5">
            {recipes.map((recipe, idx) => <RecipeElements recipe={recipe} idx={idx}/>)}
        </div>
    )
}