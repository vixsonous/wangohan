"use client";

import { SyntheticEvent, useState } from "react";

export default function InputElements() {
    const [val,setVal] = useState("");
    return (
        <div>
            <div className="flex gap-[15px]">
                <input value={val} onChange={(e:SyntheticEvent) => {
                    const trgt = e.currentTarget as HTMLInputElement;
                    setVal(trgt.value);
                }} className="w-[100%] border-[2px] rounded-[5px] border-grey-100 p-[5px] text-[10px] bg-[#fff8ef]" placeholder="レシピの手順を記入" type="text" name="recipe-image" id="recipe-image" />
                <button>X</button>
            </div>
        </div>
    )
}