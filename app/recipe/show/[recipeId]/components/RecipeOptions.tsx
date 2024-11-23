'use client';

import { fontSize, textColor } from "@/constants/constants";
import { faEdit, faEllipsisV, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import {motion} from 'framer-motion';
import Link from "next/link";
import { DotsThreeOutlineVertical } from "@phosphor-icons/react/dist/ssr";

export default function RecipeOptions({recipe_id} : {recipe_id: number}) {
    const menuVariants = {
        open: {scale: 1, opacity: 1},
        closed: {scale: 0, opacity: 0}
    }
    const [state, setState] = useState({
        displayMenu: false
    });

    const deleteRecipe = async () => {
        await fetch('/api/recipe', {
            method: 'DELETE',
            body: JSON.stringify({recipe_id: recipe_id})
        }).then(res => {

        }).catch( err => {

        });
    }

    const openOptions = useCallback(() => setState(prev => ({...prev, displayMenu: !state.displayMenu})), [state.displayMenu]);

    return (
        <div className="absolute z-[5] right-0">
            <button className="relative right-8 top-4 bg-primary-text p-1 rounded-full text-[#FFFAF0] z-30 flex justify-center items-center">
              <DotsThreeOutlineVertical size={20} onClick={openOptions}/>
            </button>
            <motion.div key={1} initial={"closed"} animate={state.displayMenu ? "open" : "closed"} exit={"closed"} variants={menuVariants} className={`absolute top-8 right-12 origin-top-right`}>
                <div className="flex flex-col relative z-20 p-[15px] gap-[5px]">
                    <button className="flex gap-[5px] items-center justify-center z-20">
                        <FontAwesomeIcon icon={faEdit} color={"#FFFAF0"} className="self-center"/>
                        <Link href={`/recipe/edit/${recipe_id}`}>
                            <h1 style={{fontSize: fontSize.l2}} className="whitespace-nowrap text-[#FFFAF0]">編集する</h1>
                        </Link>
                    </button>
                    <hr />
                    <button onClick={deleteRecipe} className="flex gap-[5px] items-center justify-center z-20">
                        <FontAwesomeIcon icon={faTrash} color={"#FFFAF0"} className="self-center"/>
                        <h1 style={{fontSize: fontSize.l2}} className="whitespace-nowrap text-[#FFFAF0]">削除する</h1>
                    </button>
                    <div className="absolute w-full h-full bg-primary-text opacity-100 top-0 left-0 rounded-md z-10"></div>
                </div>
            </motion.div>
        </div>
    )
}