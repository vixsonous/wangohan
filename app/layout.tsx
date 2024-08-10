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
  const user = cookiesStore.get('currentUser');

  if(!user) {
    console.log("no exist");
  } else {
    console.log('exist');
  }

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FFE9C9]`}>
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
        <div className={`pt-[65.68px] overflow-x-hidden ${myFont.className}`}>
          
          {children}
        </div>
      </body>
    </html>
  );
}
