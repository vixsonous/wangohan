'use client';
import { textColor } from "@/constants/constants";
import { DisplayRecipe } from "@/constants/interface";
import { faEdit, faEllipsisV, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Props {
    element: number
}

export default function RecipeElementV3 ({recipe} : {recipe: DisplayRecipe}) {

    const [state, setState] = useState({
        displayMenu: false
    });

    return (
        <img src={recipe.recipe_image} className="top-0 bottom-0 right-0 left-0 w-full h-full absolute object-cover" alt="website banner" />
    )
}