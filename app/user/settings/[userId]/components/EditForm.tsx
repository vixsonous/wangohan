'use client';
import { faCheck, faCircleNotch, faClose, faEdit, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {  ChangeEvent, MouseEventHandler, SyntheticEvent, useEffect, useState } from "react";
import { DogData, userDetails } from "@/constants/interface";
import { POPUPTIME, SUCC_MSG, textColor } from "@/constants/constants";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { hideSuccess, showSuccess } from "@/lib/redux/states/messageSlice";
import { setPets } from "@/lib/redux/states/petSlice";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import InputLoading from "@/app/components/ElementComponents/InputLoading";
const OptImage = React.lazy(() => import("@/app/components/ElementComponents/Image"));
const PetEditForm = React.lazy(() => import("./PetEditForm"));
const PetAddForm = dynamic(() => import("./PetAddForm"), { ssr: false, loading: () => <InputLoading />});
const ErrorSpan = React.lazy(() => import("@/app/components/TextComponents/ErrorSpan"));

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
        errMsg: '',
        mdStart: '1',
        lgStart: '1'

    });

    const router = useRouter();

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

        await fetch('/api/profile-pic', {
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
                router.push("/user/" + userDetails.user_id)
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

    useEffect(() => {
      setState({
        ...state,
        mdStart: petState.length === 3 ? `lg:grid-cols-3` : petState.length === 2 ? `lg:grid-cols-2`: petState.length === 1 ? `lg:grid-cols-1` : `lg:grid-cols-3`,
        lgStart: petState.length === 3 ? `lg:grid-cols-3` : petState.length === 2 ? `lg:grid-cols-3`: petState.length === 1 ? `lg:grid-cols-1` : `lg:grid-cols-5`
      })
    },[petState]);

    return (
        <form action="" className="relative max-w-xl w-full">
            <div className="user-image flex flex-col justify-center items-center mt-[30px]">
                <label htmlFor="profile-image" className="relative group">
                    <OptImage src={state.profilePic.thumbnail} containerClass="hidden md:flex" square={true} width={350} height={350} className="hidden md:block border border-primary-text rounded-full object-cover" alt={state.dispUsrnm}/>
                    <OptImage src={state.profilePic.thumbnail} containerClass="flex md:hidden" square={true} width={150} height={150} className="block md:hidden border border-primary-text rounded-full object-cover" alt={state.dispUsrnm}/>
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
            <div className="flex justify-center self-center items-center w-full relative mt-[40px] mb-[10px]">
                <h1 className="absolute top-2 text-lg font-semibold text-[#523636]">うちのわん</h1>
                <img src={'/icons/ribbon.webp'} className="hidden md:block h-[auto] self-center max-w-none" width={300} height={122}  alt="website banner" />
                <img src={'/icons/ribbon.webp'} className="block md:hidden h-[auto] self-center max-w-none" width={200} height={122}  alt="website banner" />
            </div>
            <div className={`pet-list p-4 grid grid-cols-2 ${petState.length <=3 ? state.mdStart:'md:grid-cols-3'} ${petState.length <=3 ? state.lgStart:'lg:grid-cols-5'} gap-4 items-center`}>
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
                    className={`bg-[#ffb762] mt-4 w-[150px] border-[1px] border-[${state.submitState ? '#ffb762' : '#FFD99A'}] text-white py-[10px] rounded-md text-[12px] self-center sm:text-[16px]`} 
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