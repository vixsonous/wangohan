import Image from "next/image";
import RecipeSlider from "./components/RecipeSlider";
import BirthdayAvatar from "./components/BirthdayAvatar";
import BirthdayContainer from "./components/BirthdayContainer";
import { Gloria_Hallelujah } from "next/font/google";
import { Metadata } from "next";

const gloria = Gloria_Hallelujah({
  weight: '400',
  subsets: ['latin']
})

export default function Home() {
  const birthdays = [
      '/LP/bday-dogs/puppy1.jpg',
      '/LP/bday-dogs/puppy2.jpg',
      '/LP/bday-dogs/puppy3.jpg',
      '/LP/bday-dogs/puppy4.jpg',
      '/LP/bday-dogs/puppy5.jpg',
      '/LP/bday-dogs/puppy6.jpg',
      '/LP/bday-dogs/puppy7.jpg'
  ];

  return (
    <main className="flex p-[20px] min-h-screen flex-col md:items-center overflow-hidden">
      <div className=" flex md:w-full lg:w-[70vw] h-full justify-center items-center flex-col gap-[15px]">
        <div id="logo-banner" className="relative flex flex-col justify-center items-center">
          <Image src={'/icons/logo-new.png'} className="rounded-md h-[auto] relative left-[15px] w-[130px] relative" width={10000} height={10000}  alt="website banner" />
          <h1 className={`text-[36px] text-[#6b4528] font-bold leading-tight`}>わんごはん</h1>
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
            <Image src={'/dashboard.png'} className="rounded-md h-full w-full relative" width={10000} height={10000}  alt="website banner" />
          </div>
          <div>
            <RecipeSlider title={'今週のレシピ'} recipes={[1,2,3,4,5]} width={'175'}/>
          </div>
          <div>
            <RecipeSlider title={'人気レシピ'} recipes={[1,2,3,4,5]} width={'175'}/>
          </div>
          <div className="flex flex-col gap-[40px] justify-center items-center mt-[30px] relative">
            <div className="title">
              <h1 className="text-[26px] tracking-tighter font-bold text-[#523636] relative after:content-[''] z-[1] after:left-[-10px] after:w-[110%] after:h-[40px] after:top-[10px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]">レシピカテゴリ</h1>
              <div className="absolute z-[-1] left-[0px] w-full top-[17px] border-[1px] border-solid border-[#523636]"/>
            </div>
            <div className="first-row w-full flex mt-[-20px] gap-[10px] justify-center flex-col items-center  ">
              <h1 className="text-[20px] text-[#523636] font-semibold">年齢別で探す</h1>
              <div className="flex justify-between sm:justify-center sm:gap-[20px] w-[100%]">
                <a href="" className="flex w-[105px] gap-[10px] text-[13px] text-[#523636] font-bold flex-col justify-center items-center">
                  <Image src={'/LP/puppy.png'} className="absolute rounded-md h-[100px] w-[auto] max-w-none" width={10000} height={10000}  alt="website banner" />
                  <span className="relative top-[39px]">子犬用レシピ</span>
                </a>
                <a href="" className="flex w-[105px] gap-[10px] text-[13px] relative text-[#523636] font-bold flex-col justify-center items-center">
                  <Image src={'/LP/adult.png'} className="absolute rounded-md h-[120px] w-[auto] max-w-none" width={10000} height={10000}  alt="website banner" /><span className="relative top-[39px]">成犬用レシピ</span></a>
                <a href="" className="flex w-[105px] gap-[10px] text-[13px] text-[#523636] font-bold flex-col justify-center items-center">
                  <Image src={'/LP/senior.png'} className="rounded-md h-[70px] w-[120px] max-w-none" width={10000} height={10000}  alt="website banner" />シニア犬用レシピ</a>
              </div>
            </div>

            <div className="first-row gap-[10px] w-full flex justify-center flex-col items-center  ">
              <h1 className="text-[20px] text-[#523636] font-semibold">サイズ別で探す</h1>
              <div className="flex justify-between sm:justify-center sm:gap-[20px] w-[100%]">
                <a href="" className="flex w-[105px] gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <Image src={'/LP/smalldog.png'} className="rounded-md h-[70px] w-[120px] max-w-none" width={10000} height={10000}  alt="website banner" />
                  <span className="relative top-[-6px]">小型犬用レシピ</span>
                </a>
                <a href="" className="flex w-[105px] gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <Image src={'/LP/middledog.png'} className="rounded-md h-[70px] w-[120px] max-w-none" width={10000} height={10000}  alt="website banner" /><span className="relative top-[-6px]">中型犬用レシピ</span></a>
                <a href="" className="flex w-[105px] gap-[10px] flex-col relative text-[13px] text-[#523636] font-bold justify-center items-center">
                  <Image src={'/LP/bigdog.png'} className="absolute left-[-15px] top-[-25px] rounded-md h-[100px] w-[auto] max-w-none" width={10000} height={10000}  alt="website banner" /><span className="relative top-[33px]">大型犬用レシピ</span></a>
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
                  <Image src={'/LP/event/birthday.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />大型犬用レシピ</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <Image src={'/LP/event/ouchianniversary.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />大型犬用レシピ</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <Image src={'/LP/event/newyears.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />大型犬用レシピ</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <Image src={'/LP/event/setsubun.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />大型犬用レシピ</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <Image src={'/LP/event/hinamatsuri.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />大型犬用レシピ</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <Image src={'/LP/event/kodomonohi.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />大型犬用レシピ</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <Image src={'/LP/event/tanabata.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />大型犬用レシピ</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <Image src={'/LP/event/halloween.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />大型犬用レシピ</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <Image src={'/LP/event/christmas.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />大型犬用レシピ</a>
              </div>
              <div className="w-[29vw] text-white flex justify-center">
                <a href="" className="flex gap-[10px] flex-col text-[13px] text-[#523636] font-bold justify-center items-center">
                  <Image src={'/LP/event/snack.png'} className="rounded-md h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />大型犬用レシピ</a>
              </div>
            </div>
          </div>

          {/* Birthday Section */}
          <BirthdayContainer bdayAvt={birthdays} />
          <div className="flex flex-col mx-[-20px] relative">
            <h1 className="flex justify-center w-[100%] items-center top-[70px] absolute text-[23px] font-bold text-[#523636]">コラムはこちら</h1>
            <div className="absolute flex justify-center w-[100%] top-[120px]">
              <button className=" bg-black rounded-md text-[8px] text-white py-[2px] px-[10px]">Button</button>
            </div>
            <Image src={'/LP/column.png'} className="rounded-md w-[100%] h-[100%] inline max-w-none object-fill" width={10000} height={10000}  alt="website banner" />
          </div>
          <div className="border-[1px] border-black" />
          <div className="relative">
            <div className="flex items-center">
              <div className="flex flex-col justify-center items-center gap-[5px] w-[50%]">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-[40px] h-[40px]" viewBox="0 0 50 50">
                  <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                </svg>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-[13px] font-bold text-[#523636]">Instagramをフォロー</h1>
                  <span className="text-[10px] font-bold text-[#523636]">あなたのレシピがシェア</span>
                  <span className="text-[10px] font-bold text-[#523636]">されるかも？！</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-[10px] justify-between items-center h-[100%] self-center w-[50%]">
                <a href="" className="text-[8px] self-center flex">利用規約</a>
                <a href="" className="text-[8px] self-center flex">免責事項</a>
                <a href="" className="text-[8px] self-center flex">プライバシーポリシー</a>
                <a href="" className="text-[8px] self-center flex">Myページ</a>
                <a href="" className="text-[8px] self-center flex">HOME</a>
                <a href="" className="text-[8px] self-center flex">ご意見・お問い合わせ</a>
              </div>
            </div>
            <Image src={'/LP/last.png'} className="rounded-md w-[100%] h-[auto] absolute top-[0px] inline max-w-none object-fill" width={10000} height={10000}  alt="website banner" />
          </div>
          <h1 className="w-[100%] flex justify-center relative top-[30px] text-[10px]">@Web5Dimensional</h1>
        </div>
      </div>
    </main>
  );
}
