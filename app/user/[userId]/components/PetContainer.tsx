import OptImage from "@/app/components/ElementComponents/Image";
import { DogData } from "@/constants/interface";
import Image from "next/image"
import { memo } from "react";

interface Props {
    petData: DogData
}

export default memo(function PetContainer ({petData}: Props) {

  function _calculateAge(birthDate : Date) { // birthday is a date
      var ageDifMs = Date.now() - birthDate.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  
  return (
      <div className="flex flex-grow flex-shrink-0 justify-center items-center gap-4">
          <div>
              <OptImage src={petData.pet_image} centered className="hidden md:block rounded-full object-cover relative" square width={150} height={150}  alt="website banner"/>
              <OptImage src={petData.pet_image} centered className="block md:hidden rounded-full object-cover relative" square width={60} height={60}  alt="website banner"/>
          </div>
          <div className="flex flex-col gap-[5px] text-[#5b5351]">
              <p className="text-base md:text-xl font-bold">{petData.pet_name}</p>
              <p className="text-xs md:text-sm flex gap-[5px] flex-wrap"><span>{`(${_calculateAge(new Date(petData.pet_birthdate))}才) `}</span><span>{petData.pet_birthdate.split('T')[0]}</span></p>
              <p className="text-xs md:text-sm">{petData.pet_breed}</p>
          </div> 
      </div>
  )
})