'use client';
import { DisplayRecipe } from '@/constants/interface';
import { CSSProperties, memo } from 'react';
import {  Pagination, Autoplay} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

export default memo(function TopRecipeSlider({
  recipes, 
}:{
  recipes:Array<DisplayRecipe>, 
}) {

  return (
      <div className='relative'>
          <Swiper
              className='w-full h-[50vh]'
              modules={[ Autoplay, Pagination]}
              spaceBetween={50}
              slidesPerView={1}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            speed={1000}
              pagination={{ clickable: true }}
              style={{
                  "--swiper-pagination-color": "#FFE9C9",
                  "--swiper-navigation-color": "#FFE9C9",
                  "--swiper-pagination-bullet-inactive-color": "#999999",
                  "--swiper-pagination-bullet-inactive-opacity": "1",
              } as CSSProperties} 
              >
              {
                  recipes.map((img, idx) => {
                    console.log(img.recipe_image)
                      return (
                          <SwiperSlide key={idx} className="relative">
                              <div className='absolute top-0 w-full h-full bg-primary-text opacity-10 z-[-1]'></div>
                              <img key={idx} src={img.recipe_image} className="object-contain relative h-[100%] rounded-[0px] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />
                          </SwiperSlide>
                      )
                  })
              }
          </Swiper>
      </div>
  )
});