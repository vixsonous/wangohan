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
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const mochi = Mochiy_Pop_P_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const events = [
  {
    text: "お誕生日",
    img: "/LP/event/birthday.webp",
    url: "/recipe/search/お誕生日",
  },
  {
    text: "おうち記念日",
    img: "/LP/event/ouchianniversary.webp",
    url: "/recipe/search/おうち記念日",
  },
  {
    text: "お正月",
    img: "/LP/event/newyears.webp",
    url: "/recipe/search/お正月",
  },
  { text: "節分", img: "/LP/event/setsubun.webp", url: "/recipe/search/節分" },
  {
    text: "ひな祭り",
    img: "/LP/event/hinamatsuri.webp",
    url: "/recipe/search/ひな祭り",
  },
  {
    text: "こどもの日",
    img: "/LP/event/kodomonohi.webp",
    url: "/recipe/search/こどもの日",
  },
  { text: "七夕", img: "/LP/event/tanabata.webp", url: "/recipe/search/七夕" },
  {
    text: "ハロウィン",
    img: "/LP/event/halloween.webp",
    url: "/recipe/search/ハロウィン",
  },
  {
    text: "クリスマス",
    img: "/LP/event/christmas.webp",
    url: "/recipe/search/クリスマス",
  },
  { text: "おやつ", img: "/LP/event/snack.webp", url: "/recipe/search/おやつ" },
];

export default async function Home() {
  const [weekly_result, popular_result, bdayPets] = await Promise.all([
    await getWeeklyRecipes(),
    await getPopularRecipes(),
    await getBdayPets(),
  ]);

  const bday = bdayPets.map((p) => {
    return {
      pet_id: p.pet_id,
      pet_image: p.pet_image,
      pet_name: p.pet_name,
      pet_birthdate: p.pet_birthdate.toISOString(),
      pet_breed: p.pet_breed,
    };
  }) as DogData[];

  const weeklyRecipes = weekly_result.body as Array<DisplayRecipe>;
  const popularRecipes = popular_result.body as Array<DisplayRecipe>;

  return (
    <>
      <main className="relative flex px-6 py-6 lg:px-0 min-h-screen flex-col lg:items-center overflow-hidden pb-[50px] lg:pb-[200px]">
        <div className=" flex max-w-xl h-full justify-center items-center flex-col">
          <div
            id="logo-banner"
            className="mt-8 lg:mt-0 relative flex flex-col justify-center items-center"
          >
            <img
              src={"/icons/logo-new-v2.png"}
              className="rounded-md h-[auto] left-[15px] w-[130px] relative"
              width={130}
              height={130}
              alt="website banner"
            />
            <h1
              className={`text-[36px] text-[#6b4528] font-bold leading-tight ${mochi.className}`}
            >
              わんごはん
            </h1>
            <span className={`text-[10px] text-[#6b4528] ${gloria.className}`}>
              ALL RECIPES FOR YOUR DOG
            </span>
          </div>
          <HomeNavigation />
          <div className="w-full h-full relative flex flex-col gap-[10px]">
            <div className="mt-8 search-form relative flex justify-end lg:hidden">
              <BodyMainSearch />
            </div>
            <div className=" lg:my-4 grid grid-cols-1 lg:grid-cols-5 items-start gap-4">
              <div className="lg:col-span-3 max-w-full h-full relative">
                <TopRecipeSlider recipes={popularRecipes} />
              </div>
              <div className="lg:col-span-2 w-full h-full relative">
                <div className="search-form relative flex justify-end invisible lg:visible">
                  <BodyMainSearch />
                </div>
                <CategorySlider />
              </div>
            </div>
            <MotionDiv>
              <RecipeSlider title={"今週のレシピ"} recipes={weeklyRecipes} />
            </MotionDiv>
            <MotionDiv>
              <RecipeSlider title={"人気レシピ"} recipes={popularRecipes} />
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
          <h1 className="flex justify-center w-[100%] top-4 items-center absolute text-2xl lg:text-4xl font-bold text-[#523636]">
            役立つコラムはこちら
          </h1>
          <div className="absolute flex justify-center w-[100%] top-14 lg:top-24">
            <Link href={"/columns"} className=" bg-primary-text rounded-md text-xs text-white py-2 px-4">
              Column
            </Link>
          </div>
          <img
            src={"/LP/column.png"}
            loading="lazy"
            className="rounded-md w-[100%] h-[100%] inline max-w-none object-fill"
            width={100}
            height={100}
            alt="website banner"
          />
        </div>
      </MotionDiv>
    </>
  );
}
