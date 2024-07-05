'use client';
import { useState } from "react";

export default function RecipeIngredients() {

    const [number,setNumber] = useState(0);

    const inputElement = (idx:String) => {
        return (
            <div key={Number(idx)} className="flex gap-[15px]">
                <input className="w-[50%] border-[2px] rounded-[5px] border-grey-100 p-[5px] text-[10px] bg-[#fff8ef]" placeholder="例）にんじん" type="text" name={`recipe-ingredient-name-${idx}`} id={`recipe-ingredient-name-${idx}`} />
                <input className="w-[50%] border-[2px] rounded-[5px] border-grey-100 p-[5px] text-[10px] bg-[#fff8ef]" placeholder="例）1/2本" type="text" name={`recipe-ingredient-amt-${idx}`} id={`recipe-ingredient-amt-${idx}`} />
                <button>X</button>
            </div>
        )
    }

    const [elements, setElements] = useState([inputElement(String(number))]);

    const addElements = () => {
        setNumber(n => n + 1);

        elements.push(inputElement(String(number + 1)));
    }

    const key = new Date().getTime() * Math.random();

    return (
        <div key={key} className="[100%] flex flex-col gap-[5px]">
            <label htmlFor="recipe-title" className="flex">
                <h1 className="font-semibold text-[20px]">材料・分量</h1>
            </label>
            {elements.map(el => {
                return el
            })}
            <span onClick={addElements} className="text-[10px] self-start">＋追加</span>
        </div>
    );
}