import { Inter } from "next/font/google"
import Image from "next/image"
import PersonalInfoForm from "./PersonalInfoForm"
import { cookies } from "next/headers";

const inter = Inter({ subsets: ['latin'] })

export default function PersonalInfo() {

    const docCookies = cookies();
    const registrationInfo = docCookies.get('registrationInfo');
    const info = registrationInfo ? JSON.parse(String(registrationInfo.value)) : undefined;
    return (
        <div className={`flex flex-col px-[50px] py-[30px] gap-[10px] justify-center items-center ${inter.className}`}>
            <div className="flex justify-center items-center relative">
                <h1 className="absolute top-[10px] font-semibold text-[#523636]">新規登録</h1>
                <Image src={'/icons/ribbon.png'} className="h-[auto] w-[200px] sm:w-[300px] max-w-none" width={10000} height={10000}  alt="website banner" />
            </div>
            <h1 className="text-[8px] sm:text-[12px] mt-[20px] font-bold">メールアドレスで新規登録</h1>
            <PersonalInfoForm info={info || undefined}/>
        </div>
    )
}