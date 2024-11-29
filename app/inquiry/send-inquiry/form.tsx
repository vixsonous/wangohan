'use client';
import { useState } from "react";

export default function SendInquiryForm() {

    const [name, setName] = useState('');
    return (
        <form action="" className="w-[100%] md:max-w-[70%] flex flex-col gap-[10px] mt-[30px] items-center">
            <div className="w-[100%]">
                <label htmlFor="recipe-title" className="flex">
                    <h1 className="font-semibold text-[13px]">お名前</h1>
                </label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-[100%] rounded-md border-[2px] border-solid border-[#ffcd92] text-[13px] px-[10px] py-[5px] bg-[#fff8ef]" type="text" name="recipe-title" id="recipe-title" />
            </div>

            <div className="w-[100%]">
                <label htmlFor="recipe-title" className="flex">
                    <h1 className="font-semibold text-[13px]">メールアドレス</h1>
                </label>
                <input className="w-[100%] rounded-md border-[2px] border-solid border-[#ffcd92] text-[13px] px-[10px] py-[5px] bg-[#fff8ef]" type="text" name="recipe-title" id="recipe-title" />
            </div>

            <div className="w-[100%] mt-[30px]">
                <label htmlFor="recipe-title" className="flex">
                    <h1 className="font-semibold text-[13px]">お問い合わせ内容</h1>
                </label>
                <select name="" id="" className="w-[100%] rounded-md border-[2px] border-solid border-[#ffcd92] text-[13px] px-[10px] py-[5px] bg-[#fff8ef]">
                    <option value="">ー</option>
                    <option value="レシピに関して">レシピに関して</option>
                    <option value="ユーザーに関して">ユーザーに関して</option>
                    <option value="通報＆報告">通報＆報告</option>
                    <option value="その他">その他</option>
                </select>
            </div>

            <div className="w-[100%]">
                <label htmlFor="recipe-title" className="flex">
                    <h1 className="font-semibold text-[13px]">お問い合わせタイトル</h1>
                </label>
                <input className="w-[100%] rounded-md border-[2px] border-solid border-[#ffcd92] text-[13px] px-[10px] py-[5px] bg-[#fff8ef]" type="text" name="recipe-title" id="recipe-title" />
            </div>

            <div className="w-[100%]">
                <label htmlFor="recipe-title" className="flex">
                    <h1 className="font-semibold text-[13px]">内容</h1>
                </label>
                <textarea className="w-[100%] rounded-md border-[2px] border-solid border-[#ffcd92] text-[13px] px-[10px] py-[5px] bg-[#fff8ef]" rows={5} name="recipe-title" id="recipe-title" />
                <span className="text-[10px] text-[#7f7464] font-semibold relative top-[-10px]">お問い合わせ内容の詳細を記入してください。</span>
            </div>
                        
            <input className="bg-[#ffb762] text-white rounded-md text-[13px] px-[30px] py-[5px]" type="submit" value="送信" />
            
            <span className="mt-[30px] text-[10px] text-[#FF0000] relative">＊ご返答には2.3日ほど要します。休日を挟んでのお問い合わせは営業時間再開後、順次対応させていただきます。</span>
            <span className="text-[10px] text-[#FF0000] relative top-[-10px]">＊メールアドレスが間違っている場合、ご返答することができませんので送信前に再度ご確認のほどよろしくお願いいたします。</span>
        </form>
    )
}