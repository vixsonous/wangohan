'use client';

import InputLoading from "@/app/components/ElementComponents/InputLoading";
import ErrorSpan from "@/app/components/TextComponents/ErrorSpan";
import { ERR_MSG, POPUPTIME } from "@/constants/constants";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { hideError, hideSuccess, showError, showSuccess } from "@/lib/redux/states/messageSlice";
import { addPet } from "@/lib/redux/states/petSlice";
import { faArrowLeft, faCircleNotch, faClose, faEdit, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowLeft, CircleNotch, Plus } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "framer-motion";
import heic2any from "heic2any";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PetAddForm() {

    const dispatch = useAppDispatch();
    const router = useRouter();
    // Pet add
    const [state, setState] = useState({
        modalDisp: false,
        fileUp: false,
        pet: {
            thumbnail: '/recipe-making/pic-background.png',
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
      e.preventDefault();

      if(!e.currentTarget.files || !e.currentTarget.files[0]) return;
      
      const fileName = e.currentTarget.files[0].name;
      const fileNameExt = fileName.substring(fileName.lastIndexOf('.') + 1);

      if(typeof window !== 'undefined' && (fileNameExt.toLowerCase() === "heic" || fileNameExt.toLowerCase() === "heif")) {
        setState(prev => ({...prev, fileUp: true}));
        const image = await heic2any({
          blob: e.currentTarget.files[0],
          toType: 'image/webp',
          quality: 0.8
        });
        setState(prev => ({...prev, fileUp: false}));

        const b = !Array.isArray(image) ? [image] : image;

        const f = new File(b, fileName);
        const tempPath = URL.createObjectURL(f);
        setState(prev => ({...prev, pet: { ...prev.pet, thumbnail: tempPath, file: f}}))
      } else {
        const file = e.currentTarget.files[0];
        const tempPath = URL.createObjectURL(file);
        setState(prev => ({...prev, pet: { ...prev.pet, thumbnail: tempPath, file: file}}))
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
        const picForm = new FormData();

        if(state.pet.petBday){
            form.append('petName',state.pet.petName);
            form.append('petBday',state.pet.petBday.toISOString());
            form.append('petBreed',state.pet.petBreed);
        }

        if(state.pet.file) {
            picForm.append('petPic', state.pet.file);
        }

        const uploadedPetPic = await fetch('/api/pet-pic', {
            method: "POST",
            body: picForm
        }).then( async res => {
            const body = await res.json();

            if(res.status === 500) {
                throw new Error(body.message);
            } else if (res.status === 200) {
                return body.body.uploadedPetPic;
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

        if(!uploadedPetPic) return;

        form.append('uploadedPetPic', uploadedPetPic);
        
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

                setState({
                  modalDisp: false,
                  fileUp: false,
                  pet: {
                      thumbnail: '/recipe-making/pic-background.png',
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

                router.push('/user/settings/' + user.user_id);
            }
        }).catch( err => {

            dispatch(showError((err as Error).message));
            setTimeout(() => {
                dispatch(hideError());
            },POPUPTIME);
            
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

    const btnRef = useRef<HTMLButtonElement>(null);
    const bdayRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if(window && window.location.href.includes("?=#register-pet") && btnRef.current) {
        btnRef.current.click();
      }
    },[]);

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

    return (
        <>
        <div className="p-[20px] flex flex-wrap justify-between items-center">
            <button ref={btnRef} onClick={showAddPetOnClick}><FontAwesomeIcon icon={faPlus}/> 家族を追加</button>
            <Link href={`/user/${user.user_id}`} className="flex items-center gap-2"><ArrowLeft size={20}/>  戻る</Link>
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
                                    {
                                      state.fileUp && (
                                        <div className="absolute z-10 w-full h-full flex justify-center gap-2 items-center">
                                          <CircleNotch size={20} className="animate-spin"/>
                                          <span>アップロード中...</span>
                                        </div>
                                      )
                                    }
                                    <img src={state.pet.thumbnail} className="
                                    rounded-[50%] w-[190px] h-[190px] object-cover relative" width={100} height={100}  alt="website banner" />
                                    <div className="absolute w-full h-full bg-black group-hover:opacity-[0.3] opacity-0 top-0 flex justify-center items-center rounded-[50%] transition-all duration-500">
                                        <span className="text-white font-bold z-20">画像を追加</span>
                                    </div>
                                </label>
                                <input onChange={petImgOnChange} className="hidden" type="file" name="" id={`thumbnail-0`} />
                            </div>
                            <div className="flex flex-col gap-[5px] text-[#5b5351]">
                                <label className="group">
                                    <span>愛犬の名前</span>
                                    <label htmlFor="petName" className="h-10 flex items-center justify-center relative w-[100%] px-[10px] py-[5px] border-[2px] rounded-md border-[#ffcd92]">
                                        <input 
                                            maxLength={6}
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
                                <label onClick={petBdayLabelClick} className="group">
                                    <span>誕生日</span>
                                    <label htmlFor="petBday" className="h-10 appearance-none w-full flex items-center justify-between relative flex-wrap px-4 py-2 border-[2px] rounded-md border-[#ffcd92]">
                                        <input 
                                            ref={bdayRef}
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
                                    <label htmlFor="petBreed" className="h-10 flex items-center justify-center relative w-[100%] px-[10px] py-[5px] border-[2px] rounded-md border-[#ffcd92]">
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
                                        <div className="flex justify-center items-center gap-2"><Plus size={20}/> 家族を追加</div>
                                    ): (
                                        <InputLoading />
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