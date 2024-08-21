'use client';
import { DogData } from "@/constants/interface";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const PetContainer = React.lazy(() => import("./PetContainer"));
const TabList = React.lazy(() => import("./TabList"));

interface Props {
    image_url: string,
    userDetails: {
        pets: {
            pet_id: number;
            pet_name: string;
            pet_birthdate: Date;
            pet_breed: string;
            pet_image: string;
        }[];
        user_codename: string;
        user_detail_id: number;
        user_image: string;
    },
    decryptedSession: any,
    pets: DogData[]
}

export default function UserDisplay({image_url, userDetails, decryptedSession, pets} : Props) {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const onLoad = () => {
            setLoading(false);
          };
          
          // Ensure the script is loaded
          window.addEventListener('load', onLoad);
      
          // Cleanup listener
          return () => window.removeEventListener('load', onLoad);
    });
    return (
        <>
        {!loading ? (
            <div className="relative pb-[100px]">
                <div className="user-image flex flex-col justify-center items-center mt-[30px]">
                    <Image loading="lazy" src={image_url} className="rounded-[100px] w-[150px] h-[150px] relative" width={10000} height={10000}  alt="website banner" />
                    <h1 className="text-[36px] font-bold text-[#5b5351]">{userDetails.user_codename === '' ? `Wanuser` + decryptedSession.user.user_id : userDetails.user_codename}</h1>
                </div>
                <div className="flex justify-center items-center relative mt-[10px] mb-[30px]">
                    <h1 className="absolute top-[10px] font-semibold text-[#523636]">うちのわん</h1>
                    <Image loading="lazy" src={'/icons/ribbon.png'} className="h-[auto] w-[200px] sm:w-[300px] max-w-none" width={10000} height={10000}  alt="website banner" />
                </div>
                <div className="pet-list p-[20px] flex flex-wrap gap-[20px] items-center">
                    {
                        pets.map(pet => <PetContainer key={new Date().getTime() * Math.random()} petData={pet} />)
                    }
                </div>
                <TabList />
                <div className="fixed bottom-[20px] z-[9999] right-[10px]">
                    <Image loading="lazy" src={'/Setting/settingpaw.png'} className="h-[auto] w-[120px]  max-w-none" width={10000} height={10000}  alt="website banner" />
                    <span className="relative bottom-[33px] text-[13px] text-white right-[-45px]">設定</span>
                </div>
            </div>
        ) : (
            <FontAwesomeIcon icon={faCircleNotch} spin size="sm"/>
        )
        
        }
        </>
    )
}