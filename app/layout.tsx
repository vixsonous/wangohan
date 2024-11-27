import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local';
import Link from "next/link";
import {GoogleOAuthProvider } from '@react-oauth/google';
import { config } from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import StoreProvider from "./StoreProvide";
import { getDecryptedSession } from "@/action/lib";
import { getUserDetails } from "@/action/users";
import React from "react";
import Modal from "./components/ElementComponents/Modal";
import MainSearchForm from "./components/MainSearchForm";
import BarMainSearch from "./components/ElementComponents/BarMainSearch";

const ErrorModal = React.lazy(() => import("./components/ElementComponents/ErrorModal"));
const SuccessModal = React.lazy(() => import("./components/ElementComponents/SuccessModal"));
const CreateRecipeComponent = React.lazy(() => import("./components/CreateRecipeComponent"));
const UserSetter = React.lazy(() => import("./components/UserSetter"));
const LayoutSettings = React.lazy(() => import("./components/LayoutSettings"));

config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });
const myFont = localFont({src: "./mitimasu.ttf"});

export const metadata:Metadata = {
  title: {
    template: '%s | わんごはん | 愛犬のための手作りごはんレシピサイト',
    default: "わんごはん | 愛犬のための手作りごはんレシピサイト"
  },
  keywords: ["愛犬のための手作りごはんレシピサイト","わんごはん","Wangohan", "Dog food", "Pet food", "Pets", "Inu"],
  creator: "Victor Chiong",
  description: "Web for WanWan"
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const decryptedSession = await getDecryptedSession();
  
  const user = {
    user_id: 0,
    user_image: '',
    user_codename: ''
  };

  if(decryptedSession) {
    const user_details = await getUserDetails(decryptedSession.user.user_id);
    user.user_id= user_details.user_id,
    user.user_image= user_details.user_image !== '' ? user_details.user_image : '/icons/user.webp',
    user.user_codename= user_details.user_codename
    
  }

  const isLoggedIn = decryptedSession ? true : false;

  return (
    <StoreProvider count={0}>
      {
        decryptedSession ? <UserSetter user={user} /> : null
      }
      <GoogleOAuthProvider clientId={String(process.env.GOOGLE_AUTH_CLIENT_ID)}>
        <html lang="en">
          <body className={`${inter.className} bg-[#FFE9C9] h-full min-h-[100vh] flex flex-col text-[#523636]`}>
            <ErrorModal />
            <SuccessModal />
            <div className="fixed px-4 w-full z-[999] pt-[5px] flex items-center border-b-[1px] gap-2 shadow-md">
              <div className='flex flex-row gap-4 w-full items-center'>
                <Link href="/"><img className="w-[60px] h-[auto]" src={'/logo-final.webp'} width={100} height={100} alt="website logo" /></Link>
                <BarMainSearch />
              </div>
              <LayoutSettings user_id={user.user_id} isLoggedIn={isLoggedIn}/>
              <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-[#FFFAF0] opacity-[0.9] z-[-1]"></div>
            </div>
            
            {isLoggedIn && <CreateRecipeComponent />}
            <div className={`pt-[65.68px] min-h-screen ${myFont.className} flex grow justify-center`}>
              <div className='w-screen max-w-xl'>{children}</div>
            </div>
            <div className="footer mt-[100px]">
              <div className="border-[1px] border-black overflow-hidden " />
              <div className="relative bg-[url('/LP/last.webp')]  bg-contain bg-no-repeat bg-bottom pb-[20vw]">
                <div className="grid grid-cols-12 p-4">
                  <div className="col-span-6 md:col-span-6 ">
                    <div className="flex flex-col justify-center items-center w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-[40px] h-[40px]" viewBox="0 0 50 50">
                        <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                      </svg>
                      <h1 className="text-[13px] font-bold text-[#523636]">Instagramをフォロー</h1>
                      <span className="text-[10px] font-bold text-[#523636]">あなたのレシピがシェア</span>
                      <span className="text-[10px] font-bold text-[#523636]">されるかも？！</span>
                    </div>
                  </div>
                  <div className="col-span-6 flex flex-wrap md:grid grid-cols-3 md:col-span-6 gap-2 gap-y-2 md:gap-4 justify-between items-center self-center w-[100%]">
                    <Link href="/inquiry/terms-of-service" className="text-[8px] md:text-xs self-center flex">利用規約</Link>
                    <Link href="/inquiry/disclaimer" className="text-[8px] md:text-xs self-center flex">免責事項</Link>
                    <Link href="/inquiry/privacy-policy" className="text-[8px] md:text-xs self-center flex">プライバシーポリシー</Link>
                    <Link href="/user" className="text-[8px] md:text-xs self-center flex">Myページ</Link>
                    <Link href="/" className="text-[8px] md:text-xs self-center flex">HOME</Link>
                    <Link href="/inquiry/send-inquiry" className="text-[8px] md:text-xs self-center flex">ご意見・お問い合わせ</Link>
                  </div>
                </div>
                <h1 className="w-[100%] flex justify-center relative top-[30px] md:bottom-0 text-[10px] md:text-sm">@Web5Dimensional</h1>
              </div>
            </div>
          </body>
        </html>
      </GoogleOAuthProvider>
    </StoreProvider>
  );
}
