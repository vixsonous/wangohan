'use client';

import OptImage from "@/app/components/ElementComponents/Image";
import ErrorSpan from "@/app/components/TextComponents/ErrorSpan";
import { ERR_MSG, POPUPTIME } from "@/constants/constants";
import { DogData } from "@/constants/interface";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { hideError, hideSuccess, showError, showSuccess } from "@/lib/redux/states/messageSlice";
import { setPets } from "@/lib/redux/states/petSlice";
import { faCircleNotch, faClose, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircleNotch, FloppyDisk, X } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "framer-motion";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";

interface Props {
    petData: DogData,
    className?: string
}
export default function PetEditForm({petData, className=''} : Props) {

    function calculateAge(birthDate : Date) { // birthday is a date
        var ageDifMs = Date.now() - birthDate.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const dispatch = useAppDispatch();
    const {pets} = useAppSelector(state => state.pet);

    const [state, setState] = useState({
        modalDisp: false,
        pet: {
            petName: petData.pet_name,
            petBreed: petData.pet_breed,
            petBday: new Date(petData.pet_birthdate) as Date | null,
            pet_image: petData.pet_image,
            pet_id: petData.pet_id,
            file: null as File | null
        },
        icns: {
            petNameIcn: faEdit,
            petBdayIcn: faEdit,
            petBreedIcn: faEdit,
        },
        submitState: false,
        error: ''
    });

    const showEditModal = (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      setState(prev => ({...prev, modalDisp: true}))
    };
    const hideEditModal = (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setState(prev => ({...prev, modalDisp: false}));
    }

    const petPicOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            const tempPath = URL.createObjectURL(e.target.files[0]);

            const beforeFile = e.target.files[0];

            if(beforeFile.size > 4000000) {
                setState(prev => ({...prev, error: 'Picture size is greater than 4MB (Max)!'}));
                return;
            }
            
            setState(prev => ({...prev, pet: { ...prev.pet, pet_image: tempPath, file: beforeFile}}))
        }
    }

    const petInputOnClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const name = `${e.currentTarget.name}Icn`;
        setState(prev => ({...prev, icns: {...prev.icns, [name]: faSave}}));
    }

    const petInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const petInputOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const name = `${e.currentTarget.name}Icn`;
        setState(prev => ({...prev, icns: {...prev.icns, [name]: faEdit}}));
    }

    const bdayRef = useRef<HTMLInputElement>(null);

    const petBdayLabelClick = (e:React.MouseEvent<HTMLLabelElement>) => {
      e.preventDefault();
      
      if(bdayRef && bdayRef.current) {
        bdayRef.current.showPicker();
        bdayRef.current.focus();
        const name = `${bdayRef.current.name}Icn`;
        setState(prev => ({
            ...prev, 
            icns: {
                ...prev.icns,
                [name]: faSave 
            }
        }));
      }
    }

    const submitFunc = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(!validation()) return;

        const form = new FormData();

        if(state.pet.petBday) form.append('petBday', state.pet.petBday.toISOString());

        form.append('petName', state.pet.petName);
        form.append('petBreed', state.pet.petBreed);
        form.append('petId', String(state.pet.pet_id));

        setState(prev => ({...prev, submitState: true}));

        if(state.pet.file) {
            const picForm = new FormData();
            picForm.append('petPic', state.pet.file);
            picForm.append('petId', String(state.pet.pet_id));

            const res = await fetch('/api/pet-pic', {
                method: 'PATCH',
                body: picForm
            })
            .then( async res => {
                const body = await res.json();

                if(res.status === 500) {
                    throw new Error(body.message);
                } else if (res.status === 200) {
                    return true;
                }
            })
            .catch( err => {
                dispatch(showError((err as Error).message));
                setTimeout(() => {
                    dispatch(hideError());
                },POPUPTIME);
                
                setState(prev => ({...prev, submitState: false, error: (err as Error).message}));
                return false;
            });

            if(!res) return;
        }

        await fetch('/api/post-pet', {
            method: 'PATCH',
            body: form
        })
        .then(async res => {
            const body = await res.json();
            if(res.status === 500) {
                throw new Error(body.message);
            } else if(res.status === 200) {
                const temp = [...pets];

                for(let i = 0; i < temp.length; i++) {
                    if(temp[i].pet_id === body.body.pet_id) {
                        temp[i] = body.body;
                    }
                }

                dispatch(setPets(temp));

                dispatch(showSuccess(body.message));
                setTimeout(() => {
                    dispatch(hideSuccess());
                },POPUPTIME);
                setState(prev => ({...prev, submitState: false, error: '', modalDisp: false}));
            }
        })
        .catch( err => {

            dispatch(showError((err as Error).message));
            setTimeout(() => {
                dispatch(hideError());
            },POPUPTIME);
            
            setState(prev => ({...prev, submitState: false, error: (err as Error).message}));
            return false;
        });
        
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

        setState(prev => ({...prev, error: ''}));
        return true;
    }

    return (
        <>
            <button onClick={showEditModal} className={"flex md:flex-col flex-grow flex-shrink-0 justify-center items-center gap-[10px]" + className}>
                <div>
                    <OptImage src={petData.pet_image} centered className="hidden md:block rounded-full object-cover" square width={150} height={150}  alt="website banner"/>
                    <OptImage src={petData.pet_image} centered className="block md:hidden rounded-full object-cover" square width={60} height={60}  alt="website banner"/>
                </div>
                <div className="flex flex-col justify-start items-start gap-2 text-[#5b5351]">
                    <p className="text-base md:text-xl font-bold text-ellipsis overflow-hidden max-w-max">{petData.pet_name}</p>
                    <p className="text-xs md:text-sm flex gap-2 flex-wrap"><span>{petData.pet_birthdate.split('T')[0]}</span><span>{`(${calculateAge(new Date(petData.pet_birthdate))}才) `}</span></p>
                    <p className="text-xs md:text-sm">{petData.pet_breed}</p>
                </div> 
            </button>
            <AnimatePresence>
            {
                state.modalDisp && (
                    <motion.div 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className={`bg-[rgba(0,0,0,0.2)] fixed z-[1000] p-[20px] flex justify-center items-center w-full h-full top-0 left-0`}>
                        <motion.div 
                            initial={{opacity: 0, y: -100}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -100}}
                            className="border-[2px] border-solid border-[#ffcd92] rounded-md">
                            <div className="bg-[#FFE9C9] text-[#523636] flex justify-between items-center font-bold w-full py-[10px] px-[20px]">
                                <h1>Edit Pet</h1>
                                <button onClick={hideEditModal}>
                                  <X size={20}/>
                                </button>
                            </div>
                            <div className="bg-[#FFFAF0] p-[30px] flex justify-center flex-wrap  items-center gap-[20px]">
                                <div>
                                    <label htmlFor={`thumbnail-${petData.pet_id}`} className="relative group">
                                        <OptImage src={state.pet.pet_image} className="rounded-[50%] w-[190px] h-[190px] object-cover" width={100} height={100}  alt={state.pet.petName}/>
                                        <div className="absolute w-full h-full bg-black group-hover:opacity-[0.3] opacity-0 top-0 flex justify-center items-center rounded-[50%] transition-all duration-500">
                                            <span className="text-white font-bold">画像を追加</span>
                                        </div>
                                    </label>
                                    <input onChange={petPicOnChange} className="hidden" type="file" name="" id={`thumbnail-${petData.pet_id}`} />
                                </div>
                                <div className="flex flex-col gap-[5px] text-[#5b5351]">
                                    <label>
                                        <span>愛犬の名前</span>
                                        <label htmlFor="petName" className="h-10 flex items-center justify-center relative w-[100%] px-[10px] py-[5px] border-[2px] rounded-md border-[#ffcd92]">
                                            <input 
                                                id="pet-name" 
                                                className="w-[100%] focus:outline-none text-[1em] bg-[transparent] text-left font-bold text-[#5b5351]" 
                                                onClick={petInputOnClick} 
                                                onChange={petInputOnChange} 
                                                onBlur={petInputOnBlur} 
                                                value={state.pet.petName} 
                                                name="petName"
                                            />
                                            <FontAwesomeIcon icon={state.icns.petNameIcn} size="lg" className="absolute right-[5px]"/>
                                        </label>
                                    </label>
                                    <label onClick={petBdayLabelClick}>
                                        <span>誕生日</span>
                                        <div className="h-10 appearance-none w-full flex items-center justify-between relative flex-wrap px-4 py-2 border-[2px] rounded-md border-[#ffcd92]">
                                            <input 
                                                ref={bdayRef}
                                                className="appearance-none focus:outline-none text-[1em] bg-[transparent] text-left font-bold text-[#5b5351]" 
                                                value={state.pet.petBday && state.pet.petBday.valueOf() !== 0 ? 
                                                    state.pet.petBday.toISOString().split('T')[0] 
                                                    : ''
                                                }  
                                                type="date" 
                                                onClick={petInputOnClick} 
                                                onChange={petInputOnChange} 
                                                onBlur={petInputOnBlur} 
                                                name="petBday"
                                            />
                                            <FontAwesomeIcon icon={state.icns.petBdayIcn} size="lg" className="absolute right-[5px]"/>
                                        </div>
                                    </label>
                                    <label>
                                        <span>犬種</span>
                                        <div className="h-10 flex items-center justify-center relative w-[100%] px-[10px] py-[5px] border-[2px] rounded-md border-[#ffcd92]">
                                            <input 
                                                value={state.pet.petBreed} 
                                                className="w-[100%] focus:outline-none text-[1em] bg-[transparent] text-left font-bold text-[#5b5351]" 
                                                onClick={petInputOnClick} 
                                                onChange={petInputOnChange} 
                                                onBlur={petInputOnBlur} 
                                                name="petBreed"
                                            />
                                            <FontAwesomeIcon icon={state.icns.petBreedIcn} size="lg" className="absolute right-[5px]"/>
                                        </div>
                                    </label>
                                </div> 
                                <div className="w-full flex justify-center flex-col items-center gap-[5px]">
                                    <button type="submit" className="w-[100%] max-w-[190px] bg-[#ffb762] text-white py-[10px] rounded-md text-[12px] sm:text-[16px]" onClick={submitFunc}>
                                        {!state.submitState ? (
                                            <span className="flex items-center gap-2 justify-center">
                                              <FloppyDisk size={20}/> 保存する
                                            </span>
                                        ): (
                                            <span className="flex justify-center items-center">
                                              <CircleNotch size={20} className="animate-spin"/>
                                            </span>
                                        )}
                                    </button>
                                    <ErrorSpan>
                                        {state.error}
                                    </ErrorSpan>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )
            }
            </AnimatePresence>
        </>
    )
}