'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs } from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

export default function ImageSwiper({recipe_images}:{recipe_images:string[]}) {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <>
        <Swiper
            className='w-full h-[30vh]'
            modules={[Navigation, Pagination, Thumbs]}
            spaceBetween={50}
            slidesPerView={1}
            thumbs={{ swiper: thumbsSwiper }}
            navigation
            pagination={{ clickable: true }}
            >
            {
                recipe_images.map((img, idx) => {
                    return (
                        <SwiperSlide key={idx} className="relative">
                            <img key={idx} src={img} className="object-cover relative h-[100%] rounded-[0px] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
        {recipe_images.length > 1 ? (
            <div className='p-[5px] m-[0]'>
                <Swiper
                    key={recipe_images.length}
                    onSwiper={setThumbsSwiper}
                    loop={recipe_images.length > 3}
                    slidesPerView={recipe_images.length < 3 ? recipe_images.length : 3}
                    spaceBetween={5}
                    watchSlidesProgress={true}
                    modules={[ Navigation, Thumbs]}
                    className="h-[100px]"
                    >
                    {
                        recipe_images.map((img, idx) => {
                            return (
                                <SwiperSlide key={idx} className="relative">
                                    <img src={img} className="object-cover relative h-[100%] rounded-[0px] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        ) : null}
        </>
    )
}