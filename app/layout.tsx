import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import localFont from 'next/font/local';
import Link from "next/link";
import Settings from "./components/Settings";
import { createContext, useContext } from "react";
import { GlobalValueContext } from "./components/global-context";
import { getUsers } from "@/action/users";
import { cookies } from "next/headers";
import User from "./components/User";
import { randomBytes } from "crypto";

const inter = Inter({ subsets: ["latin"] });
const myFont = localFont({src: "./mitimasu.ttf"});

export const metadata:Metadata = {
  title: {
    template: '%s | Wangohan',
    default: "Wangohan"
  },
  keywords: ["Wangohan", "Dog food", "Pet food", "Pets", "Inu"],
  creator: "Victor Chiong",
  description: "Web for WanWan"
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const cookiesStore = cookies();
  const user = cookiesStore.get('session');

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FFE9C9] h-full min-h-[100vh] flex flex-col`}>
        <div className="px-[20px] w-[100%] z-[999] fixed bg-[#FFFAF0] pt-[5px] flex justify-between items-center border-b-[1px] opacity-[0.9] shadow-md">
          <Link href="/"><Image className="w-[60px] h-[auto]" src={'/logo-final.png'} width={100} height={100} alt="website logo" /></Link>
          {
            user ? (
              <div className={'menu flex gap-[1rem]'}>
                <div className="self-center">
                  <Image src={'/icons/notification.png'} className="self-center rounded-md h-[auto] w-[40px] relative" width={10000} height={10000}  alt="website banner" />
                </div>
                <div className="self-center">
                  <Settings />
                </div>
              </div>
            ):(
              <div>
                <User />
              </div>
            )
          }
        </div>
        <div className={`pt-[65.68px] overflow-hidden ${myFont.className} grow`}>
          {children}
        </div>

        <div className="footer mt-[100px]">
          <div className="border-[1px] border-black overflow-hidden " />
          <div className="relative bg-[url('/LP/last.png')]  bg-contain bg-no-repeat bg-bottom pb-[20vw]">
            <div className="flex items-center p-[20px]">
              <div className="flex flex-col justify-center self-center items-start gap-[5px] w-[50%]">
                <div className="flex flex-col justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-[40px] h-[40px]" viewBox="0 0 50 50">
                    <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                  </svg>
                  <h1 className="text-[13px] font-bold text-[#523636]">Instagramをフォロー</h1>
                  <span className="text-[10px] font-bold text-[#523636]">あなたのレシピがシェア</span>
                  <span className="text-[10px] font-bold text-[#523636]">されるかも？！</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-[10px] justify-between items-center h-[100%] self-center w-[50%]">
                <Link href="/inquiry/terms-of-service" className="text-[8px] self-center flex">利用規約</Link>
                <Link href="/inquiry/disclaimer" className="text-[8px] self-center flex">免責事項</Link>
                <Link href="/inquiry/privacy-policy" className="text-[8px] self-center flex">プライバシーポリシー</Link>
                <Link href="/user" className="text-[8px] self-center flex">Myページ</Link>
                <Link href="/" className="text-[8px] self-center flex">HOME</Link>
                <Link href="/inquiry/send-inquiry" className="text-[8px] self-center flex">ご意見・お問い合わせ</Link>
              </div>
            </div>
            {/* <Image src={'/LP/last.png'} className="rounded-md w-[100vw] h-[auto] absolute bottom-[-70px] left-[-20px] inline max-w-none object-fill" width={10000} height={10000}  alt="website banner" /> */}
            <h1 className="w-[100%] flex justify-center relative top-[30px] text-[10px]">@Web5Dimensional</h1>
          </div>
        </div>

        
        
      </body>
    </html>
  );
}
