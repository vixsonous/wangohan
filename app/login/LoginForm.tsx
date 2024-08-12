'use client';
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function LoginForm() {

    const [credentials, setCredentials] = useState({
        email:'',
        password: ''
    });

    const [error, setError] = useState('');

    const [login, setLogin] = useState(false);

    const loginFunc = async (e:SyntheticEvent) => {
        e.preventDefault();
        setLogin(true);
        const login = await fetch('/api/login',{
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {'Content-type' : 'application/json'}
        })
        .then(async res => {
            
            setLogin(false);
            if(res.status === 200) {
                window.location.href = '/';
            }else if(res.status === 302) {
                window.location.href = res.url;
            } else if(res.status === 500) {
                let response = await res.json().then(res => res);
                throw new Error(response.message);
            }
        })
        .catch(_e => {
            let message = (_e as Error).message;
            setError(message);
        });
    }

    return (
        <form action="" className={`w-[100%] max-w-[100%] sm:max-w-[460px] flex flex-col gap-[10px] items-center ${inter.className}`}>
            <input value={credentials.email} onChange={(e) => setCredentials(prevCred => ({...prevCred, email: e.target.value}))} className="w-[100%] text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]" type="email" name="email" placeholder="メールアドレスを入力" id="recipe-image" />
            <input value={credentials.password} onChange={(e) => setCredentials(prevCred => ({...prevCred, password: e.target.value}))} className={`w-[100%] text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} type="password" name="password" placeholder="パスワードを入力" id="recipe-image" />
            <span className="text-[.5em] sm:text-[.75em] text-[#7f7464] font-semibold">パスワードを忘れた場合</span>
            <button onClick={(e:SyntheticEvent) => loginFunc(e)} className="w-[100%] bg-[#ffb762] text-white py-[10px] rounded-md text-[12px] sm:text-[16px]" type="submit">
                {!login ? (
                    'ログイン'
                ): (
                    <FontAwesomeIcon icon={faCircleNotch} spin size="lg"/>
                )}
            </button>
            <span className="text-[.5em] sm:text-[.75em] text-[#7f7464] font-semibold text-[#E53935]">{error}</span>
        </form>
    )
}