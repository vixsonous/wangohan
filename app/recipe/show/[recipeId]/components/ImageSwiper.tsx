'use client';
import { textColor } from '@/constants/constants';
import { faEdit, faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { CSSProperties, useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs } from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import RecipeOptions from './RecipeOptions';
import { useAppSelector } from '@/lib/redux/hooks';

export default function ImageSwiper({
    recipe_images, 
    recipe_id, 
    owner_id, 
    loginSts
}:{
    recipe_images:string[], 
    recipe_id: number, 
    owner_id: number, 
    loginSts: {
        isLoggedIn: boolean, 
        user_id: number
    }
}) {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();

    useEffect(() => {
        if (thumbsSwiper) {
          setTimeout(() => {
            setThumbsSwiper(thumbsSwiper);
          }, 100); // Adjust the delay as needed
        }
    }, [thumbsSwiper]);
    
    return (
        <div className='relative'>
            {loginSts.isLoggedIn && owner_id === loginSts.user_id && <RecipeOptions recipe_id={recipe_id} />}
            <Swiper
                className='w-full h-[50vh]'
                modules={[Navigation, Pagination, Thumbs]}
                spaceBetween={50}
                slidesPerView={1}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                navigation
                pagination={{ clickable: true }}
                style={{
                    "--swiper-pagination-color": "#FFE9C9",
                    "--swiper-navigation-color": "#FFE9C9",
                    "--swiper-pagination-bullet-inactive-color": "#999999",
                    "--swiper-pagination-bullet-inactive-opacity": "1",
                } as CSSProperties} 
                >
                {
                    recipe_images.map((img, idx) => {
                        return (
                            <SwiperSlide key={idx} className="relative">
                                <div className='absolute top-0 w-full h-full bg-primary-text opacity-50 z-[-1]'></div>
                                <img key={idx} src={img} className="object-contain relative h-[100%] rounded-[0px] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            {recipe_images.length > 1 ? (
                <div className='p-2 md:px-0 m-[0]'>
                    <Swiper
                        key={recipe_images.length}
                        onSwiper={setThumbsSwiper}
                        loop={recipe_images.length > 3}
                        slidesPerView={recipe_images.length < 3 ? recipe_images.length : 3}
                        spaceBetween={5}
                        watchSlidesProgress={true}
                        modules={[ Navigation, Thumbs]}
                        className="h-32"
                        >
                        {
                            recipe_images.map((img, idx) => {
                                return (
                                    <SwiperSlide key={idx} className="relative">
                                        <img loading='lazy' src={img} className="object-cover relative h-[100%] rounded-[0px] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            ) : null}
        </div>
    )
}