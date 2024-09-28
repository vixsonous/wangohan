'use client';

import { fontSize, SUCC_MSG, textColor, withAlphabetical, withSpecialCharactersAndNumbers } from "@/constants/constants";
import { faCheck, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { SyntheticEvent, useEffect, useState } from "react";

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
        thumbnail: '/recipe-making/pic-background.png',
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

    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [imgKey, setImgKey] = useState(new Date().getTime() * Math.random());

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

    const submitFunc = async (e: SyntheticEvent) => {
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

            await fetch('/api/profile-pic', {
                method: 'POST',
                body: fileSubmit
            }).then(async res => {
                const body = await res.json();
                if(res.status === 200) {
                    formSubmit.set('fileUrl', body.body.fileUrl);
                } else {
                    throw new Error(body.message);
                }
            }).catch(err => {
                setSignup(false);
                setError(prev => ({...prev, generalError: (err as Error).message}))
            });
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

    return (
        <form action="" className="w-[100%] max-w-[100%] sm:max-w-[460px] flex flex-col gap-[10px] items-start pt-[10vw]">
            <div className="flex flex-wrap w-[100%] justify-center gap-[1em]">
                <div className="flex-[0_0_100%] sm:flex-[0_0_50%]">
                    <label htmlFor="recipe-image" className="flex relative justify-center">
                        <img src={'/recipe-making/3dogs.png'} className="top-[-20.2%] absolute h-[auto] w-[20%] sm:w-[40%] max-w-none rounded-[25px]" width={10000} height={10000}  alt="website banner" />
                        <div className="relative pt-[50%] w-[50%] sm:pt-[100%] sm:w-[100%]">
                            <img key={imgKey} src={personalInfo.thumbnail} className="h-[100%] w-[100%] top-0 right-0 object-cover absolute rounded-[200px]" width={10000} height={10000}  alt="website banner" />
                        </div>
                        <input onChange={(e) => {
                                if(e.target.files && e.target.files[0]) {
                                    const tempPath = URL.createObjectURL(e.target.files[0]);
                                    setPersonalInfo(prevState => ({...prevState, thumbnail:tempPath}));
                                    setImgKey(new Date().getTime() * Math.random());
                                    setProfilePic(e.target.files[0]);
                                }
                            }} className="w-[100%] hidden" type="file" name="recipe-image" id="recipe-image" />
                    </label>
                </div>
                <div className="flex-[0_0_100%] flex flex-wrap sm:flex-nowrap sm:flex-col gap-[1rem] w-[100%]">
                    <div className="w-[100%]">
                        <label htmlFor="姓" className={`text-[${fontSize.l2}] font-semibold`}>姓 </label><span className="text-[.5em] sm:text-[.75em] text-[#7f7464] font-semibold text-[#E53935]">{error.lname}</span>
                        <input value={personalInfo.lname} onChange={(e) => setPersonalInfo(prevState => ({...prevState, lname: e.target.value}))} id="姓" className={`w-[100%] text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} type="text" name="last-name" placeholder="姓を入力"  />
                    </div>
                    <div className="w-[100%]">
                        <label htmlFor="名" className={`text-[${fontSize.l2}] font-semibold`}>名 </label><span className="text-[.5em] sm:text-[.75em] text-[#7f7464] font-semibold text-[#E53935]">{error.fname}</span>
                        <input value={personalInfo.fname} onChange={(e) => setPersonalInfo(prevState => ({...prevState, fname: e.target.value}))} id="codename" className={`w-[100%] text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} type="text" name="first-name" placeholder="名を入力"  />
                    </div>
                </div>
            </div>

            <div className="w-[100%]">
                <label htmlFor="ユーザー名" className={`text-[${fontSize.l2}] font-semibold`}>ユーザー名 </label><span className="text-[.5em] sm:text-[.75em] text-[#7f7464] font-semibold text-[#E53935]">{error.codename}</span>
                <input value={personalInfo.codename} onChange={(e) => setPersonalInfo(prevState => ({...prevState, codename: e.target.value}))} id="ユーザー名" className={`w-[100%] text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} type="text" name="codename" placeholder="ユーザー名を入力"  />
            </div>
            <div className="flex flex-wrap justify-between">
                <div className="flex-[0_0_48%]">
                    <label htmlFor="誕生日" className={`text-[${fontSize.l2}] font-semibold`}>誕生日 </label><span className="text-[.5em] sm:text-[.75em] text-[#7f7464] font-semibold text-[#E53935]">{error.birthdate}</span>
                    <input value={personalInfo.birthdate} onChange={(e) => setPersonalInfo(prev => ({...prev, birthdate: e.target.value}))} id="誕生日" className="w-[100%] text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]" type="date" name="birthdate" placeholder="誕生日を入力" />
                </div>

                <div className="flex-[0_0_48%]">
                    <label htmlFor="性別" className={`text-[${fontSize.l2}] font-semibold`}>性別 </label><span className="text-[.5em] sm:text-[.75em] text-[#7f7464] font-semibold text-[#E53935]">{error.gender}</span>
                    <select value={personalInfo.gender} onChange={(e) => setPersonalInfo(prev => ({...prev, gender: e.target.value}))} className={`w-[100%] text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} name="性別" id="性別">
                        <option disabled value="">性別を選択</option>
                        <option value="男性">男性</option>
                        <option value="女性">女性</option>
                        <option value="どちらでもない">どちらでもない</option>
                        <option value="答えない">答えない</option>
                    </select>
                </div>
            </div>
            <div className="w-[100%]">
                <label htmlFor="職業" className={`text-[${fontSize.l2}] font-semibold`}>職業 </label><span className="text-[.5em] sm:text-[.75em] text-[#7f7464] font-semibold text-[#E53935]">{error.occupation}</span>
                <input value={personalInfo.occupation} onChange={(e) => setPersonalInfo(prev => ({...prev, occupation: e.target.value}))} id="職業" className={`w-[100%] text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} type="text" name="recipe-image" placeholder="職業を入力"  />
            </div>
            
            <div className="w-full flex justify-center flex-col items-center gap-[10px]">
                <button disabled={signup} onClick={(e:SyntheticEvent) => submitFunc(e)} className={`w-[100%] bg-[#ffb762] border-[1px] border-[#FFD99A] text-white py-[10px] rounded-md text-[12px] sm:text-[16px] transition-all duration-500`} type="submit">
                    {!signup ? (
                    '新規登録'
                    ): (
                        signupSuccess ? <><span style={{color: textColor.success}}>{SUCC_MSG.SUCCESS1} </span><FontAwesomeIcon icon={faCheck} style={{color: textColor.success}} size="lg"/></> 
                        :<FontAwesomeIcon icon={faCircleNotch} spin size="lg"/>
                    )}
                </button>
                <span className="text-[.5em] sm:text-[.75em] text-[#7f7464] font-semibold text-[#E53935]">{error.generalError}</span>
            </div>
        </form>
    )
}