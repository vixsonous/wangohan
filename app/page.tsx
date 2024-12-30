import RecipeSlider from "./components/RecipeSlider";
import BirthdayContainer from "./components/BirthdayContainer";
import { Gloria_Hallelujah, Mochiy_Pop_P_One } from "next/font/google";
import { Metadata } from "next";
import { getPopularRecipes, getWeeklyRecipes } from "@/action/recipe";
import { DisplayRecipe, DogData } from "@/constants/interface";
import Link from "next/link";
import TopRecipeSlider from "./components/TopRecipeSlider";
import { memo } from "react";
import BodyMainSearch from "./components/ElementComponents/BodyMainSearch";
import MotionDiv from "./components/ElementComponents/MotionDiv";
import { getBdayPets } from "@/action/pet";
import OptImage from "./components/ElementComponents/Image";
import HomeNavigation from "./components/ElementComponents/HomeNavigation";
import CategorySlider from "./components/ElementComponents/CategorySlider";

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

const DogCategoryMedCore = () => {
  return (
    <>
    <div className="title">
      <h1 className="text-[26px] tracking-tighter font-bold text-[#523636] relative after:content-[''] z-[1] after:left-[-10px] after:w-[110%] after:h-[40px] after:top-[10px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]">レシピを探す</h1>
      <div className="absolute z-[-1] left-[0px] w-full top-[17px] border-[1px] border-solid border-[#523636]"/>
    </div>
    <div className="first-row w-full flex gap-4 justify-center flex-col items-center  ">
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

    <div className="first-row mt-4 gap-4 w-full flex justify-center flex-col items-center  ">
      <h1 className="text-[20px] text-[#523636] font-semibold">イベントで探す</h1>
      <div className="grid grid-cols-2 gap-4 w-[100%]">
        {
          events.map( (ev, idx) => {
            return (
              <Link key={idx} href={ev.url} className="flex gap-2 flex-col text-xs text-[#523636] font-bold justify-between items-center">
                <OptImage src={ev.img} loading="lazy" className="relative rounded-md" height={70}  alt="website banner" />
                <span className="relative top-[0px]">{ev.text}</span>
              </Link>
            )
          })
        }
      </div>
    </div>
    </>
  )
}

const DogCategoryMed = memo(() => {
  return (
    <div id="category-sm" className={`flex flex-col gap-[40px] justify-center items-center mt-[30px] lg:hidden relative`}>
      <DogCategoryMedCore />
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

  const [weekly_result, popular_result, bdayPets] = await Promise.all([
    await getWeeklyRecipes(), 
    await getPopularRecipes(),
    await getBdayPets()
  ]);

  const bday = bdayPets.map(p => {
    return {
      pet_id: p.pet_id,
      pet_image: p.pet_image,
      pet_name: p.pet_name,
      pet_birthdate: p.pet_birthdate.toISOString(),
      pet_breed: p.pet_breed
    }
  }) as DogData[];

  const weeklyRecipes = weekly_result.body as Array<DisplayRecipe>;
  const popularRecipes = popular_result.body as Array<DisplayRecipe>;

  return (
    <>
    <main className="relative flex px-6 py-6 lg:px-0 min-h-screen flex-col lg:items-center overflow-hidden pb-[50px] lg:pb-[200px]">
      <div className=" flex max-w-xl h-full justify-center items-center flex-col">
        <div id="logo-banner" className="mt-8 lg:mt-0 relative flex flex-col justify-center items-center">
          <img src={'/icons/logo-new-v2.png'} className="rounded-md h-[auto] left-[15px] w-[130px] relative" width={130} height={130}  alt="website banner" />
          <h1 className={`text-[36px] text-[#6b4528] font-bold leading-tight ${mochi.className}`}>わんごはん</h1>
          <span className={`text-[10px] text-[#6b4528] ${gloria.className}`}>ALL RECIPES FOR YOUR DOG</span>
        </div>
        <HomeNavigation />
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
              <CategorySlider/>
            </div>
          </div>
          <MotionDiv>
            <DogCategoryMed/>
          </MotionDiv>
          <MotionDiv>
            <RecipeSlider title={'今週のレシピ'} recipes={weeklyRecipes}/>
          </MotionDiv>
          <MotionDiv>
            <RecipeSlider title={'人気レシピ'} recipes={popularRecipes}/>
          </MotionDiv>
          {/* Birthday Section */}
          <MotionDiv>
            <BirthdayContainer bdayAvt={bday} />
          </MotionDiv>
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
