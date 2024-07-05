import { Metadata } from "next";
import Image from "next/image";
import RecipeIngredients from "./components/RecipeIngredients";
import RecipeInstructions from "./components/RecipeInstructions";


export const metadata:Metadata = {
    title: 'Create Recipe'
}

export default function RecipeCreate() {
    const CardFontSize = '13px';
    const CardTagSize = '13px';
    
    return(
        <div className="flex flex-col p-[20px] gap-[20px]">
            <div className="flex justify-center items-center relative">
                <h1 className="absolute top-[10px] font-semibold text-[#523636]">レシピを書く</h1>
                <Image src={'/icons/ribbon.png'} className="h-[auto] w-[200px] sm:w-[300px] max-w-none" width={10000} height={10000}  alt="website banner" />
            </div>

            <div className="create-form-container">
                <form action="" className="create-form flex flex-col gap-[10px]">
                    <div className="w-[100%]">
                        <label htmlFor="recipe-title" className="flex">
                            <h1 className="font-semibold text-[20px]">レシピタイトル</h1>
                            <span className="text-[10px] self-center font-semibold">（21文字以内）</span>
                        </label>
                        <input className="w-[100%] p-[10px] text-[10px] bg-[#fff8ef]" placeholder="例）炊飯器で簡単！夏バテでも食べられるご飯" type="text" name="recipe-title" id="recipe-title" />
                    </div>

                    <div className="w-[100%]">
                        <label htmlFor="recipe-title" className="flex">
                            <h1 className="font-semibold text-[20px]">レシピの説明</h1>
                        </label>
                        <textarea className="w-[100%] p-[10px] text-[10px] bg-[#fff8ef]" placeholder="レシピに説明をしてください例）愛犬が夏バテでなかなかご飯を食べなかったので、お魚ベースの手作りごはんを作りました。たくさん食べてくれたので是非作ってみてください。" rows={5}name="recipe-title" id="recipe-title" />
                    </div>

                    <div className="[100%]">
                        <label htmlFor="recipe-title" className="flex">
                            <h1 className="font-semibold text-[20px]">レシピの説明</h1>
                        </label>
                        <input className="w-[100%]" type="file" name="recipe-image" id="recipe-image" />
                    </div>

                    <RecipeIngredients />
                    <RecipeInstructions />
                    <div className="">
                        <label htmlFor="recipe-title" className="flex">
                            <h1 className="font-semibold text-[20px]">カテゴリー</h1>
                        </label>
                        <div className="flex flex-wrap">
                            <div className={`mt-[15px] w-[50%] flex flex-col gap-[5px] flex-wrap `}>
                                <span className="text-[13px]">年齢を選択</span>
                                <div className="flex gap-[5px] flex-wrap items-center">
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>子犬</span>
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>成犬</span>
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>シニア犬</span>
                                </div>
                            </div>
                            <div className={`mt-[15px] w-[50%] flex flex-col gap-[5px] flex-wrap `}>
                                <span className="text-[13px]">サイズを選択</span>
                                <div className="flex gap-[5px] flex-wrap items-center">
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>小型犬</span>
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>中型犬</span>
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>大型犬</span>
                                </div>
                            </div>
                            <div className={`mt-[15px] w-[100%] flex flex-col gap-[5px] flex-wrap `}>
                                <span className="text-[13px]">イベントを選択</span>
                                <div className="flex gap-[5px] flex-wrap items-center">
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>お誕生日</span>
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>おうち記念日</span>
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>お正月</span>
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>節分</span>
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>ひな祭り</span>
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>こどもの日</span>
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>七夕</span>
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>ハロウィン</span>
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>クリスマス</span>
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>おやつ</span>
                                    <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>その他</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}