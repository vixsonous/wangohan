"use client";

import { DogData } from "@/constants/interface";
import React, { useEffect, lazy, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setPets } from "@/lib/redux/states/petSlice";

const PetContainer = lazy(() => import("./PetContainer"));

export default function PetList({pets} : {pets: Array<DogData>}) {

    const dispatch = useAppDispatch();
    const petState = useAppSelector(state => state.pet.pets);
    const isSet = useAppSelector(state => state.pet.isSet);
    const [state, setState] = useState({
      mdStart: '1',
      lgStart: '1'
    })

    useEffect(() => {
        if(!isSet) {
            dispatch(setPets(pets));
        }
    },[]);

    useEffect(() => {
      setState({
        mdStart: petState.length === 3 ? `md:grid-cols-3` : petState.length === 2 ? `md:grid-cols-2`: petState.length === 1 ? `md:grid-cols-1` : `md:grid-cols-3`,
        lgStart: petState.length === 3 ? `lg:grid-cols-3` : petState.length === 2 ? `lg:grid-cols-2`: petState.length === 1 ? `lg:grid-cols-1` : `lg:grid-cols-5`
      })
    },[petState]);

    return (
        <>
        {
          isSet ? (
            <div className={`pet-list py-16 p-4 grid grid-cols-2 ${petState.length <=3 ? state.mdStart:'md:grid-cols-3'} ${petState.length <=3 ? `lg:grid-cols-${petState.length}`:'lg:grid-cols-5'} gap-8 items-center`}>
              { 
                petState.map((pet, idx) => <React.Fragment key={idx}><PetContainer petData={pet} /></React.Fragment>)
              }
            </div>
          ) : (
            <div>
              Loading...
            </div>
          )
        }
        </>
    )
}