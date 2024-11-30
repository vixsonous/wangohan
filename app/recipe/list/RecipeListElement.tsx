'use client';
import OptImage from "@/app/components/ElementComponents/Image";
import { DisplayRecipe } from "@/constants/interface";
import Link from "next/link";
import React, { memo, useRef } from "react";
import {motion, useInView} from 'framer-motion';

interface RecipeListProps {
  recipes: Array<DisplayRecipe>,
}

export default memo(function RecipeListElement({recipes} : RecipeListProps) {

  const RecipeElements = memo(({recipe, idx}:{recipe:DisplayRecipe, idx: Number}) => {

    const ref = useRef(null);
    const isInView = useInView(ref, {once: true});
    return (
    <motion.div ref={ref} initial={{opacity: 0, y: 100}} animate={{opacity: isInView ? 1 : 0, y: isInView ? 0 : 100}} transition={{duration: 1}}>
      <Link href={"/recipe/show/" + recipe.recipe_id} key={String(idx)} >
        <div className="relative flex flex-col gap-4">
          <OptImage fit="cover" width={400} height={400} resize src={recipe.recipe_image} className="aspect-square w-[100%] h-[100%] object-cover max-w-none" alt="website banner" />
        </div>
      </Link>
    </motion.div>
    )
  });

  return (
      <div className=" w-[100%] gap-8 grid grid-cols-4 lg:grid-cols-5">
          {recipes.map((recipe, idx) => <React.Fragment key={idx}><RecipeElements recipe={recipe} idx={idx}/></React.Fragment>)}
      </div>
  )
});