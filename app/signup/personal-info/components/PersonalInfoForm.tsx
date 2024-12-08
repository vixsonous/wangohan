'use client';

import InputLoading from "@/app/components/ElementComponents/InputLoading";
import ErrorSpan from "@/app/components/TextComponents/ErrorSpan";
import { fontSize, SUCC_MSG, textColor, withAlphabetical, withSpecialCharactersAndNumbers } from "@/constants/constants";
import { Check, CircleNotch } from "@phosphor-icons/react/dist/ssr";
import React, { useCallback, useEffect, useState } from "react";
import heic2any from 'heic2any';

type InfoType = {
    fname: string,
    lname: string,
    user_image: string,
    codename: string
}

interface Info {
    info: InfoType
}

const errorObj = {
    lname: '苗字を記入してください',
    fname: '名前を記入してください',
    codename: 'ユーザーネームを記入してください',
    birthdate: '誕生日を選択してください',
    gender: '性別を選択してください',
    occupation: '職業を記入してください'
}

export default function PersonalInfoForm({info} : Info) {

    const [personalInfo, setPersonalInfo] = useState({
        thumbnail: '/recipe-making/pic-background.webp',
        lname: '',
        fname: '',
        codename: '',
        birthdate: '',
        gender: '',
        occupation: ''
    });

    const [error, setError] = useState({
        lname: '',
        fname: '',
        codename: '',
        birthdate: '',
        gender: '',
        occupation: '',
        generalError: ''
    });

    const [signup, setSignup] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [upload, setUpload] = useState(false);

    const [profilePic, setProfilePic] = useState<File | null>(null);

    const validateInputs = () => {
        
        let validation = true;

        Object.keys(personalInfo).forEach((key, idx) => {
            if(key === 'thumbnail') return;

            if(personalInfo[key as keyof typeof personalInfo]) {
                let err = error;
                err[key as keyof typeof error] = '';
                setError({...err});
            }
            
            if(withSpecialCharactersAndNumbers(personalInfo[key as keyof typeof personalInfo]) && key !== 'birthdate') {
                let err = error;
                err[key as keyof typeof error] = '特殊文字や数字が含まれています';
                setError({...err});
            }

            if(withAlphabetical(personalInfo[key as keyof typeof personalInfo]) && (key === 'fname' || key === 'lname')) {
                let err = error;
                err[key as keyof typeof error] = '英数字が含まれています';
                setError({...err});
            }

            if(!personalInfo[key as keyof typeof personalInfo]) {
                let err = error;
                err[key as keyof typeof error] = errorObj[key as keyof typeof errorObj];
                setError({...err});
            }
        });

        if(error.lname || error.fname || error.codename || error.birthdate || error.gender || error.occupation) {
            validation = false;
        }

        return validation;
    }

    const submitFunc = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!validateInputs()) return;

        const formSubmit = new FormData();
        formSubmit.append('lname', personalInfo.lname);
        formSubmit.append('fname', personalInfo.fname);
        formSubmit.append('codename', personalInfo.codename);
        formSubmit.append('birthdate', personalInfo.birthdate);
        formSubmit.append('gender', personalInfo.gender);
        formSubmit.append('occupation', personalInfo.occupation);
        formSubmit.set('fileUrl', '');

        setSignup(true);
        const fileSubmit = new FormData();

        if(profilePic) {
            fileSubmit.append('file', profilePic, profilePic?.name);

            const res = await fetch('/api/profile-pic', {
                method: 'POST',
                body: fileSubmit
            }).then(async res => {
                const body = await res.json();
                if(res.status === 200) {
                    formSubmit.set('fileUrl', body.body.fileUrl);

                    return true;
                } else {
                    throw new Error(body.message);
                }
            }).catch(err => {
                setSignup(false);
                setError(prev => ({...prev, generalError: (err as Error).message}));

                return false;
            });

            if(!res) return;
        }
        

        await fetch('/api/personalInfo',{
            method: 'POST',
            body: formSubmit,
        }).then( async res => {
            if(res.status === 200) {
                setSignupSuccess(true);
                window.location.href = '/signup/finish';
            }else if(res.status === 302) {
                setSignupSuccess(true);
                window.location.href = res.url;
            } else if(res.status === 500) {
                let response = await res.json().then(res => res);
                throw new Error(response.message);
            }
        })
        .catch(err => {
            setSignup(false);
            setError(prev => ({...prev, generalError: (err as Error).message}))
        })
    }

    useEffect(() => {
        if(info) {
            setPersonalInfo(prev => ({...prev, fname: info.fname, lname: info.lname, thumbnail: info.user_image, codename: info.codename}));
        }

        if(info && info.user_image !== '') {

            const fetchImage = async (image: string) => {
                await fetch(image).then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], 'image.jpg', {type: 'image/jpeg'});
                    setProfilePic(file);
                })
                .catch(err => setError(prev => ({...prev, generalError: (err as Error).message})));
            }

            fetchImage(info.user_image);
        }
    }, [info]);

    const onFileChange = useCallback(async (e:React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      if(!e.target.files || !e.target.files[0]) return;

      const fileName = e.target.files[0].name;
      const fileNameExt = fileName.substring(fileName.lastIndexOf('.') + 1);

      if(typeof window !== 'undefined' && (fileNameExt.toLowerCase() === "heic" || fileNameExt.toLowerCase() === "heif")) {
        setUpload(true);
        const image = await heic2any({
          blob: e.target.files[0],
          toType: 'image/webp',
          quality: 0.8
        });
        setUpload(false);

        const b = !Array.isArray(image) ? [image] : image;

        const f = new File(b, fileName);
        setPicture(f);
      } else {
        setPicture(e.target.files[0]);
      }
      
    },[]);

    const setPicture = useCallback((file: File) => {
      const tempPath = URL.createObjectURL(file);
      setPersonalInfo(prevState => ({...prevState, thumbnail:tempPath}));
      setProfilePic(file);
    },[]);

    const changePersonalInfo = useCallback((e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      e.preventDefault();

      const t = e.currentTarget;
      const name = t.name;

      setPersonalInfo(prevState => ({...prevState, [name]: t.value}))
    },[]);

    return (
        <form action="" className="w-full max-w-full sm:max-w-[460px] flex flex-col gap-[10px] items-start pt-[10vw]">
            <div className="flex flex-wrap w-full justify-center gap-[1em]">
                <div className="flex-[0_0_100%] sm:flex-[0_0_50%]">
                    <label htmlFor="personal-image" className="flex relative items-center justify-center">
                        <img src={'/recipe-making/3dogs.webp'} className="top-[-20.2%] absolute h-[auto] w-[20%] sm:w-[40%] max-w-none rounded-[25px]" width={100} height={100}  alt="website banner" />
                        {
                          upload && (
                            <div className="absolute z-10 flex justify-center gap-2 items-center">
                              <CircleNotch size={20} className="animate-spin"/>
                              <span>アップロード中...</span>
                            </div>
                          )
                        }
                        <div className="relative pt-[50%] w-[50%] sm:pt-[100%] sm:w-full">
                            <img src={personalInfo.thumbnail} className="h-full w-full top-0 right-0 object-cover absolute rounded-[200px]" width={100} height={100}  alt="website banner" />
                        </div>
                        <input disabled={upload} onChange={onFileChange} className="hidden" type="file" name="personal-image" id="personal-image" />
                    </label>
                </div>
                <div className="flex-[0_0_100%] flex flex-wrap sm:flex-nowrap sm:flex-col gap-[1rem] w-full">
                    <div className="w-full">
                        <label htmlFor="lname" className={`text-[${fontSize.l2}] font-semibold`}>姓 </label><ErrorSpan>{error.lname}</ErrorSpan>
                        <input 
                          value={personalInfo.lname} 
                          onChange={changePersonalInfo} 
                          id="lname" 
                          className={`w-full text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} 
                          type="text" 
                          name="lname" 
                          placeholder="姓を入力"  
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="fname" className={`text-[${fontSize.l2}] font-semibold`}>名 </label><ErrorSpan>{error.fname}</ErrorSpan>
                        <input 
                          value={personalInfo.fname} 
                          onChange={changePersonalInfo} 
                          id="fname" 
                          className={`w-full text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} 
                          type="text" 
                          name="fname" 
                          placeholder="名を入力"  
                        />
                    </div>
                </div>
            </div>

            <div className="w-full">
                <label htmlFor="codename" className={`text-[${fontSize.l2}] font-semibold`}>ユーザー名 </label><ErrorSpan>{error.codename}</ErrorSpan>
                <input 
                  value={personalInfo.codename} 
                  onChange={changePersonalInfo} 
                  id="codename" 
                  className={`w-full text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} 
                  type="text" 
                  name="codename" 
                  placeholder="ユーザー名を入力"  
                />
            </div>
            <div className="flex flex-wrap justify-between">
                <div className="flex-[0_0_48%]">
                    <label htmlFor="birthdate" className={`text-[${fontSize.l2}] font-semibold`}>誕生日 </label><ErrorSpan>{error.birthdate}</ErrorSpan>
                    <input 
                      value={personalInfo.birthdate} 
                      onChange={changePersonalInfo} 
                      id="birthdate" 
                      className="w-full text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]" 
                      type="date" 
                      name="birthdate" 
                      placeholder="誕生日を入力"
                    />
                </div>

                <div className="flex-[0_0_48%]">
                    <label htmlFor="gender" className={`text-[${fontSize.l2}] font-semibold`}>性別 </label><ErrorSpan>{error.gender}</ErrorSpan>
                    <select value={personalInfo.gender} onChange={changePersonalInfo} className={`w-full text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} name="gender" id="gender">
                        <option disabled value="">性別を選択</option>
                        <option value="男性">男性</option>
                        <option value="女性">女性</option>
                        <option value="どちらでもない">どちらでもない</option>
                        <option value="答えない">答えない</option>
                    </select>
                </div>
            </div>
            <div className="w-full">
                <label htmlFor="occupation" className={`text-[${fontSize.l2}] font-semibold`}>職業 </label><ErrorSpan>{error.occupation}</ErrorSpan>
                <input value={personalInfo.occupation} onChange={changePersonalInfo} id="occupation" className={`w-full text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} type="text" name="occupation" placeholder="職業を入力"  />
            </div>
            
            <div className="w-full flex justify-center flex-col items-center gap-[10px]">
                <button disabled={signup} onClick={submitFunc} className={`w-full h-12 bg-[#ffb762] border-[1px] border-[#FFD99A] text-white py-[10px] rounded-md text-[12px] sm:text-[16px] transition-all duration-500`} type="submit">
                    {!signup ? (
                    '新規登録'
                    ): (
                        signupSuccess ? <div className="w-full flex justify-center items-center"><span style={{color: textColor.success}}>{SUCC_MSG.SUCCESS1} </span><Check size={20}/></div> 
                        :<InputLoading />
                    )}
                </button>
                <ErrorSpan>{error.generalError}</ErrorSpan>
            </div>
        </form>
    )
}