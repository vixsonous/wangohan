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

    const mdStart = petState.length === 1 ? '2' : '1';
    const lgStart = petState.length <= 3 ? `${(petState.length - 1) - 3}` : '1'
    return (
        <div className="pet-list py-16 p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            { 
                petState.map((pet, idx) => <PetContainer className={`first:col-start-1 md:col-start-${mdStart} lg:col-start-${lgStart}`} petData={pet} />)
            }
        </div>
    )
}