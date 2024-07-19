import { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata:Metadata = {
    title: "Login"
}

const inter = Inter({ subsets: ['latin'] })

export default function InquiryLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className={`flex flex-col px-[45px] py-[30px] md:p-[0px] gap-[10px] justify-center items-center ${inter.className}`}>
            {children}
        </div>
    )
  }