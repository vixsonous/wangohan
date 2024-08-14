'use client';

import { fontSize } from "@/constants/constants";
import Image from "next/image";
import { useState } from "react";

export default function PersonalInfoForm() {

    const [personalInfo, setPersonalInfo] = useState({
        thumbnail: '/recipe-making/pic-background.png',
        lname: '',
        fname: '',
        username: '',
        birthdate: '',
        gender: '',
        occupation: ''
    });

    const [imgKey, setImgKey] = useState(new Date().getTime() * Math.random());

    return (
        <form action="" className="w-[100%] max-w-[100%] sm:max-w-[460px] flex flex-col gap-[10px] items-start pt-[10vw]">
            <div className="flex flex-wrap w-[100%] justify-center gap-[1em]">
                <div className="flex-[0_0_100%] sm:flex-[0_0_50%]">
                    <label htmlFor="recipe-image" className="flex relative justify-center">
                        <Image src={'/recipe-making/3dogs.png'} className="top-[-20.2%] absolute h-[auto] w-[20%] sm:w-[40%] max-w-none rounded-[25px]" width={10000} height={10000}  alt="website banner" />
                        <div className="relative pt-[50%] w-[50%] sm:pt-[100%] sm:w-[100%]">
                            <Image key={imgKey} src={personalInfo.thumbnail} className="h-[100%] w-[100%] top-0 right-0 object-cover absolute rounded-[200px]" width={10000} height={10000}  alt="website banner" />
                        </div>
                        <input onChange={(e) => {
                                if(e.target.files && e.target.files[0]) {
                                    const tempPath = URL.createObjectURL(e.target.files[0]);
                                    setPersonalInfo(prevState => ({...prevState, thumbnail:tempPath}));
                                    setImgKey(new Date().getTime() * Math.random());
                                }
                            }} className="w-[100%] hidden" type="file" name="recipe-image" id="recipe-image" />
                    </label>
                </div>
                <div className="flex-[0_0_100%] flex flex-wrap sm:flex-nowrap sm:flex-col gap-[1rem] w-[100%]">
                    <div className="w-[100%]">
                        <label htmlFor="姓" className={`text-[${fontSize.l2}] font-semibold`}>姓</label>
                        <input value={personalInfo.lname} onChange={(e) => setPersonalInfo(prevState => ({...prevState, lname: e.target.value}))} id="姓" className={`w-[100%] text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} type="text" name="recipe-image" placeholder="姓"  />
                    </div>
                    <div className="w-[100%]">
                        <label htmlFor="名" className={`text-[${fontSize.l2}] font-semibold`}>名</label>
                        <input value={personalInfo.fname} onChange={(e) => setPersonalInfo(prevState => ({...prevState, fname: e.target.value}))} id="codename" className={`w-[100%] text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} type="text" name="recipe-image" placeholder="名"  />
                    </div>
                </div>
            </div>

            <div className="w-[100%]">
                <label htmlFor="ユーザー名" className={`text-[${fontSize.l2}] font-semibold`}>ユーザー名</label>
                <input value={personalInfo.username} onChange={(e) => setPersonalInfo(prevState => ({...prevState, username: e.target.value}))} id="ユーザー名" className={`w-[100%] text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} type="text" name="recipe-image" placeholder="パスワードを入力"  />
            </div>
            <div className="flex flex-wrap justify-between">
                <div className="flex-[0_0_48%]">
                    <label htmlFor="誕生日" className={`text-[${fontSize.l2}] font-semibold`}>誕生日</label>
                    <input id="誕生日" className="w-[100%] text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]" type="date" name="recipe-image" placeholder="メールアドレスを入力" />
                </div>

                <div className="flex-[0_0_48%]">
                    <label htmlFor="性別" className={`text-[${fontSize.l2}] font-semibold`}>性別</label>
                    <input id="性別" className={`w-[100%] text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} type="text" name="recipe-image" placeholder="パスワードを入力"  />
                </div>
            </div>
            <div className="w-[100%]">
                <label htmlFor="職業" className={`text-[${fontSize.l2}] font-semibold`}>職業</label>
                <input id="職業" className={`w-[100%] text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} type="text" name="recipe-image" placeholder="パスワードを入力"  />
            </div>
            
            <input className="w-[100%] bg-[#ffb762] text-white py-[10px] rounded-md text-[12px] sm:text-[16px]" type="submit" value="新規登録" />
        </form>
    )
}