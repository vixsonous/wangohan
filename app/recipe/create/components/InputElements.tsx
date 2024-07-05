
import { useRef } from "react";

export default function inputElement(idx:String){
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