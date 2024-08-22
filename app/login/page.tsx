import { Metadata } from "next"
import Image from "next/image"
import { Inter } from 'next/font/google'
import Link from "next/link"
import { SyntheticEvent } from "react"
import LoginForm from "./LoginForm"
import { GoogleLogin } from "@react-oauth/google"

export const metadata:Metadata = {
    title: "Login"
}

const inter = Inter({ subsets: ['latin'] })

export default function Login() {

    return (
        <div className={`flex flex-col px-[50px] py-[30px] gap-[10px] justify-center items-center ${inter.className}`}>
            <h1 className="font-bold text-[20px] sm:text-[24px] text-[#6b4528]">ログイン</h1>
            <LoginForm />
        </div>
    )
}