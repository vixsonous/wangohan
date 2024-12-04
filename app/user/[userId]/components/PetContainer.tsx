import OptImage from "@/app/components/ElementComponents/Image";
import { DogData } from "@/constants/interface";
import Image from "next/image"
import { memo } from "react";

interface Props {
    petData: DogData,
    className?: string
}

export default memo(function PetContainer ({petData, className=''}: Props) {

  function _calculateAge(birthDate : Date) { // birthday is a date
      var ageDifMs = Date.now() - birthDate.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  
  return (
      <div className={`flex md:flex-col flex-grow flex-shrink-0 justify-center items-center gap-2 ${className}`}>
          <div className="hidden md:block">
              <OptImage src={petData.pet_image} centered className=" rounded-full object-cover relative" square width={150} height={150}  alt="website banner"/>
          </div>
          <div className="block md:hidden">
              <OptImage src={petData.pet_image} centered className=" rounded-full object-cover relative" square width={60} height={60}  alt="website banner"/>
          </div>
          <div className="flex flex-col gap-[5px] text-[#5b5351]">
              <p className="text-base md:text-xl font-bold">{petData.pet_name}</p>
              <p className="text-xs md:text-sm flex gap-[5px] flex-wrap"><span>{`(${_calculateAge(new Date(petData.pet_birthdate))}才) `}</span><span>{petData.pet_birthdate.split('T')[0]}</span></p>
              <p className="text-xs md:text-sm">{petData.pet_breed}</p>
          </div> 
      </div>
  )
})