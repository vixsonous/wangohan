import { Metadata } from "next";
import Image from "next/image";
import RecipeIngredients from "./components/RecipeIngredients";
import RecipeInstructions from "./components/RecipeInstructions";


export const metadata:Metadata = {
    title: 'Create Recipe'
}

export default function RecipeCreate() {
    const CardFontSize = '13px';
    const CardTagSize = '10px';
    
    return(
        <div className="flex flex-col p-[20px] gap-[20px]">
            <div className="flex justify-center items-center relative mt-[10px] mb-[30px]">
                <h1 className="absolute top-[10px] font-semibold text-[#523636]">レシピを書く</h1>
                <Image src={'/icons/ribbon.png'} className="h-[auto] w-[200px] sm:w-[300px] max-w-none" width={10000} height={10000}  alt="ribbon" />
            </div>

            <div className="create-form-container">
                <form action="" className="create-form flex flex-col gap-[30px]">
                    <div className="w-[100%]">
                        <label htmlFor="recipe-title" className="flex">
                            <h1 className="font-semibold text-[20px]">レシピタイトル</h1>
                            <span className="text-[10px] self-center font-semibold">（21文字以内）</span>
                        </label>
                        <input className="w-[100%] p-[7px] text-[13px] bg-[#fff8ef]" placeholder="例）炊飯器で簡単！夏バテでも食べられるご飯" type="text" name="recipe-title" id="recipe-title" />
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

                    <RecipeIngredients />
                    <RecipeInstructions />
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
            </div>
        </div>
    )
}