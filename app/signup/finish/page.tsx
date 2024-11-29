import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Timer from "./Timer";

const inter = Inter({ subsets: ['latin'] });

export default function FinishSignup() {
    return (
        <div className={`flex flex-col px-[45px] py-[30px] md:p-[0px] gap-[10px] justify-center items-center ${inter.className}`}>
            <div className="flex flex-col justify-center items-start gap-[10px]">
                <h1 className="flex justify-center items-center font-bold text-[15px]">新規登録が完了しました！
                <img src={'/icons/logo-new.webp'} className="rounded-md h-[auto] left-[15px] w-[50px] relative" width={10000} height={10000} alt="website banner" />
                </h1>
                <span className="w-[100%] text-[7.8px] relative text-left">
                数秒でトップページへ自動移動します。<br />
                移動しない場合は、お手数ですが下記の「トップページに戻る」を押してください。
                </span>
                <Link href="/" className="w-[100%] text-[7.8px] text-[#F17503] relative text-left">トップページに戻る→</Link>
                <Timer />
            </div>
        </div>
    )
}