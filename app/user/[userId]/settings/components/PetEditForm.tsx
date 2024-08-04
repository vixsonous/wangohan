'use client';

import { faClose, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface DogData {
    id: number,
    thumbnail: string,
    name: string,
    birthdate: Date,
    breed: string
}

interface Props {
    petData: DogData
}
export default function PetEditForm({petData} : Props) {

    function _calculateAge(birthDate : Date) { // birthday is a date
        var ageDifMs = Date.now() - birthDate.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const popup = useRef<HTMLDivElement>(null);
    const alrtPopup = () => {
        if(popup.current) {
            
            setIcns({petNameIcn: faEdit, petBdayIcn: faEdit, petBreedIcn: faEdit})
            popup.current.classList.add("fixed");
            popup.current.classList.remove("hidden");

            setTimeout(() => {
                if(popup.current){
                    popup.current.classList.remove("fixed");
                    popup.current.classList.add("hidden");
                }
                
            }, 3000);
        }
    }

    

    const [icns, setIcns] = useState({
        petNameIcn: faEdit,
        petBdayIcn: faEdit,
        petBreedIcn: faEdit,
    });

    const [pet, setPet] = useState(petData);
    const [imgKey, setImgKey] = useState(new Date().getTime() * Math.random());

    const [state, setState] = useState('hidden');
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        petData.name = pet.name;
        console.log(pet);
    },[pet.name, pet.birthdate, pet.breed, pet.thumbnail]);

    useEffect(() => {
        setImgKey(new Date().getTime() * Math.random());
    },[pet.thumbnail]);

    return (
        <>
            <div onClick={()=>setState('fixed')} className="flex flex-grow flex-shrink-0 basis-[30%] justify-center items-center gap-[20px]">
                <div>
                    <Image src={petData.thumbnail} className="rounded-[50%] w-[60px] h-[60px] object-cover relative" width={10000} height={10000}  alt="website banner" />
                </div>
                <div className="flex flex-col gap-[5px] text-[#5b5351]">
                    <p className="text-[16px] font-bold">{petData.name}</p>
                    <p className="text-[10px] flex gap-[5px] flex-wrap"><span>{petData.birthdate.toISOString().split('T')[0]}</span><span>{`(${_calculateAge(petData.birthdate)}才) `}</span></p>
                    <p className="text-[10px]">{petData.breed}</p>
                </div> 
            </div>
            <div className={`bg-[rgba(0,0,0,0.2)] ${state} z-[1000] p-[20px] flex justify-center items-center w-full h-full top-0 left-0`}>
                <div ref={modalRef} className="border-[2px] border-solid border-[#ffcd92] rounded-md">
                    <div className="bg-[#FFE9C9] text-[#523636] flex justify-between items-center font-bold w-full py-[10px] px-[20px]">
                        <h1>Pet Edit</h1>
                        <FontAwesomeIcon onClick={()=>setState('hidden')} icon={faClose} size="sm" className="ml-[20px] cursor-pointer text-[15px]"/>
                    </div>
                    <div className="bg-white p-[50px] flex justify-center flex-wrap items-center gap-[20px]">
                        <div>
                            <label htmlFor={`thumbnail-${pet.id}`}>
                                <Image key={imgKey} src={pet.thumbnail} className="rounded-[50%] w-[80px] h-[80px] object-cover relative" width={10000} height={10000}  alt="website banner" />
                            </label>
                            <input onChange={(e) => {
                                if(e.target.files && e.target.files[0]) {
                                    const tempPath = URL.createObjectURL(e.target.files[0]);
                                    setPet(petState => ({...petState, thumbnail:tempPath}));
                                    setImgKey(new Date().getTime() * Math.random());
                                }
                            }} className="hidden" type="file" name="" id={`thumbnail-${pet.id}`} />
                        </div>
                        <div className="flex flex-col gap-[5px] text-[#5b5351]">
                            <div className="flex items-center justify-center relative">
                                <input className="w-[50%] focus:outline-none text-[26px] bg-[transparent] text-center font-bold text-[#5b5351]" onClick={() => setIcns(icnState => ({...icnState, petNameIcn: faSave}))} onChange={(e) => setPet(petState => ({...petState, name: e.target.value}))} onBlur={() => alrtPopup()} value={pet.name} />
                                <FontAwesomeIcon icon={icns.petNameIcn} size="lg" className="ml-[20px]"/>
                            </div>
                            <div className="flex items-center justify-center relative flex-wrap">
                                <span>{`(${_calculateAge(pet.birthdate)}才) `}</span>
                                <input value={pet.birthdate.toISOString().split('T')[0]} type="date" className="focus:outline-none text-[15px] bg-[transparent] text-center font-bold text-[#5b5351]" onClick={() => setIcns(icnState => ({...icnState, petBdayIcn: faSave}))} onChange={(e) => {setPet(petState => ({...petState, birthdate: new Date(e.target.value)}));}} onBlur={() => alrtPopup()} />
                                <FontAwesomeIcon icon={icns.petBdayIcn} size="lg" className="ml-[20px]"/>
                            </div>
                            <div className="flex items-center justify-center relative">
                                <input value={pet.breed} className="w-[50%] focus:outline-none text-[15px] bg-[transparent] text-center font-bold text-[#5b5351]" onClick={() => setIcns(icnState => ({...icnState, petBreedIcn: faSave}))} onChange={(e) => setPet(petState => ({...petState, breed: e.target.value}))} onBlur={() => alrtPopup()} />
                                <FontAwesomeIcon icon={icns.petBreedIcn} size="lg" className="ml-[20px]"/>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            <div ref={popup} className="hidden z-[1000] top-[50px] w-[100%] flex justify-center opacity-[0.7]">
                <span className="p-4 font-bold mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">保存しました</span>
            </div>
            </>
    )
}