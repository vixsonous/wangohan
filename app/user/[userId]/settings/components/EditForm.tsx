'use client';
import { faCheck, faCircleNotch, faClose, faEdit, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  ChangeEvent, MouseEventHandler, SyntheticEvent, useEffect, useState } from "react";
import PetEditForm from "./PetEditForm";
import PetAddForm from "./PetAddForm";
import { DogData, userDetails } from "@/constants/interface";
import { POPUPTIME, SUCC_MSG, textColor } from "@/constants/constants";
import ErrorSpan from "@/app/components/TextComponents/ErrorSpan";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { hideSuccess, showSuccess } from "@/lib/redux/states/messageSlice";
import { setPets } from "@/lib/redux/states/petSlice";
import OptImage from "@/app/components/ElementComponents/Image";

interface Props {
    userDetails: userDetails,
    pets: Array<DogData>
}
export default function EditForm({userDetails, pets} : Props) {
    const dispatch = useAppDispatch();
    const petState = useAppSelector(state => state.pet.pets);
    const isSet = useAppSelector(state => state.pet.isSet);

    const [state, setState] = useState({
        usrnm: userDetails.user_codename,
        dispUsrnm: userDetails.user_codename,
        curUsrnmIcn: faEdit,
        profilePic: {
            thumbnail: userDetails.user_image !== '' ? userDetails.user_image: '/icons/user.webp',
            picture: null,
        } as {
            thumbnail: string,
            picture: File | null,
        },
        submitState: false,
        successState: false,
        errMsg: ''

    });

    const nameOnBlurEvent = () => {
        setState(prev => ({...prev, curUsrnmIcn: faEdit}));
        if(state.dispUsrnm === "") setState(prev => ({...prev, dispUsrnm: state.usrnm}))
        if(state.dispUsrnm !== "") setState(prev => ({...prev, usrnm: state.dispUsrnm}))
    }
    const nameOnClickEvent = () => setState(prev => ({...prev, curUsrnmIcn: faSave}))
    const nameOnChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, dispUsrnm: e.target.value}));

    const profPicOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            const tempPath = URL.createObjectURL(e.target.files[0]);
            const file = e.target.files[0];
            setState(prev => ({...prev, profilePic: {
                thumbnail:tempPath, 
                picture: file
            }}))
        }
    }

    const submitBtnOnClick = (e:React.MouseEvent<HTMLButtonElement>) => submitFunc(e);
    const submitFunc = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const updtForm = new FormData();

        updtForm.append('codenm', state.usrnm);
        if(state.profilePic.picture) updtForm.append('profPic', state.profilePic.picture);
        
        setState(prev => ({...prev, submitState: true}));

        await fetch('/api/update-profile', {
            method: 'PATCH',
            body: updtForm
        }).then(async res => {
            const body = await res.json();
            setState(prev => ({...prev, successState: true, submitState: false, errMsg: ''}));
            if(res.status === 500) {
                throw new Error(body.message);
            } else if(res.status === 200) {
                dispatch(showSuccess(body.message));
                setTimeout(() => {
                    dispatch(hideSuccess());
                }, POPUPTIME);
            }
        }).catch(err => {
            setState(prev => ({...prev, errMsg: (err as Error).message, submitState: false}));
        });
    }

    useEffect(() => {
        if(!isSet) {
            dispatch(setPets(pets));
        }
    },[]);

    return (
        <form action="" className="relative max-w-[768px]">
            <div className="user-image flex flex-col justify-center items-center mt-[30px]">
                <label htmlFor="profile-image" className="relative group">
                    <OptImage src={state.profilePic.thumbnail} width={100} height={100} className="border-[1px] border-[#523636] rounded-[100px] w-[200px] h-[200px] relative object-cover" alt={state.dispUsrnm}/>
                    <input onChange={profPicOnChange} className="w-[100%] hidden" type="file" name="profile-image" id="profile-image" />
                    <div className="absolute w-full h-full bg-black group-hover:opacity-[0.3] opacity-0 top-0 flex justify-center items-center rounded-[50%] transition-all duration-500">
                        <span className="text-white font-bold">画像を追加</span>
                    </div>
                </label>
                <span className="text-[10px] mb-[1vh]">タップして画像を変更</span>
                <label className="flex justify-center group items-center relative overflow-hidden p-[20px]">
                    <input 
                        onClick={nameOnClickEvent} 
                        onChange={nameOnChangeEvent}
                        onBlur={nameOnBlurEvent}
                        value={state.dispUsrnm} 
                        name="codename"
                        className="text-[36px] w-[100%] bg-[transparent] text-center pl-[10px] pr-[40px] font-bold text-[#5b5351]" 
                    />
                    <FontAwesomeIcon icon={state.curUsrnmIcn} size="lg" className="absolute right-[30px] text-[20px]"/>
                </label>
            </div>
            <div className="flex justify-center items-center relative mt-[40px] mb-[10px]">
                <h1 className="absolute top-[10px] font-semibold text-[#523636]">うちのわん</h1>
                <img src={'/icons/ribbon.webp'} className="h-[auto] w-[200px] sm:w-[300px] max-w-none" width={10000} height={10000}  alt="website banner" />
            </div>
            <div className="pet-list p-[20px] flex flex-wrap gap-[20px] items-center">
                {
                    !isSet && (
                        <span>Loading...</span>
                    )
                }
                {
                    isSet && (
                        petState.map((pet, idx) => <PetEditForm key={idx} petData={pet} />)
                    )
                }
            </div>
            <PetAddForm />
            <div className="w-full flex self-center justify-center items-center flex-col">
                <button 
                    disabled={state.submitState} 
                    onClick={submitBtnOnClick} //
                    className={`bg-[#ffb762] w-[150px] border-[1px] border-[${state.submitState ? '#ffb762' : '#FFD99A'}] text-white py-[10px] rounded-md text-[12px] self-center sm:text-[16px]`} 
                    type="submit"
                >
                    {!state.submitState ? (
                        <><FontAwesomeIcon icon={faSave}/> 保存する</>
                    ): (
                        <FontAwesomeIcon icon={faCircleNotch} spin size="lg"/>
                    )}
                </button>
                <ErrorSpan>
                    {state.errMsg}
                </ErrorSpan>
            </div>
        </form>
    )
}