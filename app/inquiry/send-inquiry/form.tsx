'use client';
import { POPUPTIME } from "@/constants/constants";
import { useAppDispatch } from "@/lib/redux/hooks";
import { hideSuccess, showSuccess } from "@/lib/redux/states/messageSlice";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

export default function SendInquiryForm() {

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
      name: '',
      title: '',
      email: '',
      type: '',
      message: ''
    });

    const inputOnChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const t = e.currentTarget;
      const n = t.name;
      setState(prev => ({...prev, [n] : t.value}));
    }

    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      
      setLoading(true);
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
      });
      setLoading(false);
      dispatch(showSuccess("Successfully Sent!"));
      setTimeout(() => {
        dispatch(hideSuccess());
      },POPUPTIME);
    }

    return (
        <form action="" className="w-[100%] md:max-w-[70%] flex flex-col gap-[10px] mt-[30px] items-center">
            <div className="w-[100%]">
                <label htmlFor="name" className="flex">
                    <h1 className="font-semibold text-[13px]">お名前</h1>
                </label>
                <input name="name" value={state.name} onChange={inputOnChange} className="w-[100%] rounded-md border-[2px] border-solid border-[#ffcd92] text-[13px] px-[10px] py-[5px] bg-[#fff8ef]" type="text" id="recipe-title" />
            </div>

            <div className="w-[100%]">
                <label htmlFor="email" className="flex">
                    <h1 className="font-semibold text-[13px]">メールアドレス</h1>
                </label>
                <input value={state.email} onChange={inputOnChange} name="email" className="w-[100%] rounded-md border-[2px] border-solid border-[#ffcd92] text-[13px] px-[10px] py-[5px] bg-[#fff8ef]" type="text" id="recipe-title" />
            </div>

            <div className="w-[100%] mt-[30px]">
                <label htmlFor="type" className="flex">
                    <h1 className="font-semibold text-[13px]">お問い合わせ内容</h1>
                </label>
                <select value={state.type} onChange={inputOnChange} name="type" id="" className="w-[100%] rounded-md border-[2px] border-solid border-[#ffcd92] text-[13px] px-[10px] py-[5px] bg-[#fff8ef]">
                    <option value="">ー</option>
                    <option value="レシピに関して">レシピに関して</option>
                    <option value="ユーザーに関して">ユーザーに関して</option>
                    <option value="通報＆報告">通報＆報告</option>
                    <option value="その他">その他</option>
                </select>
            </div>

            <div className="w-[100%]">
                <label htmlFor="title" className="flex">
                    <h1 className="font-semibold text-[13px]">お問い合わせタイトル</h1>
                </label>
                <input value={state.title} onChange={inputOnChange} name="title" className="w-[100%] rounded-md border-[2px] border-solid border-[#ffcd92] text-[13px] px-[10px] py-[5px] bg-[#fff8ef]" type="text" id="recipe-title" />
            </div>

            <div className="w-[100%]">
                <label htmlFor="message" className="flex">
                    <h1 className="font-semibold text-[13px]">内容</h1>
                </label>
                <textarea value={state.message} onChange={inputOnChange} name="message" className="w-[100%] rounded-md border-[2px] border-solid border-[#ffcd92] text-[13px] px-[10px] py-[5px] bg-[#fff8ef]" rows={5} id="recipe-title" />
                <span className="text-[10px] text-[#7f7464] font-semibold relative top-[-10px]">お問い合わせ内容の詳細を記入してください。</span>
            </div>

            <button disabled={loading} onClick={handleSubmit} className="bg-[#ffb762] flex items-center justify-center gap-2 text-white rounded-md text-[13px] px-[30px] py-[5px]" >
              {loading && <CircleNotch size={20} className="animate-spin"/>}
              送信
            </button>
            
            <span className="mt-[30px] text-[10px] text-[#FF0000] relative">＊ご返答には2.3日ほど要します。休日を挟んでのお問い合わせは営業時間再開後、順次対応させていただきます。</span>
            <span className="text-[10px] text-[#FF0000] relative top-[-10px]">＊メールアドレスが間違っている場合、ご返答することができませんので送信前に再度ご確認のほどよろしくお願いいたします。</span>
        </form>
    )
}