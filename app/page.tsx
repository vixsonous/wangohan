import RecipeSlider from "./components/RecipeSlider";
import BirthdayContainer from "./components/BirthdayContainer";
import { Gloria_Hallelujah, Mochiy_Pop_P_One } from "next/font/google";
import { Metadata } from "next";
import { getPopularRecipes, getWeeklyRecipes } from "@/action/recipe";
import { DisplayRecipe } from "@/constants/interface";

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
      '/LP/bday-dogs/puppy1.jpg',
      '/LP/bday-dogs/puppy2.jpg',
      '/LP/bday-dogs/puppy3.jpg',
      '/LP/bday-dogs/puppy4.jpg',
      '/LP/bday-dogs/puppy5.jpg',
      '/LP/bday-dogs/puppy6.jpg',
      '/LP/bday-dogs/puppy7.jpg'
  ];

  const weekly_result = await getWeeklyRecipes();
  const popular_result = await getPopularRecipes();

  const weeklyRecipes = weekly_result.body as Array<DisplayRecipe>;
  const popularRecipes = popular_result.body as Array<DisplayRecipe>;

  return (
    <main className="relative flex p-[20px] min-h-screen flex-col md:items-center overflow-hidden pb-[50px] lg:pb-[200px]">
      <div className=" flex md:w-full lg:w-[70vw] h-full justify-center items-center flex-col gap-[15px]">
        <div id="logo-banner" className="relative flex flex-col justify-center items-center">
          <img src={'/icons/logo-new.png'} className="rounded-md h-[auto] relative left-[15px] w-[130px] relative" width={10000} height={10000}  alt="website banner" />
          <h1 className={`text-[36px] text-[#6b4528] font-bold leading-tight ${mochi.className}`}>わんごはん</h1>
          <span className={`text-[10px] text-[#6b4528] ${gloria.className}`}>ALL RECIPES FOR YOUR DOG</span>
        </div>
        <div className="w-[100%] h-[100%] relative flex flex-col gap-[10px]">
          <div className="search-form relative flex justify-end">
            <form className="flex gap-[10px] w-[100%] flex justify-end" action="">
              <input className="py-[5px] px-[5px] w-[50%] h-[25px] rounded-[3px] text-[9px]" placeholder="キーワードで検索" type="text" />
              <input className="px-[10px] w-[50px] h-[25px] rounded-[3px] bg-black text-white text-[9px]" type="submit" value="検索" />
            </form>
          </div>
          <div className="w-full h-full relative">
            <img src={'/dashboard.png'} className="rounded-md h-full w-full relative" width={10000} height={10000}  alt="website banner" />
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
            <div className="first-row w-full flex mt-[-20px] gap-[10px] justify-center flex-col items-center  ">
              <h1 className="text-[20px] text-[#523636] font-semibold">年齢別で探す</h1>
              <div className="flex justify-between sm:justify-center sm:gap-[20px] w-[100%]">
                <a href="" className="flex w-[110px] gap-[10px] text-[13px] text-[#523636] font-bold flex-col justify-center items-center">
                  <img src={'/LP/puppy.png'} className="absolute rounded-md h-[100px] w-[auto] max-w-none"  alt="website banner" />
                  <span className="relative top-[39px]">子犬用レシピ</span>
                </a>
                <a href="" className="flex w-[105px] gap-[10px] text-[13px] relative text-[#523636] font-bold flex-col justify-center items-center">
                  <img src={'/LP/adult.png'} className="absolute rounded-md h-[120px] w-[auto] max-w-none" alt="website banner" /><span className="relative top-[39px]">成犬用レシピ</span></a>
                <a href="" className="flex w-[110px] gap-[10px] text-[13px] text-[#523636] font-bold flex-col justify-center items-center">
                  <img src={'/LP/senior.png'} className="rounded-md h-[90px] w-[150px] max-w-none"  alt="website banner" />
                  <span className="relative top-[-11px]">シニア犬用レシピ</span>
                  </a>
              </div>
            </div>

            <div className="first-row gap-[10px] w-full flex justify-center flex-col items-center  ">
              <h1 className="text-[20px] text-[#523636] font-semibold">サイズ別で探す</h1>
              <div className="flex justify-between sm:justify-center sm:gap-[20px] w-[100%]">
                <a href="" className="flex w-[110px] gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <img src={'/LP/smalldog.png'} className="rounded-md h-[70px] w-[120px] max-w-none" width={10000} height={10000}  alt="website banner" />
                  <span className="relative top-[-6px]">小型犬用レシピ</span>
                </a>
                <a href="" className="flex w-[105px] gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <img src={'/LP/middledog.png'} className="rounded-md h-[70px] w-[120px] max-w-none" width={10000} height={10000}  alt="website banner" /><span className="relative top-[-6px]">中型犬用レシピ</span></a>
                <a href="" className="flex w-[110px] gap-[10px] flex-col relative text-[13px] text-[#523636] font-bold justify-center items-center">
                  <img src={'/LP/bigdog.png'} className="absolute left-[-15px] top-[-10px] rounded-md h-[80px] w-[auto] max-w-none" width={10000} height={10000}  alt="website banner" /><span className="relative top-[33px]">大型犬用レシピ</span></a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[40px] justify-center items-center mt-[30px] relative">
            <div className="title">
              <h1 className="text-[26px] font-bold text-[#523636] relative after:content-[''] z-[1] after:w-[125%] after:left-[-15px] after:h-[40px] after:top-[10px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]">イベント</h1>
              <div className="absolute z-[-1] left-[0px] w-full top-[17px] border-[1px] border-solid border-[#523636]"/>
            </div>
            <div className="flex flex-wrap gap-y-[30px] justify-center">
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <img src={'/LP/event/birthday.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />お誕生日</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <img src={'/LP/event/ouchianniversary.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />おうち記念日</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <img src={'/LP/event/newyears.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />お正月</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <img src={'/LP/event/setsubun.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />節分</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <img src={'/LP/event/hinamatsuri.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />ひな祭り</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <img src={'/LP/event/kodomonohi.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />こどもの日</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <img src={'/LP/event/tanabata.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />七夕</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <img src={'/LP/event/halloween.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />ハロウィン</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <img src={'/LP/event/christmas.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />クリスマス</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <img src={'/LP/event/snack.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />おやつ</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col mx-[-20px] relative">
            <h1 className="flex justify-center w-[100%] items-center top-[70px] absolute text-[23px] font-bold text-[#523636]">コラムはこちら</h1>
            <div className="absolute flex justify-center w-[100%] top-[120px]">
              <button className=" bg-black rounded-md text-[8px] text-white py-[2px] px-[10px]">Button</button>
            </div>
            <img src={'/LP/column.png'} className="rounded-md w-[100%] h-[100%] inline max-w-none object-fill" width={10000} height={10000}  alt="website banner" />
          </div>
          
          
        </div>
      </div>
      
      
    </main>
  );
}
