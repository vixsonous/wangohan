'use client';
import { faCircleNotch, faClose, faEdit, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { RefObject, SyntheticEvent, useEffect, useRef, useState } from "react";
import PetEditForm from "./PetEditForm";
import PetAddForm from "./PetAddForm";
import { userDetails } from "@/constants/interface";

interface DogData {
    id: number,
    thumbnail: string,
    name: string,
    birthdate: Date,
    breed: string
}

interface Props {
    userDetails: userDetails,
    pets: Array<DogData>
}
export default function EditForm({userDetails, pets} : Props) {

    const [usrnm, setUsrnm] = useState(userDetails.user_codename);
    const popup = useRef<HTMLDivElement>(null);

    const [profilePic, setProfilePic] = useState({
        thumbnail: userDetails.user_image !== '' ? userDetails.user_image: '/icons/user.png',
        picture: null,
        imgKey: 0
    } as {
        thumbnail: string,
        picture: File | null,
        imgKey: number
    })

    const [curUsrnmIcn, setCurUsrnmIcn] = useState(faEdit);

    return (
        <form action="" className="relative max-w-[768px]">
            <div className="user-image flex flex-col justify-center items-center mt-[30px]">
                <label htmlFor="profile-image" className="relative group">
                    <img src={profilePic.thumbnail} className="border-[1px] border-[#523636] rounded-[100px] w-[200px] h-[200px] relative object-cover" width={10000} height={10000}  alt="website banner" />
                    <input onChange={(e) => {
                        if(e.target.files && e.target.files[0]) {
                            const tempPath = URL.createObjectURL(e.target.files[0]);
                            const file = e.target.files[0];
                            setProfilePic(prevState => ({...prevState, thumbnail:tempPath, imgKey: new Date().getTime() * Math.random(), picture: file}));
                        }
                    }} className="w-[100%] hidden" type="file" name="profile-image" id="profile-image" />
                    <div className="absolute w-full h-full bg-black group-hover:opacity-[0.3] opacity-0 top-0 flex justify-center items-center rounded-[50%] transition-all duration-500">
                        <span className="text-white font-bold">画像を追加</span>
                    </div>
                </label>
                <span className="text-[10px] mb-[1vh]">タップして画像を変更</span>
                <div className="flex justify-center items-center relative left-[20px] overflow-hidden w-[80%]">
                    <input onClick={() => setCurUsrnmIcn(faSave)} onChange={(e) => setUsrnm(e.currentTarget.value)} value={usrnm} className=" focus:outline-none focus:border-transparent focus:ring-0 text-[36px] bg-[transparent] text-center font-bold text-[#5b5351]" />
                    <FontAwesomeIcon icon={curUsrnmIcn} size="lg" className="ml-[20px] text-[20px]"/>
                </div>
            </div>
            <div className="flex justify-center items-center relative mt-[40px] mb-[10px]">
                <h1 className="absolute top-[10px] font-semibold text-[#523636]">うちのわん</h1>
                <img src={'/icons/ribbon.png'} className="h-[auto] w-[200px] sm:w-[300px] max-w-none" width={10000} height={10000}  alt="website banner" />
            </div>
            <div className="pet-list p-[20px] flex flex-wrap gap-[20px] items-center">
                {
                    pets.map((pet, idx) => <PetEditForm key={idx} petData={pet} />)
                }
            </div>
            <PetAddForm />
            <div ref={popup} className="hidden top-0 w-[100%] flex justify-center opacity-[0.7]">
                <span className="p-4 font-bold mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">保存しました</span>
            </div>
        </form>
    )
}