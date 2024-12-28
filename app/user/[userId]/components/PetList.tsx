"use client";

import { DogData } from "@/constants/interface";
import React, { useEffect, lazy, useState, CSSProperties } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setPets } from "@/lib/redux/states/petSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { defineScreenMode } from "@/constants/constants";
import { Navigation } from "swiper/modules";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const PetContainer = lazy(() => import("./PetContainer"));

export default function PetList({pets} : {pets: Array<DogData>}) {

    const dispatch = useAppDispatch();
    const petState = useAppSelector(state => state.pet.pets);
    const isSet = useAppSelector(state => state.pet.isSet);
    const [state, setState] = useState({
      mdStart: '1',
      lgStart: '1'
    });
    const [scMode, setScMode] = useState(0);

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

    useEffect(() => {
      if(typeof window === 'undefined') return;
      setScMode(defineScreenMode());
      window.addEventListener('resize', () => setScMode(defineScreenMode()));
      return () => {
          window.removeEventListener('resize', () => setScMode(defineScreenMode()));
      };
    },[]);

    const user_id = useAppSelector(state => state.user.user.user_id);

    return (
        <>
        {
          isSet && petState.length === 0 && (
            <div className="md:min-h-[332px] md:min-w-[796px] flex justify-center items-start">
              <Link href={`/user/settings/${user_id}?=#register-pet`} className="text-lg font-bold">愛犬を登録する</Link>
            </div>
          )
        }
        {
          isSet ? (
            <React.Fragment>
              {
                petState.length > 0 && (
                  // <div className={`md:hidden pet-list py-16 p-4 grid grid-cols-2 ${petState.length <=3 ? state.mdStart:'md:grid-cols-3'} ${petState.length <=3 ? `lg:grid-cols-${petState.length}`:'lg:grid-cols-5'} gap-8 items-center`}>
                  <div className={`pet-list py-8 md:py-4 p-4 grid ${petState.length === 1 ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'} gap-8 items-center`}>
                  { 
                    petState.map((pet, idx) => <React.Fragment key={idx}><PetContainer petData={pet} /></React.Fragment>)
                  }
                  </div>
                )
              }
              
            </React.Fragment>
          ) : (
            <div>
              Loading...
            </div>
          )
        }
        </>
    )
}