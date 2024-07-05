'use client';
import { useRef, useState } from "react";

export default function RecipeInstructions() {

    const [number,setNumber] = useState(0);

    const inputElement = (idx:String) => {
        const ref = useRef(null);

        const deleteItem = () => {
            if(ref.current != null) {
                // ref.current.style.display = "none";
            }
        }

        return (
            <div key={Number(idx)} ref={ref} className="flex gap-[15px]">
                <input className="w-[100%] border-[2px] rounded-[5px] border-grey-100 p-[5px] text-[10px] bg-[#fff8ef]" placeholder="レシピの手順を記入" type="text" name="recipe-image" id="recipe-image" />
                <button onClick={deleteItem}>X</button>
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
                <h1 className="font-semibold text-[20px]">作り方</h1>
            </label>
            {elements.map(el => el)}
            <span onClick={addElements} className="text-[10px] self-start">＋追加</span>
        </div>
    );
}