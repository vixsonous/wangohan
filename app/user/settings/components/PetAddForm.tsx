'use client';

import { faArrowLeft, faCircleNotch, faClose, faEdit, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useRef, useState } from "react";

export default function PetAddForm() {

    // Pet add
    const [addPet, setAddPet] = useState(false);
    const [state, setState] = useState('hidden');
    const [imgKey, setImgKey] = useState(new Date().getTime() * Math.random());
    const [pet, setPet] = useState({
        thumbnail: '/icons/default-pet.jpg',
        name: '',
        birthdate: new Date(0),
        breed: ''
    })
    const [icns, setIcns] = useState({
        petNameIcn: faEdit,
        petBdayIcn: faEdit,
        petBreedIcn: faEdit,
    });

    const modalRef = useRef<HTMLDivElement>(null);

    return (
        <>
        <div className="p-[20px] flex flex-wrap justify-between items-center">
            <button onClick={(e:SyntheticEvent)=> {
                e.preventDefault();
                setState('fixed');
            }}><FontAwesomeIcon icon={faPlus}/> 家族を追加</button>
            <Link href={"/user"}><FontAwesomeIcon icon={faArrowLeft}/> 戻る</Link>
        </div>

        {/* Add Pet Popup */}
        <div className={`bg-[rgba(0,0,0,0.2)] ${state} z-[1000] p-[20px] flex justify-center items-center w-full h-full top-0 left-0`}>
            <div ref={modalRef} className="border-[2px] border-solid border-[#ffcd92] rounded-md">
                <div className="bg-[#FFE9C9] text-[#523636] flex justify-between items-center font-bold w-full py-[10px] px-[20px]">
                    <h1>Add Pet</h1>
                    <FontAwesomeIcon onClick={()=>setState('hidden')} icon={faClose} size="sm" className="ml-[20px] cursor-pointer text-[15px]"/>
                </div>
                <div className="bg-[#FFFAF0] p-[30px] flex justify-center flex-wrap items-center gap-[20px]">
                    <div>
                        <label htmlFor={`thumbnail-0`} className="relative group">
                            <Image key={imgKey} src={pet.thumbnail} className="
                            rounded-[50%] w-[190px] h-[190px] object-cover relative" width={10000} height={10000}  alt="website banner" />
                            <div className="absolute w-full h-full bg-black group-hover:opacity-[0.3] opacity-0 top-0 flex justify-center items-center rounded-[50%] transition-all duration-500">
                                <span className="text-white font-bold">画像を追加</span>
                            </div>
                        </label>
                        <input onChange={(e) => {
                            if(e.target.files && e.target.files[0]) {
                                const tempPath = URL.createObjectURL(e.target.files[0]);
                                setPet(petState => ({...petState, thumbnail:tempPath}));
                                setImgKey(new Date().getTime() * Math.random());
                            }
                        }} className="hidden" type="file" name="" id={`thumbnail-0`} />
                    </div>
                    <div className="flex flex-col gap-[5px] text-[#5b5351]">
                        <div>
                            <label htmlFor="pet-name">Pet Name</label>
                            <div className="flex items-center justify-center relative w-[100%] px-[10px] py-[5px] border-[2px] rounded-md border-[#ffcd92]">
                                <input id="pet-name" className="w-[100%] focus:outline-none text-[1em] bg-[transparent] text-left font-bold text-[#5b5351]" onClick={() => setIcns(icnState => ({...icnState, petNameIcn: faSave}))} onChange={(e) => setPet(petState => ({...petState, name: e.target.value}))} onBlur={() => () => setIcns(icnState => ({...icnState, petNameIcn: faEdit}))} value={pet.name} />
                                <FontAwesomeIcon icon={icns.petNameIcn} size="lg" className="absolute right-[5px]"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Pet Birthdate</label>
                            <div className="appearance-none w-full flex items-center justify-between relative flex-wrap w-[100%] px-[10px] py-[4px] border-[2px] rounded-md border-[#ffcd92]">
                                <input className="appearance-none focus:outline-none text-[1em] bg-[transparent] text-left font-bold text-[#5b5351]" value={pet.birthdate.getTime() !== new Date(0).getTime() ? pet.birthdate.toISOString().split('T')[0] : ''} type="date" onClick={() => setIcns(icnState => ({...icnState, petBdayIcn: faSave}))} onChange={(e) => {setPet(petState => ({...petState, birthdate: new Date(e.target.value)}));}} onBlur={() => setIcns(icnState => ({...icnState, petBdayIcn: faEdit}))} />
                                <FontAwesomeIcon icon={icns.petBdayIcn} size="lg" className="absolute right-[5px]"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Pet Breed</label>
                            <div className="flex items-center justify-center relative w-[100%] px-[10px] py-[5px] border-[2px] rounded-md border-[#ffcd92]">
                                <input value={pet.breed} className="w-[100%] focus:outline-none text-[1em] bg-[transparent] text-left font-bold text-[#5b5351]" onClick={() => setIcns(icnState => ({...icnState, petBreedIcn: faSave}))} onChange={(e) => setPet(petState => ({...petState, breed: e.target.value}))} onBlur={() => () => setIcns(icnState => ({...icnState, petBreedIcn: faEdit}))} />
                                <FontAwesomeIcon icon={icns.petBreedIcn} size="lg" className="absolute right-[5px]"/>
                            </div>
                        </div>
                    </div> 
                    <div className="w-full flex justify-center">
                        <button type="submit" className="w-[100%] max-w-[190px] bg-[#ffb762] text-white py-[10px] rounded-md text-[12px] sm:text-[16px]" onClick={(e:SyntheticEvent)=> {
                            e.preventDefault();
                            setState('fixed');
                        }}>
                            {!addPet ? (
                                <><FontAwesomeIcon icon={faPlus}/> 家族を追加</>
                            ): (
                                <FontAwesomeIcon icon={faCircleNotch} spin size="lg"/>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}