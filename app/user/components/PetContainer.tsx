import { DogData } from "@/constants/interface";
import Image from "next/image"

interface Props {
    petData: DogData
}

export default function PetContainer ({petData}: Props) {

    function _calculateAge(birthDate : Date) { // birthday is a date
        var ageDifMs = Date.now() - birthDate.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
        
    return (
        <div className="flex flex-grow flex-shrink-0 basis-[30%] justify-center items-center gap-[20px]">
            <div>
                <Image src={petData.pet_image} className="rounded-[50%] w-[50px] h-[50px] object-cover relative" width={10000} height={10000}  alt="website banner" />
            </div>
            <div className="flex flex-col gap-[5px] text-[#5b5351]">
                <p className="text-[16px] font-bold">{petData.pet_name}</p>
                <p className="text-[10px] flex gap-[5px] flex-wrap"><span>{`(${_calculateAge(petData.pet_birthdate)}才) `}</span><span>{petData.pet_birthdate.toISOString().split('T')[0]}</span></p>
                <p className="text-[10px]">{petData.pet_breed}</p>
            </div> 
        </div>
    )
}