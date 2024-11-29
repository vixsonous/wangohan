import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FinishInquiry() {
    return (
        <div className="flex flex-col justify-center items-start gap-[10px]">
            <h1 className="flex justify-center items-center font-bold text-[15px]">お問い合わせが完了しました！
            <img src={'/icons/logo-new.webp'} className="rounded-md h-[auto] left-[15px] w-[50px] relative" width={10000} height={10000} alt="website banner" />
            </h1>
            <span className="w-[100%] text-[7.8px] relative text-left">
            お問い合わせありがとうございます。<br />
            順次対応させていただきますので、恐れ入りますがしばらくお待ちください。
            </span>
            <Link href="/" className="w-[100%] text-[7.8px] text-[#F17503] relative text-left">トップページに戻る→</Link>
        </div>
    )
}