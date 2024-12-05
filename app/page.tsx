import RecipeSlider from "./components/RecipeSlider";
import BirthdayContainer from "./components/BirthdayContainer";
import { Gloria_Hallelujah, Mochiy_Pop_P_One } from "next/font/google";
import { Metadata } from "next";
import { getPopularRecipes, getWeeklyRecipes } from "@/action/recipe";
import { DisplayRecipe } from "@/constants/interface";
import MainSearchForm from "./components/MainSearchForm";
import Link from "next/link";
import TopRecipeSlider from "./components/TopRecipeSlider";
import { memo } from "react";
import BodyMainSearch from "./components/ElementComponents/BodyMainSearch";
import OptImage from "./components/ElementComponents/Image";
import MotionDiv from "./components/ElementComponents/MotionDiv";

const gloria = Gloria_Hallelujah({
  weight: '400',
  subsets: ['latin']
  , display: 'swap', adjustFontFallback: false
});

const mochi = Mochiy_Pop_P_One({
  weight: '400',
  subsets: ['latin']
  , display: 'swap', adjustFontFallback: false
});

const DogCategoryMedCore = () => {
  return (
    <>
    <div className="title">
      <h1 className="text-[26px] tracking-tighter font-bold text-[#523636] relative after:content-[''] z-[1] after:left-[-10px] after:w-[110%] after:h-[40px] after:top-[10px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]">レシピカテゴリ</h1>
      <div className="absolute z-[-1] left-[0px] w-full top-[17px] border-[1px] border-solid border-[#523636]"/>
    </div>
    <div className="first-row w-full flex gap-4 justify-center flex-col items-center  ">
      <h1 className="text-[20px] text-primary-text font-semibold">年齢別で探す</h1>
      <div className="grid grid-cols-3 w-[100%]">
        <Link href="/recipe/search/子犬" className="flex gap-2 text-primary-text font-bold flex-col justify-center items-center">
          <img src={'/LP/puppy-thumbnail.png'} height={70} loading="lazy" className="relative rounded-md"  alt="website banner" />
          <span className="relative text-xs">子犬用レシピ</span>
        </Link>
        <Link href="/recipe/search/成犬" className="flex gap-2 relative text-primary-text font-bold flex-col justify-center items-center">
          <img src={'/LP/adult-thumbnail.png'} height={70} loading="lazy" className="relative rounded-md" alt="website banner" />
          <span className="relative text-xs">成犬用レシピ</span>
        </Link>
        <Link href="/recipe/search/シニア犬" className="flex gap-2 relative text-primary-text font-bold flex-col justify-center items-center">
          <img src={'/LP/senior-thumbnail.png'} height={70} loading="lazy" className="relative rounded-md bottom-[0px]"  alt="website banner" />
          <span className="relative text-xs">シニア犬用レシピ</span>
        </Link>
      </div>
    </div>

    <div className="first-row mt-4 gap-4 w-full flex justify-center flex-col items-center  ">
      <h1 className="text-[20px] text-[#523636] font-semibold">サイズ別で探す</h1>
      <div className="grid grid-cols-3 w-[100%]">
        <Link href="/recipe/search/小型犬" className="flex gap-2 flex-col text-xs text-[#523636] font-bold justify-between items-center">
          <img src={'/LP/smalldog-thumbnail.png'} loading="lazy" className="relative rounded-md" height={70}  alt="website banner" />
          <span className="relative top-[0px]">小型犬用レシピ</span>
        </Link>
        <Link href="/recipe/search/中型犬" className="flex gap-2 flex-col text-xs text-[#523636] font-bold justify-between items-center">
          <img src={'/LP/middledog-thumbnail.png'} loading="lazy" className="relative rounded-md" height={70}  alt="website banner" />
          <span className="relative top-[0px]">中型犬用レシピ</span>
        </Link>
        <Link href="/recipe/search/大型犬" className="flex gap-2 flex-col relative text-xs text-[#523636] font-bold justify-between items-center">
          <img src={'/LP/bigdog-thumbnail.png'} loading="lazy" className="relative rounded-md" height={70}  alt="website banner" />
          <span className="relative top-[0px]">大型犬用レシピ</span>
        </Link>
      </div>
    </div>
    </>
  )
}

const DogCategorySmCore = () => {
  return (
    <>
    <div className="first-row w-full flex gap-4 justify-center flex-col items-center  ">
      <h1 className="text-[20px] text-primary-text font-semibold">年齢別で探す</h1>
      <div className="grid grid-cols-3 w-[100%]">
        <Link href="/recipe/search/子犬" className="flex gap-2 text-primary-text font-bold flex-col justify-center items-center">
          <img src={'/LP/puppy-thumbnail.png'} height={70} loading="lazy" className="relative rounded-md"  alt="website banner" />
          <span className="relative text-xs">子犬用レシピ</span>
        </Link>
        <Link href="/recipe/search/成犬" className="flex gap-2 relative text-primary-text font-bold flex-col justify-center items-center">
          <img src={'/LP/adult-thumbnail.png'} height={70} loading="lazy" className="relative rounded-md" alt="website banner" />
          <span className="relative text-xs">成犬用レシピ</span>
        </Link>
        <Link href="/recipe/search/シニア犬" className="flex gap-2 relative text-primary-text font-bold flex-col justify-center items-center">
          <img src={'/LP/senior-thumbnail.png'} height={70} loading="lazy" className="relative rounded-md bottom-[0px]"  alt="website banner" />
          <span className="relative text-xs">シニア犬用レシピ</span>
        </Link>
      </div>
    </div>

    <div className="first-row mt-4 gap-4 w-full flex justify-center flex-col items-center  ">
      <h1 className="text-[20px] text-[#523636] font-semibold">サイズ別で探す</h1>
      <div className="grid grid-cols-3 w-[100%]">
        <Link href="/recipe/search/小型犬" className="flex gap-2 flex-col text-xs text-[#523636] font-bold justify-between items-center">
          <img src={'/LP/smalldog-thumbnail.png'} loading="lazy" className="relative rounded-md" height={70}  alt="website banner" />
          <span className="relative top-[0px]">小型犬用レシピ</span>
        </Link>
        <Link href="/recipe/search/中型犬" className="flex gap-2 flex-col text-xs text-[#523636] font-bold justify-between items-center">
          <img src={'/LP/middledog-thumbnail.png'} loading="lazy" className="relative rounded-md" height={70}  alt="website banner" />
          <span className="relative top-[0px]">中型犬用レシピ</span>
        </Link>
        <Link href="/recipe/search/大型犬" className="flex gap-2 flex-col relative text-xs text-[#523636] font-bold justify-between items-center">
          <img src={'/LP/bigdog-thumbnail.png'} loading="lazy" className="relative rounded-md" height={70}  alt="website banner" />
          <span className="relative top-[0px]">大型犬用レシピ</span>
        </Link>
      </div>
    </div>
    </>
  )
}

const DogCategoryMed = memo(() => {
  return (
    <div className={`flex flex-col gap-[40px] justify-center items-center mt-[30px] lg:hidden relative`}>
      <DogCategoryMedCore />
    </div>
  )
});

const DogCategorySm = memo(() => {
  return (
    <div className={`flex-col mt-4 justify-center w-[100%] items-start hidden lg:flex relative`}>
      <DogCategorySmCore />
    </div>
  )
});

export default async function Home() {
  const birthdays = [
      '/LP/bday-dogs/puppy1.webp',
      '/LP/bday-dogs/puppy2.webp',
      '/LP/bday-dogs/puppy3.webp',
      '/LP/bday-dogs/puppy4.webp',
      '/LP/bday-dogs/puppy5.webp',
      '/LP/bday-dogs/puppy6.webp',
      '/LP/bday-dogs/puppy7.webp'
  ];

  const [weekly_result, popular_result] = await Promise.all([
    await getWeeklyRecipes(), 
    await getPopularRecipes()
  ]);

  const weeklyRecipes = weekly_result.body as Array<DisplayRecipe>;
  const popularRecipes = popular_result.body as Array<DisplayRecipe>;

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

  return (
    <>
    <main className="relative flex p-[20px] min-h-screen flex-col lg:items-center overflow-hidden pb-[50px] lg:pb-[200px]">
      <div className=" flex max-w-xl h-full justify-center items-center flex-col gap-[15px]">
        <div id="logo-banner" className="mt-8 lg:mt-0 relative flex flex-col justify-center items-center">
          <img src={'/icons/logo-new-v2.png'} className="rounded-md h-[auto] left-[15px] w-[130px] relative" width={130} height={130}  alt="website banner" />
          <h1 className={`text-[36px] text-[#6b4528] font-bold leading-tight ${mochi.className}`}>わんごはん</h1>
          <span className={`text-[10px] text-[#6b4528] ${gloria.className}`}>ALL RECIPES FOR YOUR DOG</span>
        </div>
        <div className="w-full h-full relative flex flex-col gap-[10px]">
          <div className="mt-8 search-form relative flex justify-end lg:hidden">
            <BodyMainSearch />
          </div>
          <div className=' lg:my-4 grid grid-cols-1 lg:grid-cols-5 items-start gap-4'>
            <div className='lg:col-span-3 max-w-full h-full relative' >
              <TopRecipeSlider recipes={popularRecipes}/>
            </div>
            <div className="lg:col-span-2 hidden lg:block invisible lg:visible w-full h-full relative">
              <div className="search-form relative flex justify-end invisible lg:visible">
                <BodyMainSearch />
              </div>
              <DogCategorySm/>
            </div>
          </div>
          <MotionDiv>
            <RecipeSlider title={'今週のレシピ'} recipes={weeklyRecipes}/>
          </MotionDiv>
          <MotionDiv>
            <RecipeSlider title={'人気レシピ'} recipes={popularRecipes}/>
          </MotionDiv>
          {/* Birthday Section */}
          <MotionDiv>
            <BirthdayContainer bdayAvt={birthdays} />
          </MotionDiv>
          <MotionDiv>
            <DogCategoryMed/>
          </MotionDiv>
          <div className="flex flex-col gap-[40px] justify-center items-center mt-[30px] relative">
            <div className="title">
              <h1 className="text-[26px] font-bold text-[#523636] relative after:content-[''] z-[1] after:w-[125%] after:left-[-15px] after:h-[40px] after:top-[10px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]">イベント</h1>
              <div className="absolute z-[-1] left-[0px] w-full top-[17px] border-[1px] border-solid border-[#523636]"/>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {
                events.map( (ev, idx) => {
                  return (
                    <MotionDiv>
                      <div className="w-full text-white flex justify-center">
                        <Link href={ev.url} className="flex gap-[10px] flex-col text-sm text-[#523636] font-bold justify-center items-center">
                          <img src={ev.img} loading="lazy" className="rounded-md h-[auto] w-[100%]" width={250} height={150}  alt="website banner" />{ev.text}</Link>
                      </div>
                    </MotionDiv>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </main>
    <MotionDiv>
      <div className="flex flex-col relative mt-16">
        <h1 className="flex justify-center w-[100%] top-4 items-center absolute text-2xl lg:text-4xl font-bold text-[#523636]">コラム近日開設予定</h1>
        <div className="absolute flex justify-center w-[100%] top-14 lg:top-24">
          <button className=" bg-primary-text rounded-md text-xs text-white py-2 px-4">Column</button>
        </div>
        <img src={'/LP/column.png'} loading="lazy" className="rounded-md w-[100%] h-[100%] inline max-w-none object-fill" width={100} height={100}  alt="website banner" />
      </div>
    </MotionDiv>
    </>
  );
}
