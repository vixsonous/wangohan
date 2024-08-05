'use client';
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { RefObject, useRef, useState } from "react";
import PetEditForm from "./PetEditForm";

interface DogData {
    id: number,
    thumbnail: string,
    name: string,
    birthdate: Date,
    breed: string
}

interface Props {
    pets: Array<DogData>
}
export default function EditForm({pets} : Props) {

    const [usrnm, setUsrnm] = useState('あみち');


    const popup = useRef<HTMLDivElement>(null);
    const alrtPopup = () => {
        if(popup.current) {
            
            setCurUsrnmIcn(faEdit)
            popup.current.classList.add("absolute");
            popup.current.classList.remove("hidden");

            setTimeout(() => {
                if(popup.current){
                    popup.current.classList.remove("absolute");
                    popup.current.classList.add("hidden");
                }
                
            }, 3000);
        }
    }

    const [curUsrnmIcn, setCurUsrnmIcn] = useState(faEdit);

    return (
        <form action="" className="relative">
            <div className="user-image flex flex-col justify-center items-center mt-[30px]">
                <div>
                    <Image src={'/resource/dog-and-cat.jpg'} className="rounded-[100px] w-[200px] h-[200px] relative" width={10000} height={10000}  alt="website banner" />
                </div>
                <span className="text-[10px] mb-[1vh]">タップして画像を変更</span>
                <div className="flex justify-center items-center relative left-[20px]">
                    <input onClick={() => setCurUsrnmIcn(faSave)} onChange={(e) => setUsrnm(e.currentTarget.value)} onBlur={() => alrtPopup()} value={usrnm} className="w-[50%] focus:outline-none focus:border-transparent focus:ring-0 text-[36px] bg-[transparent] text-center font-bold text-[#5b5351]" />
                    <FontAwesomeIcon icon={curUsrnmIcn} size="lg" className="ml-[20px]"/>
                </div>
            </div>
            <div className="flex justify-center items-center relative mt-[40px] mb-[10px]">
                <h1 className="absolute top-[10px] font-semibold text-[#523636]">うちのわん</h1>
                <Image src={'/icons/ribbon.png'} className="h-[auto] w-[200px] sm:w-[300px] max-w-none" width={10000} height={10000}  alt="website banner" />
            </div>
            <div className="pet-list p-[20px] flex flex-wrap gap-[20px] items-center">
                {
                    pets.map(pet => <PetEditForm petData={pet} />)
                }
            </div>
            <div ref={popup} className="hidden top-0 w-[100%] flex justify-center opacity-[0.7]">
                <span className="p-4 font-bold mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">保存しました</span>
            </div>
        </form>
    )
}