import { Metadata } from "next"
import Image from "next/image"
import { Inter } from 'next/font/google'
import SignUpForm from "./SignUpForm"

export const metadata:Metadata = {
    title: "Sign Up"
}

const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false })

export default function SignUp() {
    return (
        <div className={`flex flex-col px-[50px] py-[30px] gap-[10px] justify-center items-center ${inter.className}`}>
            <h1 className="font-bold text-[20px] sm:text-[24px] text-[#6b4528]">新規登録</h1>
            <h1 className="text-[8px] sm:text-[12px] mt-[20px] font-bold text-[#6b4528]">メールアドレスで新規登録</h1>
            <SignUpForm />
        </div>
    )
}