'use client';
import { validateEmail, withSpecialCharacters } from "@/constants/constants";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent, useState } from "react"

export default function SignUpForm() {

    const [signup, setSignup] = useState({
        email: '',
        password: '',
    });

    const [signupState, setSignupState] = useState(false);
    const [error, setError] = useState('');

    const signUpFunc = (e: SyntheticEvent) => {
        e.preventDefault();

        if(!validateEmail(signup.email)) {
            setError("Email is invalid");
            return;
        }

        if(!signup.password) {
            setError("Please input password!");
            return;
        }

        if(withSpecialCharacters(signup.password)) {
            setError("No Special Characters allowed!");
            return;
        }

        if(signup.password.length < 8) {
            setError("Password must be at least 8 characters!");
            return;
        }

        setSignupState(true);

        fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify(signup),
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then(async res => {
            setSignupState(false);
            if(res.status === 200) {
                window.location.href = '/signup/personal-info';
            }else if(res.status === 302) {
                window.location.href = res.url;
            } else if(res.status === 500) {
                let response = await res.json().then(res => res);
                throw new Error(response.message);
            }
        }).catch(async error => {
            setError((error as Error).message);
        });
    }

    
    return (
        <form action="" className="w-[100%] max-w-[100%] sm:max-w-[460px] flex flex-col gap-[10px] items-center">
            <input value={signup.email} onChange={(e) => setSignup(prevState => ({...prevState, email: e.target.value}))} className="w-[100%] text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]" type="email" name="email" placeholder="メールアドレスを入力" id="email" />
            <input value={signup.password} onChange={(e) => setSignup(prevState => ({...prevState, password: e.target.value}))} className={`w-[100%] text-[12px] sm:text-[16px] px-[10px] py-[10px] border-[2px] rounded-md border-[#ffcd92]`} type="password" name="password" placeholder="パスワードを入力" id="password" />
            <button onClick={(e:SyntheticEvent) => signUpFunc(e)} className="w-[100%] bg-[#ffb762] text-white py-[10px] rounded-md text-[12px] sm:text-[16px]" type="submit">
                {!signupState ? (
                    '新規登録'
                ): (
                    <FontAwesomeIcon icon={faCircleNotch} spin size="lg"/>
                )}
            </button>
            <span className="text-[.5em] sm:text-[.75em] text-[#7f7464] font-semibold text-[#E53935]">{error}</span>
        </form>
    )
}