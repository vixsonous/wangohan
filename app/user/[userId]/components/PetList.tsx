"use client";

import { DogData } from "@/constants/interface";
import { useEffect, lazy } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setPets } from "@/lib/redux/states/petSlice";

const PetContainer = lazy(() => import("./PetContainer"));

export default function PetList({pets} : {pets: Array<DogData>}) {

    const dispatch = useAppDispatch();
    const petState = useAppSelector(state => state.pet.pets);
    const isSet = useAppSelector(state => state.pet.isSet);

    useEffect(() => {
        if(!isSet) {
            dispatch(setPets(pets));
        }
    },[]);
    return (
        <div className="pet-list p-[20px] flex flex-wrap gap-[20px] items-center">
            {
                petState.map(pet => <PetContainer key={new Date().getTime() * Math.random()} petData={pet} />)
            }
        </div>
    )
}