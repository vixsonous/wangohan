'use client';
import { textColor } from "@/constants/constants";
import Image from "next/image";
import React, { SyntheticEvent, useState } from "react";

interface ingredient {
    name: string,
    amount: string,
};

interface instruction {
    text: string,
};

interface RecipeInfoInterface {
    recipeTitle: string,
    recipeDescr: string,
    recipeThumbnail: string,
    recipeImage: string,
    recipeIngredients: Array<ingredient>,
    recipeInstructions: Array<instruction>
}

export default function CreateRecipeForm() {
    const CardFontSize = '13px';
    const CardTagSize = '10px';

    const [recipeInfo, setRecipeInfo] = useState({
        recipeTitle: '',
        recipeDescr: '',
        recipeThumbnail: '',
        age: '',
        size: '',
        event: '',
        recipeImage: null,
    });

    const [recipeIngredients, setRecipeIngredients] = useState<ingredient[]>([{name: '', amount: ''}]);
    const [recipeInstructions, setRecipeInstructions] = useState<instruction[]>([{text: ''}]);

    const submitFunc = (e:SyntheticEvent) => {
        e.preventDefault();

        const data2Send = {...recipeInfo, recipeIngredients: recipeIngredients, recipeInstructions: recipeInstructions};

        console.log(data2Send);
    }

    return (
        <form action="" className="create-form flex flex-wrap gap-[30px] max-w-[768px]">
            <div className="flex-[0_0_100%]">
                <label htmlFor="recipe-title" aria-required className="flex">
                    <h1 className="font-semibold text-[20px]">レシピタイトル</h1>
                    <span className={`text-[10px] self-center font-semibold ${ 25 - recipeInfo.recipeTitle.length < 0 ? `text-[${textColor.error}]` : ''}`}>（{25 - recipeInfo.recipeTitle.length}{25 - recipeInfo.recipeTitle.length >= 0 ? `文字以内` : `文字オーバーしています`}）</span>
                </label>
                <input value={recipeInfo.recipeTitle} onChange={(e) => setRecipeInfo(prev => ({...prev, recipeTitle: e.target.value}))} className="w-[100%] p-[7px] text-[13px] bg-[#fff8ef]" placeholder="例）炊飯器で簡単！夏バテでも食べられるご飯" type="text" name="recipe-title" id="recipe-title" />
            </div>

            <div className="flex-[0_0_100%]">
                <label htmlFor="recipe-description" className="flex">
                    <h1 className="font-semibold text-[20px]">レシピの説明</h1>
                </label>
                <textarea className="w-[100%] p-[7px] text-[13px] bg-[#fff8ef]" placeholder="レシピに説明をしてください例）愛犬が夏バテでなかなかご飯を食べなかったので、お魚ベースの手作りごはんを作りました。たくさん食べてくれたので是非作ってみてください。" rows={5} name="recipe-description" id="recipe-description" />
            </div>

            <div className="flex-[0_0_100%] mt-[15%]">
                <label htmlFor="recipe-image" className="flex relative">
                    <Image src={'/recipe-making/3dogs.png'} className="top-[-23.2%] left-[10%] absolute h-[auto] w-[30%] max-w-none rounded-[25px]" width={10000} height={10000}  alt="website banner" />
                    <Image src={'/recipe-making/pic-background.png'} className="h-[auto] w-[100%] max-w-none rounded-[25px]" width={10000} height={10000}  alt="website banner" />
                    <h1 className="absolute w-[100%] flex flex-col justify-center items-center h-[100%] text-[16px] sm:text-[26px] text-center">料理の画像をアップロード
                    <br/> （横長推奨）<br /> <span className="text-[36px]">+</span></h1>
                    <input className="w-[100%] hidden" type="file" name="recipe-image" id="recipe-image" />
                </label>
            </div>

            <div className="flex-[0_0_100%] flex flex-col gap-[5px]">
                <label htmlFor="recipe-ingredient-name-0" className="flex">
                    <h1 className="font-semibold text-[20px]">材料・分量</h1>
                </label>
                {recipeIngredients.map((el, idx) => {
                    return (
                        <div key={idx}>
                            <div className="flex gap-[15px]">
                                <input value={recipeIngredients[idx].name} onChange={(e) => {
                                    const prevArr = [...recipeIngredients];
                                    prevArr[idx].name = e.target.value;
                                    setRecipeIngredients([...prevArr]);
                                }} className="w-[50%] border-[2px] rounded-[5px] border-grey-100 p-[7px] text-[13px] bg-[#fff8ef]" placeholder="例）にんじん" type="text" name={`recipe-ingredient-name-${idx}`} id={`recipe-ingredient-name-${idx}`} />
                                <input value={recipeIngredients[idx].amount} onChange={(e) => {
                                    const prevArr = [...recipeIngredients];
                                    prevArr[idx].amount = e.target.value;
                                    setRecipeIngredients([...prevArr]);
                                }} className="w-[50%] border-[2px] rounded-[5px] border-grey-100 p-[7px] text-[13px] bg-[#fff8ef]" placeholder="例）1/2本" type="text" name={`recipe-ingredient-amt-${idx}`} id={`recipe-ingredient-amt-${idx}`} />
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    recipeIngredients.splice(idx, 1)
                                    setRecipeIngredients([...recipeIngredients])
                                }}><svg fill="black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24">
                                <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"></path>
                                </svg></button>
                            </div>
                        </div>
                    )
                })}
                <span onClick={(e: SyntheticEvent) => setRecipeIngredients(prev => [...recipeIngredients, {name: '', amount: ''} as ingredient])} className="text-[13px] self-start cursor-pointer">＋追加</span>
            </div>
            <div className="flex-[0_0_100%] flex flex-col gap-[5px]">
                <label htmlFor="recipe-instruction-0" className="flex">
                    <h1 className="font-semibold text-[20px]">作り方</h1>
                </label>
                {recipeInstructions.map((el, idx) => {
                    return (
                        <div key={idx}>
                            <div className="flex gap-[15px] justify-between items-center">
                                <span className="ml-[10px] flex justify-center items-center rounded-xl relative">{idx + 1}
                                    <div className="border-[1px] border-black absolute h-[25px] w-[25px] rounded-[35px]"></div>
                                </span>
                                <input value={recipeInstructions[idx].text} onChange={(e) => {
                                    const prevArr = [...recipeInstructions];
                                    prevArr[idx].text = e.target.value;
                                    setRecipeInstructions([...prevArr]);
                                }} className="w-[100%] border-[2px] rounded-[5px] border-grey-100 p-[7px] text-[13px] bg-[#fff8ef]" placeholder="レシピの手順を記入" type="text" name={`recipe-instructions-${idx}`} id={`recipe-instructions-${idx}`} />
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    recipeInstructions.splice(idx, 1)
                                    setRecipeInstructions([...recipeInstructions])
                                }}><svg fill="black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24">
                                <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"></path>
                                </svg></button>
                            </div>
                        </div>
                    )
                })}
                <span onClick={(e: SyntheticEvent) => setRecipeInstructions(prev => [...recipeInstructions, {text:''} as instruction])} className="text-[13px] cursor-pointer">＋追加</span>
            </div>
            <div className="flex-[0_0_100%]">
                <label htmlFor="recipe-category" className="flex">
                    <h1 className="font-semibold text-[20px]">カテゴリー</h1>
                </label>
                <div className="ml-[1px] flex flex-wrap" id="recipe-category">
                    <div className={` w-[45%] flex flex-col gap-[5px] flex-wrap `}>
                        <span className="text-[13px] text-[grey]">年齢を選択</span>
                        <div className="flex gap-[5px] flex-wrap items-center">
                            {
                                ['子犬', '成犬', 'シニア犬'].map((el, idx) => {
                                    return (
                                        <React.Fragment key={idx}>
                                        <input className="hidden" type="radio" checked={recipeInfo.age === el} onClick={(e) => setRecipeInfo(prev => ({...prev, age: (e.target as HTMLInputElement).value !== recipeInfo.age ? (e.target as HTMLInputElement).value : ''}))} onChange={(e) => setRecipeInfo(prev => ({...prev, age: e.target.value}))} name="age" value={el} id={el} />
                                        <label htmlFor={el}>
                                            <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>{el}</span>
                                        </label>
                                        </React.Fragment>
                                    )
                                })
                            }
                            </div>
                    </div>
                    <div className={` w-[45%] flex flex-col gap-[5px] flex-wrap `}>
                        <span className="text-[13px] text-[grey]">サイズを選択</span>
                        <div className="flex gap-[5px] flex-wrap items-center">
                            {
                                ['小型犬','中型犬','大型犬'].map( (el, idx) => {
                                    return (
                                        <React.Fragment key={idx}>
                                        <input checked={recipeInfo.size === el} onClick={(e) => setRecipeInfo(prev => ({...prev, size: (e.target as HTMLInputElement).value !== recipeInfo.size ? (e.target as HTMLInputElement).value : ''}))} onChange={(e) => setRecipeInfo(prev => ({...prev, size: e.target.value}))} className="hidden" type="radio" name="size" id={el} value={el} />
                                        <label htmlFor={el}>
                                            <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>{el}</span>
                                        </label>
                                        </React.Fragment>
                                    )
                                } )
                            }
                        </div>
                    </div>
                    <div className={` mt-[10px] w-[100%] flex flex-col gap-[5px] flex-wrap `}>
                        <span className="text-[13px] text-[grey]">イベントを選択</span>
                        <div className="flex gap-[5px] flex-wrap items-center">
                            {
                                ['お誕生日','おうち記念日','お正月','節分','ひな祭り',
                                    'こどもの日','七夕','ハロウィン','クリスマス','おやつ','その他'].map( (el, idx) => {
                                        return (
                                            <React.Fragment key={idx}>
                                                <input checked={recipeInfo.event === el} onClick={(e) => setRecipeInfo(prev => ({...prev, event: (e.target as HTMLInputElement).value !== recipeInfo.event ? (e.target as HTMLInputElement).value : ''}))} onChange={(e) => setRecipeInfo(prev => ({...prev, event: e.target.value}))} className="hidden" type="radio" name="event" id={el} value={el} />
                                                <label htmlFor={el}>
                                                    <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>{el}</span>
                                                </label>
                                            </React.Fragment>
                                        )
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <button onClick={e => submitFunc(e)} className="bg-[#ffb762] text-white py-[10px] rounded-md text-[13px] px-[20px] font-bold self-center" type="submit">
                    作成する
                </button>
            </div>
        </form>
    )
}