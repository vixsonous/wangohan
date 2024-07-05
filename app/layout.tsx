import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata:Metadata = {
  title: {
    template: '%s | Wangohan',
    default: "Wangohan"
  },
  keywords: ["Wangohan", "Dog food", "Pet food", "Pets", "Inu"],
  creator: "Victor Chiong",
  description: "Web for WanWan"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FFE9C9] overflow-x-hidden`}>
        <div className="px-[20px] w-[100%] z-[999] fixed bg-[#fefefe] pt-[5px] flex justify-between items-center border-b-[1px] border-[#523636]">
          <Image className="w-[70px] h-[auto]" src={'/wangohan_logo.png'} width={100} height={100} alt="website logo" />
          <div className={'menu flex gap-[1rem]'}>
            <div className="self-center">
              <Image src={'/icons/notification.png'} className="self-center rounded-md h-[auto] w-[40px] relative" width={10000} height={10000}  alt="website banner" />
            </div>
            <div className="self-center">
              <Image src={'/icons/bone.png'} className="self-center rounded-md h-[auto] w-[50px] relative" width={10000} height={10000}  alt="website banner" />
            </div>
          </div>
        </div>
        <div className="pt-[65.68px] overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
