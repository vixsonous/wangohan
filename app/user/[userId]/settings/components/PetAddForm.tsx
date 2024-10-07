'use client';

import ErrorSpan from "@/app/components/TextComponents/ErrorSpan";
import { ERR_MSG, POPUPTIME } from "@/constants/constants";
import { compressImage } from "@/constants/functions";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { hideSuccess, showSuccess } from "@/lib/redux/states/messageSlice";
import { addPet } from "@/lib/redux/states/petSlice";
import { faArrowLeft, faCircleNotch, faClose, faEdit, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PetAddForm() {

    const dispatch = useAppDispatch();
    // Pet add
    const [state, setState] = useState({
        modalDisp: false,
        pet: {
            thumbnail: '/icons/default-pet.jpg',
            file: null,
            petName: '',
            petBday: null,
            petBreed: ''
        } as {
            thumbnail: string,
            file: File | null,
            petName: string,
            petBday: Date | null,
            petBreed: string
        },
        icns: {
            petNameIcn: faEdit,
            petBdayIcn: faEdit,
            petBreedIcn: faEdit,
        },
        submitState: false,
        error: ''
    });

    const user = useAppSelector(state => state.user.user);

    const petImgOnChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.files && e.currentTarget.files[0]) {
            const tempPath = URL.createObjectURL(e.currentTarget.files[0]);

            const beforeFile = e.currentTarget.files[0];
            const afterFile = await compressImage(beforeFile, {quality: 0.5, type: 'image/jpeg'});

            if(beforeFile.size > 4000000) {
                setState(prev => ({...prev, error: 'Picture size is greater than 4MB (Max)!'}));
                return;
            }
            
            setState(prev => ({...prev, pet: { ...prev.pet, thumbnail: tempPath, file: beforeFile.size > afterFile.file.size ? afterFile.file : beforeFile}}))
        }
    }

    const showAddPetOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setState(prev => ({...prev, modalDisp: true}));
    }

    const inputPetOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const name = `${e.currentTarget.name}Icn`;
        setState(prev => ({
            ...prev, 
            icns: {
                ...prev.icns,
                [name]: faSave 
            }
        }));
    }
    const inputPetOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        setState(prev => ({
            ...prev, 
            pet: {
                ...prev.pet, 
                [name] : name === 'petBday' ? new Date(e.target.value === "" ? 0 : e.target.value) : e.target.value
            }
        }));

        if(name === 'petBday') setState(prev => ({...prev, icns: {...prev.icns,[`${name}Icn`]: faEdit }}));
    }
    const inputPetOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const name = `${e.currentTarget.name}Icn`;
        setState(prev => ({
            ...prev, 
            icns: {
                ...prev.icns,
                [name]: faEdit 
            }
        }));
    }

    const closeAddPetOnClick = async (e: React.MouseEvent<SVGSVGElement>) => setState(prev => ({...prev, modalDisp: false}));

    const submitFunc = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(!validation()) return;

        setState(prev => ({...prev, submitState: true}));

        const form = new FormData();

        if(state.pet.petBday && state.pet.file){
            form.append('petName',state.pet.petName);
            form.append('petBday',state.pet.petBday.toISOString());
            form.append('petBreed',state.pet.petBreed);
            form.append('petPic', state.pet.file);
        }
        
        await fetch('/api/post-pet', {
            method: 'POST',
            body: form
        }).then(async res => {
            const body = await res.json();
            if(res.status === 500) {
                throw new Error(body.message);
            } else if(res.status === 200) {
                
                dispatch(addPet(body.body));
                dispatch(showSuccess(body.message));
                setTimeout(() => {
                    dispatch(hideSuccess());
                }, POPUPTIME);
                setState(prev => ({...prev, submitState: false, modalDisp: false}));
            }
        }).catch( err => {
            setState(prev => ({...prev, submitState: false, error: (err as Error).message}));
        })
            
    }

    const validation = () => {
        if(state.pet.petName === "") {
            setState(prev => ({...prev, error: ERR_MSG.ERR28}));
            return false;
        }

        if(state.pet.petBreed === "") {
            setState(prev => ({...prev, error: ERR_MSG.ERR29}));
            return false;
        }

        if(!state.pet.petBday || state.pet.petBday.valueOf() === 0) {
            setState(prev => ({...prev, error: ERR_MSG.ERR30}));
            return false;
        }

        if(!state.pet.file) {
            setState(prev => ({...prev, error: ERR_MSG.ERR31}));
            return false;
        }

        setState(prev => ({...prev, error: ''}));
        return true;
    }

    return (
        <>
        <div className="p-[20px] flex flex-wrap justify-between items-center">
            <button onClick={showAddPetOnClick}><FontAwesomeIcon icon={faPlus}/> 家族を追加</button>
            <Link href={`/user/${user.user_id}`}><FontAwesomeIcon icon={faArrowLeft}/> 戻る</Link>
        </div>

        {/* Add Pet Popup */}
        <AnimatePresence>
            { state.modalDisp && (
                <motion.div 
                    initial={{ opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{ opacity: 0}}
                    className={`bg-[rgba(0,0,0,0.2)] fixed z-[1000] p-[20px] flex justify-center items-center w-full h-full top-0 left-0`}>
                    <motion.div 
                        initial={{y: -100, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: -100, opacity: 0}}
                        className="border-[2px] border-solid border-[#ffcd92] rounded-md"
                    >
                        <div className="bg-[#FFE9C9] text-[#523636] flex justify-between items-center font-bold w-full py-[10px] px-[20px]">
                            <h1>Add Pet</h1>
                            <FontAwesomeIcon onClick={closeAddPetOnClick} icon={faClose} size="sm" className="ml-[20px] cursor-pointer text-[15px]"/>
                        </div>
                        <div className="bg-[#FFFAF0] p-[30px] flex justify-center flex-wrap items-center gap-[20px]">
                            <div>
                                <label htmlFor={`thumbnail-0`} className="relative group">
                                    <img src={state.pet.thumbnail} className="
                                    rounded-[50%] w-[190px] h-[190px] object-cover relative" width={10000} height={10000}  alt="website banner" />
                                    <div className="absolute w-full h-full bg-black group-hover:opacity-[0.3] opacity-0 top-0 flex justify-center items-center rounded-[50%] transition-all duration-500">
                                        <span className="text-white font-bold">画像を追加</span>
                                    </div>
                                </label>
                                <input onChange={petImgOnChange} className="hidden" type="file" name="" id={`thumbnail-0`} />
                            </div>
                            <div className="flex flex-col gap-[5px] text-[#5b5351]">
                                <label className="group">
                                    <span>愛犬の名前</span>
                                    <label htmlFor="petName" className="flex items-center justify-center relative w-[100%] px-[10px] py-[5px] border-[2px] rounded-md border-[#ffcd92]">
                                        <input 
                                            id="pet-name" 
                                            className="w-[100%] focus:outline-none text-[1em] bg-[transparent] text-left font-bold text-[#5b5351]" 
                                            onClick={inputPetOnClick} 
                                            onChange={inputPetOnChange} 
                                            onBlur={inputPetOnBlur}
                                            name="petName"
                                            value={state.pet.petName} 
                                        />
                                        <FontAwesomeIcon icon={state.icns.petNameIcn} size="lg" className="absolute right-[5px]"/>
                                    </label>
                                </label>
                                <label className="group">
                                    <span>誕生日</span>
                                    <label htmlFor="petBday" className="appearance-none w-full flex items-center justify-between relative flex-wrap w-[100%] px-[10px] py-[4px] border-[2px] rounded-md border-[#ffcd92]">
                                        <input 
                                            className="appearance-none focus:outline-none text-[1em] bg-[transparent] text-left font-bold text-[#5b5351]" 
                                            value={state.pet.petBday && state.pet.petBday.valueOf() !== 0 ? 
                                                state.pet.petBday.toISOString().split('T')[0] 
                                                : ''
                                            } 
                                            type="date" 
                                            onClick={inputPetOnClick} 
                                            onChange={inputPetOnChange} 
                                            onBlur={inputPetOnBlur} 
                                            name="petBday"
                                        />
                                        <FontAwesomeIcon icon={state.icns.petBdayIcn} size="lg" className="absolute right-[5px]"/>
                                    </label>
                                </label>
                                <label className="group">
                                    <span>犬種</span>
                                    <label htmlFor="petBreed" className="flex items-center justify-center relative w-[100%] px-[10px] py-[5px] border-[2px] rounded-md border-[#ffcd92]">
                                        <input 
                                            value={state.pet.petBreed} 
                                            className="w-[100%] focus:outline-none text-[1em] bg-[transparent] text-left font-bold text-[#5b5351]" 
                                            onClick={inputPetOnClick}
                                            onChange={inputPetOnChange}
                                            onBlur={inputPetOnBlur}
                                            name="petBreed"
                                        />
                                        <FontAwesomeIcon icon={state.icns.petBreedIcn} size="lg" className="absolute right-[5px]"/>
                                    </label>
                                </label>
                            </div> 
                            <div className="w-full flex justify-center flex-col items-center gap-[5px]">
                                <button 
                                    type="submit" 
                                    className="w-[100%] max-w-[190px] bg-[#ffb762] text-white py-[10px] rounded-md text-[12px] sm:text-[16px]" 
                                    onClick={submitFunc}
                                >
                                    {!state.submitState ? (
                                        <><FontAwesomeIcon icon={faPlus}/> 家族を追加</>
                                    ): (
                                        <FontAwesomeIcon icon={faCircleNotch} spin size="lg"/>
                                    )}
                                </button>
                                <ErrorSpan>
                                    {state.error}
                                </ErrorSpan>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    )
}