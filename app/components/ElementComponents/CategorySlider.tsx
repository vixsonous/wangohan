"use client";

import Link from "next/link";
import OptImage from "./Image";
import { CSSProperties, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const DogCategoryLgCore = () => {
  return (
    <>
    <div className="first-row w-full flex gap-4 justify-center flex-col items-center">
      <h1 className="text-[20px] text-primary-text font-semibold">年齢別で探す</h1>
      <div className="grid grid-cols-3 w-[100%]">
        <Link href="/recipe/search/子犬" className="flex gap-2 text-primary-text font-bold flex-col justify-center items-center">
          <OptImage src={'/LP/puppy-thumbnail.png'} height={70} loading="lazy" className="relative rounded-md"  alt="website banner" />
          <span className="relative text-xs">子犬用レシピ</span>
        </Link>
        <Link href="/recipe/search/成犬" className="flex gap-2 relative text-primary-text font-bold flex-col justify-center items-center">
          <OptImage src={'/LP/adult-thumbnail.png'} height={70} loading="lazy" className="relative rounded-md" alt="website banner" />
          <span className="relative text-xs">成犬用レシピ</span>
        </Link>
        <Link href="/recipe/search/シニア犬" className="flex gap-2 relative text-primary-text font-bold flex-col justify-center items-center">
          <OptImage src={'/LP/senior-thumbnail.png'} height={70} loading="lazy" className="relative rounded-md bottom-[0px]"  alt="website banner" />
          <span className="relative text-xs">シニア犬用レシピ</span>
        </Link>
      </div>
    </div>
    <div className="first-row mt-4 gap-4 w-full flex justify-center flex-col items-center  ">
      <h1 className="text-[20px] text-[#523636] font-semibold">サイズ別で探す</h1>
      <div className="grid grid-cols-3 w-[100%]">
        <Link href="/recipe/search/小型犬" className="flex gap-2 flex-col text-xs text-[#523636] font-bold justify-between items-center">
          <OptImage src={'/LP/smalldog-thumbnail.png'} loading="lazy" className="relative rounded-md" height={70}  alt="website banner" />
          <span className="relative top-[0px]">小型犬用レシピ</span>
        </Link>
        <Link href="/recipe/search/中型犬" className="flex gap-2 flex-col text-xs text-[#523636] font-bold justify-between items-center">
          <OptImage src={'/LP/middledog-thumbnail.png'} loading="lazy" className="relative rounded-md" height={70}  alt="website banner" />
          <span className="relative top-[0px]">中型犬用レシピ</span>
        </Link>
        <Link href="/recipe/search/大型犬" className="flex gap-2 flex-col relative text-xs text-[#523636] font-bold justify-between items-center">
          <OptImage src={'/LP/bigdog-thumbnail.png'} loading="lazy" className="relative rounded-md" height={70}  alt="website banner" />
          <span className="relative top-[0px]">大型犬用レシピ</span>
        </Link>
      </div>
    </div>
    </>
  )
}

const DogCategoryLg = memo(() => {
  return (
    <div id="category" className={`flex-col mt-4 justify-center w-[100%] items-start relative`}>
      <DogCategoryLgCore />
    </div>
  )
});

const events = [
  {text: 'お誕生日', img: '/LP/event/birthday.webp', url: '/recipe/search/お誕生日'},
  {text: 'おうち記念日', img: '/LP/event/ouchianniversary.webp', url: '/recipe/search/おうち記念日'},
  {text: 'お正月', img: '/LP/event/newyears.webp', url: '/recipe/search/お正月'},
  {text: '節分', img: '/LP/event/setsubun.webp', url: '/recipe/search/節分'},
  {text: 'ひな祭り', img: '/LP/event/hinamatsuri.webp', url: '/recipe/search/ひな祭り'},
  {text: 'こどもの日', img: '/LP/event/kodomonohi.webp', url: '/recipe/search/こどもの日'},
  {text: '七夕', img: '/LP/event/tanabata.webp', url: '/recipe/search/七夕'},
  {text: 'ハロウィン', img: '/LP/event/halloween.webp', url: '/recipe/search/ハロウィン'},
  {text: 'クリスマス', img: '/LP/event/christmas.webp', url: '/recipe/search/クリスマス'},
  {text: 'おやつ', img: '/LP/event/snack.webp', url: '/recipe/search/おやつ'},
]

const EventCategoryLgCore = () => {
  return (
    <>
    <div className="first-row w-full flex gap-4 justify-center flex-col items-center">
      <h1 className="text-[20px] text-primary-text font-semibold">イベント別で探す</h1>
      <div className="grid grid-cols-5 gap-y-12 w-[100%]">
        {
          events.map( (ev, idx) => {
            return (
              <Link key={idx} href={ev.url} className="flex gap-2 text-primary-text font-bold flex-col justify-center items-center">
                <OptImage src={ev.img} height={70} loading="lazy" className="relative rounded-md"  alt="website banner" />
                <span className="relative text-[.7rem] sm:text-xs">{ev.text}</span>
              </Link>
            )
          })
        }
      </div>
    </div>
    </>
  )
}

const EventCategoryLg = memo(() => {
  return (
    <div className={`flex-col mt-4 justify-center w-[100%] items-start relative`}>
      <EventCategoryLgCore />
    </div>
  )
});

export default function CategorySlider() {

  return (
    <Swiper id="category" pagination={{
      clickable: true
    }} className="w-full h-full" modules={[Pagination]} style={{
                        "--swiper-pagination-color": "#FFBA08",
                        "--swiper-pagination-bullet-inactive-color": "#999999",
                        "--swiper-pagination-bullet-inactive-opacity": "1",
                        "--swiper-pagination-bullet-size": "8px",
                        "--swiper-pagination-bullet-horizontal-gap": "4px"
                    } as CSSProperties} >
      <SwiperSlide>
        <DogCategoryLg />
      </SwiperSlide>
      <SwiperSlide>
        <EventCategoryLg />
      </SwiperSlide>
    </Swiper>
  )
}