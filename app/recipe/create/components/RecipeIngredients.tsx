'use client';
import { SyntheticEvent, useEffect, useRef, useState } from "react";

type ingredient = {
    name: string,
    amount: string,
}

export default function RecipeIngredients() {
    const refs = useRef<HTMLDivElement[]>(new Array<HTMLDivElement>());
    const inp1 = useRef<HTMLInputElement[]>(new Array<HTMLInputElement>());
    const inp2 = useRef<HTMLInputElement[]>(new Array<HTMLInputElement>());

    const [elements, setElements] = useState<ingredient[]>([{name: '', amount: ''}]);

    const addElements = () => {
        setElements([...elements,{name: '', amount: ''}]);
    }

    const key = new Date().getTime() * Math.random();

    useEffect(() => {
        console.log(elements);
        for(let i = 0; i < elements.length; i ++) {
            inp1.current[i].value = elements[i].name;
            inp2.current[i].value = elements[i].amount;
        }
    },[elements]);

    return (
        <div key={key} className="[100%] flex flex-col gap-[5px]">
            <label htmlFor="recipe-title" className="flex">
                <h1 className="font-semibold text-[20px]">材料・分量</h1>
            </label>
            {elements.map((el, idx) => {
                return (
                    <div key={Number(idx)} ref={(el:HTMLDivElement | null) => {
                        if(el !== null) {
                            refs.current[idx] =el ;
                        }
                    }}>
                        <div key={Number(idx)} className="flex gap-[15px]">
                            <input onBlur={(e:SyntheticEvent) => {
                                e.preventDefault();
                                const trgt = e.target as HTMLInputElement;
                                setElements(arr => {
                                    const n = [...arr];
                                    n[idx].name = trgt.value;
                                    return n;
                                });
                            }} ref={(el:HTMLInputElement | null) => {
                                if(el !== null) {
                                    inp1.current[idx] = el ;
                                }
                            }} className="w-[50%] border-[2px] rounded-[5px] border-grey-100 p-[5px] text-[10px] bg-[#fff8ef]" placeholder="例）にんじん" type="text" name={`recipe-ingredient-name-${idx}`} id={`recipe-ingredient-name-${idx}`} />
                            <input onBlur={(e:SyntheticEvent) => {
                                e.preventDefault();
                                const trgt = e.target as HTMLInputElement;
                                setElements(arr => {
                                    const n = [...arr];
                                    n[idx].amount = trgt.value;
                                    return n;
                                });
                            }} ref={(el:HTMLInputElement | null) => {
                                if(el !== null) {
                                    inp2.current[idx] = el ;
                                }
                            }} className="w-[50%] border-[2px] rounded-[5px] border-grey-100 p-[5px] text-[10px] bg-[#fff8ef]" placeholder="例）1/2本" type="text" name={`recipe-ingredient-amt-${idx}`} id={`recipe-ingredient-amt-${idx}`} />
                            <button onClick={(e:SyntheticEvent) => {
                                e.preventDefault();
                                refs.current[Number(idx)].remove();
                                const el = [...elements];
                                el.splice(idx, 1);
                                setElements(el);
                            }}><svg fill="black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24">
                            <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"></path>
                            </svg></button>
                        </div>
                    </div>
                )
            })}
            <span onClick={addElements} className="text-[10px] self-start">＋追加</span>
        </div>
    );
}