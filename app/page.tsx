import RecipeSlider from "./components/RecipeSlider";
import BirthdayContainer from "./components/BirthdayContainer";
import { Gloria_Hallelujah, Mochiy_Pop_P_One } from "next/font/google";
import { Metadata } from "next";
import { getPopularRecipes, getWeeklyRecipes } from "@/action/recipe";
import { DisplayRecipe } from "@/constants/interface";
import MainSearchForm from "./components/MainSearchForm";
import Link from "next/link";

const gloria = Gloria_Hallelujah({
  weight: '400',
  subsets: ['latin']
});

const mochi = Mochiy_Pop_P_One({
  weight: '400',
  subsets: ['latin']
})

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
    <main className="relative flex p-[20px] min-h-screen flex-col md:items-center overflow-hidden pb-[50px] lg:pb-[200px]">
      <div className=" flex md:w-full lg:w-[70vw] max-w-md h-full justify-center items-center flex-col gap-[15px]">
        <div id="logo-banner" className="relative flex flex-col justify-center items-center">
          <img src={'/icons/logo-new.webp'} className="rounded-md h-[auto] relative left-[15px] w-[130px] relative" width={100} height={100}  alt="website banner" />
          <h1 className={`text-[36px] text-[#6b4528] font-bold leading-tight ${mochi.className}`}>わんごはん</h1>
          <span className={`text-[10px] text-[#6b4528] ${gloria.className}`}>ALL RECIPES FOR YOUR DOG</span>
        </div>
        <div className="w-[100%] h-[100%] relative flex flex-col gap-[10px]">
          <div className="search-form relative flex justify-end">
            <MainSearchForm />
          </div>
          <div className="w-full h-full relative">
            <img src={'/dashboard.webp'} loading="eager" className="rounded-md h-full w-full relative" width={100} height={100}  alt="website banner" />
          </div>
          <div>
            <RecipeSlider title={'今週のレシピ'} recipes={weeklyRecipes}/>
          </div>
          <div>
            <RecipeSlider title={'人気レシピ'} recipes={popularRecipes}/>
          </div>
          {/* Birthday Section */}
          <BirthdayContainer bdayAvt={birthdays} />
          <div className="flex flex-col gap-[40px] justify-center items-center mt-[30px] relative">
            <div className="title">
              <h1 className="text-[26px] tracking-tighter font-bold text-[#523636] relative after:content-[''] z-[1] after:left-[-10px] after:w-[110%] after:h-[40px] after:top-[10px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]">レシピカテゴリ</h1>
              <div className="absolute z-[-1] left-[0px] w-full top-[17px] border-[1px] border-solid border-[#523636]"/>
            </div>
            <div className="first-row w-full flex mt-[-20px] gap-[20px] justify-center flex-col items-center  ">
              <h1 className="text-[20px] text-[#523636] font-semibold">年齢別で探す</h1>
              <div className="flex justify-between sm:justify-center sm:gap-[20px] w-[100%]">
                <Link href="/recipe/search/子犬" className="flex flex-[1_33%] gap-[10px] text-[13px] text-[#523636] font-bold flex-col justify-between items-center">
                  <img src={'/LP/puppy.webp'} loading="lazy" className="relative rounded-md w-[70%]"  alt="website banner" />
                  <span className="relative top-[0px]">子犬用レシピ</span>
                </Link>
                <Link href="/recipe/search/成犬" className="flex flex-[1_33%] gap-[10px] text-[13px] relative text-[#523636] font-bold flex-col justify-between items-center">
                  <img src={'/LP/adult.webp'} loading="lazy" className="relative rounded-md w-[50%]" alt="website banner" />
                  <span className="relative top-[0px]">成犬用レシピ</span>
                </Link>
                <Link href="/recipe/search/シニア犬" className="flex flex-[1_33%] relative gap-[10px] text-[13px] text-[#523636] font-bold flex-col justify-between items-center">
                  <img src={'/LP/senior.webp'} loading="lazy" className="relative rounded-md w-[60%] bottom-[0px]"  alt="website banner" />
                  <span className="relative top-[0px]">シニア犬用レシピ</span>
                </Link>
              </div>
            </div>

            <div className="first-row gap-[20px] w-full flex justify-center flex-col items-center  ">
              <h1 className="text-[20px] text-[#523636] font-semibold">サイズ別で探す</h1>
              <div className="flex justify-between sm:justify-center sm:gap-[20px] w-[100%]">
                <Link href="/recipe/search/小型犬" className="flex flex-[1_33%] gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-between items-center">
                  <img src={'/LP/smalldog.webp'} loading="lazy" className="relative rounded-md w-[65%]" width={100} height={100}  alt="website banner" />
                  <span className="relative top-[0px]">小型犬用レシピ</span>
                </Link>
                <Link href="/recipe/search/中型犬" className="flex flex-[1_33%] gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-between items-center">
                  <img src={'/LP/middledog.webp'} loading="lazy" className="relative rounded-md w-[65%]" width={100} height={100}  alt="website banner" />
                  <span className="relative top-[0px]">中型犬用レシピ</span>
                </Link>
                <Link href="/recipe/search/大型犬" className="flex flex-[1_33%] gap-[10px] flex-col relative text-[13px] text-[#523636] font-bold justify-between items-center">
                  <img src={'/LP/bigdog.webp'} loading="lazy" className="relative top-[-10px] rounded-md w-[50%]" width={100} height={100}  alt="website banner" />
                  <span className="relative top-[0px]">大型犬用レシピ</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[40px] justify-center items-center mt-[30px] relative">
            <div className="title">
              <h1 className="text-[26px] font-bold text-[#523636] relative after:content-[''] z-[1] after:w-[125%] after:left-[-15px] after:h-[40px] after:top-[10px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]">イベント</h1>
              <div className="absolute z-[-1] left-[0px] w-full top-[17px] border-[1px] border-solid border-[#523636]"/>
            </div>
            <div className="flex flex-wrap gap-y-[30px] justify-center">
              {
                events.map( (ev, idx) => {
                  return (
                    <div className="w-[29vw] text-white flex justify-center">
                      <Link href={ev.url} className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                        <img src={ev.img} loading="lazy" className="rounded-md h-[auto] w-[100%] max-w-none" width={100} height={100}  alt="website banner" />{ev.text}</Link>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div className="flex flex-col mx-[-20px] relative">
            <h1 className="flex justify-center w-[100%] items-center top-[70px] absolute text-[23px] font-bold text-[#523636]">コラムはこちら</h1>
            <div className="absolute flex justify-center w-[100%] top-[120px]">
              <button className=" bg-black rounded-md text-[8px] text-white py-[2px] px-[10px]">Button</button>
            </div>
            <img src={'/LP/column.webp'} loading="lazy" className="rounded-md w-[100%] h-[100%] inline max-w-none object-fill" width={100} height={100}  alt="website banner" />
          </div>
        </div>
      </div>
    </main>
  );
}
