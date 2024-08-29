'use client';
import Image from "next/image";
import { SyntheticEvent, useState } from "react";

interface ingredient {
    name: string,
    amount: string,
};

interface instruction {
    name: string,
    amount: string,
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
    const [elements, setElements] = useState([1,2,3,4,5]);
    const CardFontSize = '13px';
    const CardTagSize = '10px';

    const [recipeInfo, setRecipeInfo] = useState({
        recipeTitle: '',
        recipeDescr: '',
        recipeThumbnail: '',
        recipeImage: null,
        recipeIngredients: new Array<ingredient>,
        recipeInstructions: new Array<instruction>
    });

    const [recipeIngredients, setRecipeIngredients] = useState<ingredient[]>([]);
    const [recipeInstructions, setRecipeInstructions] = useState<ingredient[]>([]);

    return (
        <form action="" className="create-form flex flex-col gap-[30px]">
            <div className="w-[100%]">
                <label htmlFor="recipe-title" className="flex">
                    <h1 className="font-semibold text-[20px]">レシピタイトル</h1>
                    <span className="text-[10px] self-center font-semibold">（21文字以内）</span>
                </label>
                <input value={recipeInfo.recipeTitle} onChange={(e) => setRecipeInfo(prev => ({...prev, recipeTitle: e.target.value}))} className="w-[100%] p-[7px] text-[13px] bg-[#fff8ef]" placeholder="例）炊飯器で簡単！夏バテでも食べられるご飯" type="text" name="recipe-title" id="recipe-title" />
            </div>

            <div className="w-[100%]">
                <label htmlFor="recipe-description" className="flex">
                    <h1 className="font-semibold text-[20px]">レシピの説明</h1>
                </label>
                <textarea className="w-[100%] p-[7px] text-[13px] bg-[#fff8ef]" placeholder="レシピに説明をしてください例）愛犬が夏バテでなかなかご飯を食べなかったので、お魚ベースの手作りごはんを作りました。たくさん食べてくれたので是非作ってみてください。" rows={5} name="recipe-description" id="recipe-description" />
            </div>

            <div className="[100%] mt-[15%]">
                <label htmlFor="recipe-image" className="flex relative">
                    <Image src={'/recipe-making/3dogs.png'} className="top-[-23.2%] left-[10%] absolute h-[auto] w-[30%] max-w-none rounded-[25px]" width={10000} height={10000}  alt="website banner" />
                    <Image src={'/recipe-making/pic-background.png'} className="h-[auto] w-[100%] max-w-none rounded-[25px]" width={10000} height={10000}  alt="website banner" />
                    <h1 className="absolute w-[100%] flex flex-col justify-center items-center h-[100%] text-[16px] sm:text-[26px] text-center">料理の画像をアップロード
                    <br/> （横長推奨）<br /> <span className="text-[36px]">+</span></h1>
                    <input className="w-[100%] hidden" type="file" name="recipe-image" id="recipe-image" />
                </label>
            </div>

            <div className="[100%] flex flex-col gap-[5px]">
                <label htmlFor="recipe-ingredient-name-0" className="flex">
                    <h1 className="font-semibold text-[20px]">材料・分量</h1>
                </label>
                {recipeIngredients.map((el, idx) => {
                    return (
                        <div key={new Date().getTime() * Math.random()}>
                            <div className="flex gap-[15px]">
                                <input value={recipeIngredients[idx].name} onChange={(e) => {
                                    const prevArr = recipeIngredients;
                                    prevArr[idx].name = e.target.value;
                                    setRecipeIngredients(prevArr);
                                }} className="w-[50%] border-[2px] rounded-[5px] border-grey-100 p-[7px] text-[13px] bg-[#fff8ef]" placeholder="例）にんじん" type="text" name={`recipe-ingredient-name-${idx}`} id={`recipe-ingredient-name-${idx}`} />
                                <input value={recipeIngredients[idx].amount} onChange={(e) => {
                                    const prevArr = recipeIngredients;
                                    prevArr[idx].amount = e.target.value;
                                    setRecipeIngredients(prevArr);
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
                <span onClick={(e: SyntheticEvent) => setRecipeIngredients(prev => [...recipeIngredients, {} as ingredient])} className="text-[13px] self-start cursor-pointer">＋追加</span>
            </div>
            <div className="[100%] flex flex-col gap-[5px]">
                <label htmlFor="recipe-instruction-0" className="flex">
                    <h1 className="font-semibold text-[20px]">作り方</h1>
                </label>
                {recipeInstructions.map((el, idx) => {
                    return (
                        <div key={new Date().getTime() * Math.random()}>
                            <div className="flex gap-[15px]">
                                <input className="w-[100%] border-[2px] rounded-[5px] border-grey-100 p-[7px] text-[13px] bg-[#fff8ef]" placeholder="レシピの手順を記入" type="text" name="recipe-instruction-0" id="recipe-instruction-0" />
                                <button><svg fill="black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24">
                                <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"></path>
                                </svg></button>
                            </div>
                        </div>
                    )
                })}
                <span onClick={(e: SyntheticEvent) => setRecipeInfo(prev => ({...prev, recipeInstructions: [...prev.recipeInstructions, {} as instruction]}))} className="text-[13px] self-start cursor-pointer">＋追加</span>
            </div>
            <div className="">
                <label htmlFor="recipe-category" className="flex">
                    <h1 className="font-semibold text-[20px]">カテゴリー</h1>
                </label>
                <div className="ml-[1px] flex flex-wrap" id="recipe-category">
                    <div className={` w-[45%] flex flex-col gap-[5px] flex-wrap `}>
                        <span className="text-[13px] text-[grey]">年齢を選択</span>
                        <div className="flex gap-[5px] flex-wrap items-center">
                            
                            <input className="hidden" type="radio" name="age" value="子犬" id="子犬" />
                            <label htmlFor="子犬">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>子犬</span>
                            </label>
                            
                            <input className="hidden" type="radio" name="age" id="成犬" value="成犬" />
                            <label htmlFor="成犬">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>成犬</span>
                            </label>
                            
                            <input className="hidden" type="radio" name="age" id="シニア犬" value="シニア犬" />
                            <label htmlFor="シニア犬">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>シニア犬</span>
                            </label>
                            </div>
                    </div>
                    <div className={` w-[45%] flex flex-col gap-[5px] flex-wrap `}>
                        <span className="text-[13px] text-[grey]">サイズを選択</span>
                        <div className="flex gap-[5px] flex-wrap items-center">
                            <input className="hidden" type="radio" name="size" id="小型犬" value="小型犬" />
                            <label htmlFor="小型犬">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>小型犬</span>
                            </label>
                            <input className="hidden" type="radio" name="size" id="中型犬" value="中型犬" />
                            <label htmlFor="中型犬">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>中型犬</span>
                            </label>
                            <input className="hidden" type="radio" name="size" id="大型犬" value="大型犬" />
                            <label htmlFor="大型犬">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>大型犬</span>
                            </label>
                        </div>
                    </div>
                    <div className={` mt-[10px] w-[100%] flex flex-col gap-[5px] flex-wrap `}>
                        <span className="text-[13px] text-[grey]">イベントを選択</span>
                        <div className="flex gap-[5px] flex-wrap items-center">
                            <input className="hidden" type="radio" name="event" id="お誕生日" value="お誕生日" />
                            <label htmlFor="お誕生日">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>お誕生日</span>
                            </label>
                            <input className="hidden" type="radio" name="event" id="おうち記念日" value="おうち記念日" />
                            <label htmlFor="おうち記念日">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>おうち記念日</span>
                            </label>
                            <input className="hidden" type="radio" name="event" id="お正月" value="お正月" />
                            <label htmlFor="お正月">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>お正月</span>
                            </label>
                            <input className="hidden" type="radio" name="event" id="節分" value="節分" />
                            <label htmlFor="節分">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>節分</span>
                            </label>
                            <input className="hidden" type="radio" name="event" id="ひな祭り" value="ひな祭り" />
                            <label htmlFor="ひな祭り">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>ひな祭り</span>
                            </label>
                            <input className="hidden" type="radio" name="event" id="こどもの日" value="こどもの日" />
                            <label htmlFor="こどもの日">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>こどもの日</span>
                            </label>
                            <input className="hidden" type="radio" name="event" id="七夕" value="七夕" />
                            <label htmlFor="七夕">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>七夕</span>
                            </label>
                            <input className="hidden" type="radio" name="event" id="ハロウィン" value="ハロウィン" />
                            <label htmlFor="ハロウィン">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>ハロウィン</span>
                            </label>
                            <input className="hidden" type="radio" name="event" id="クリスマス" value="クリスマス" />
                            <label htmlFor="クリスマス">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>クリスマス</span>
                            </label>
                            <input className="hidden" type="radio" name="event" id="おやつ" value="おやつ" />
                            <label htmlFor="おやつ">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>おやつ</span>
                            </label>
                            <input className="hidden" type="radio" name="event" id="その他" value="その他" />
                            <label htmlFor="その他">
                                <span className={`bg-[#523636] self-center flex justify-center border-[2px] border-[transparent] items-center text-white py-[5px] px-[8px] rounded-[5px] text-[${CardTagSize}]`}>その他</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <input className="bg-[#ffb762] text-white py-[10px] rounded-md text-[13px] px-[20px] font-bold self-center" type="submit" value="作成する" />
            </div>
        </form>
    )
}