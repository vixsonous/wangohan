'use client';

import { fontSize, textColor } from "@/constants/constants";
import { faEdit, faEllipsisV, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {motion} from 'framer-motion';

export default function RecipeOptions({recipe_id} : {recipe_id: number}) {
    const menuVariants = {
        open: {scale: 1, opacity: 1},
        closed: {scale: 0, opacity: 0}
    }
    const [state, setState] = useState({
        displayMenu: false
    });

    const deleteRecipe = async () => {
        // await fetch('/api/recipe', {
        //     method: 'DELETE',
        //     body: JSON.stringify({recipe_id: recipe_id})
        // }).then(res => {

        // }).catch( err => {

        // });
    }

    return (
        <div className="absolute z-[5] right-0">
            <FontAwesomeIcon onClick={() => setState(prev => ({...prev, displayMenu: !state.displayMenu}))} icon={faEllipsisV} size="xl" className="relative right-[10px] top-[10px] text-[#FFFAF0] z-[2]"/>
            <motion.div key={1} initial={"closed"} animate={state.displayMenu ? "open" : "closed"} exit={"closed"} variants={menuVariants} className={`absolute top-[30px] right-[20px]`}>
                <div className="flex flex-col relative z-[2] p-[15px] gap-[5px]">
                    <button className="flex gap-[5px] items-center justify-center z-[2]">
                        <FontAwesomeIcon icon={faEdit} className="self-center"/>
                        <h1 style={{fontSize: fontSize.l2}} className="whitespace-nowrap text-[#FFFAF0]">編集する</h1>
                    </button>
                    <hr />
                    <button onClick={deleteRecipe} className="flex gap-[5px] items-center justify-center z-[2]">
                        <FontAwesomeIcon icon={faTrash} color={textColor.error} className="self-center"/>
                        <h1 style={{fontSize: fontSize.l2}} className="whitespace-nowrap text-[#FFFAF0]">削除する</h1>
                    </button>
                    <div className="absolute w-full h-full bg-black opacity-[0.5] top-0 left-0 rounded-md z-[1]"></div>
                </div>
            </motion.div>
        </div>
    )
}