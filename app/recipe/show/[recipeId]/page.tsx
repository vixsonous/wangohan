import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image"

type Props = {
    params: {recipeId: String},
    searchParams: {[key: string]: string | string[] | undefined}
}

export async function generateMetadata({params} : Props, parent: ResolvingMetadata):Promise<Metadata> {
    const {recipeId} = params;
    const title = `Recipe ${recipeId}`;

    return {
        title: title
    }
}

export default function ShowRecipe() {
    const CardFontSize = '13px';
    const CardTagSize = '13px';

    const recipesSample:Array<String> = [
        "小麦粉 250g",
        "にんじん 1",
        "本 醤油 大さじ1 ",
        "にんじん 1",
        "本 醤油 大さじ1",
        "小麦粉 250g",
        "小麦粉 250g",
        "にんじん 1",
        "本 醤油 大さじ1 ",
        "にんじん 1",
        "本 醤油 大さじ1",
        "小麦粉 250g",
    ]

    const recipeInstruction:Array<String> = [
        "にんじんをそのまま炊飯器に入れる",
        "ほうれん草はヘタを切る",
        " 炊飯器で早炊きモードで炊いて完成したらよく混ぜて完成。 カリカリに混ぜておげてみてください。"
    ]

    const StarReviews = () => {
        return (
            <div className="flex items-center">
                <svg className="w-[10px] h-[10px] text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" strokeWidth="0.5" stroke="grey"/>
                </svg>
                <svg className="w-[10px] h-[10px] text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" strokeWidth="0.5" stroke="grey"/>
                </svg>
                <svg className="w-[10px] h-[10px] text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" strokeWidth="0.5" stroke="grey"/>
                </svg>
                <svg className="w-[10px] h-[10px] text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" strokeWidth="0.5" stroke="grey"/>
                </svg>
                <svg className="w-[10px] h-[10px] text-gray-300 dark:text-gray-500"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" strokeWidth="0.5" stroke="grey"/>
                </svg>
            </div>
        )
    }

    const reviewComments:Array<String> = [
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus voluptate ex, eos et quam delectus beatae exercitationem odio. Optio eum libero nesciunt harum aut non exercitationem voluptas doloribus id architecto?",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus voluptate ex, eos et quam delectus beatae exercitationem odio. Optio eum libero nesciunt harum aut non exercitationem voluptas doloribus id architecto?",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus voluptate ex, eos et quam delectus beatae exercitationem odio. Optio eum libero nesciunt harum aut non exercitationem voluptas doloribus id architecto?",
    ]

    return (
        <section>
            <div className="recipe-image w-[100%]">
                <Image src={'/dashboard.png'} className="h-[auto] w-[100%] max-w-none" width={10000} height={10000}  alt="website banner" />
            </div>
            <div className="content-container p-[20px] flex flex-col justify-center gap-[30px]">
                <div className="tags-likes flex justify-between items-center">
                    <div className={`w-[60%] flex gap-[5px] flex-wrap items-center `}>
                        <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>子犬</span>
                        <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>中型犬</span>
                        <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>中型犬子犬</span>
                    </div>
                    <div className="flex gap-[5px] items-center">
                        <svg fill="#00000" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                            viewBox="0 0 471.701 471.701" xmlSpace="preserve">
                            <g>
                                <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                                    c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                                    l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                                    C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                                    s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                                    c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                                    C444.801,187.101,434.001,213.101,414.401,232.701z"/>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="recipe-title flex justify-center items-center self-center font-semibold">
                    <h1>炊飯器で簡単! 夏バテでも食べられるご飯</h1>
                </div>
                <div className="recipe-description flex justify-center items-center self-center">
                    <span className="leading-snug text-[13px]">
                        愛犬が夏バテでなかなかご飯を食べなかったので、 お魚ベースの手作りご飯を作 りました。 たくさん食べてくれたので是非作ってみてください。 いつもありがと うございます。 今後ともよろしくお願いいたします。 (全部で文字)
                    </span>
                </div>
                <div className="flex justify-center items-center relative">
                    <h1 className="absolute top-[7px] font-semibold text-[#523636]">材料</h1>
                    <Image src={'/icons/ribbon.png'} className="h-[auto] w-[200px] sm:w-[300px] max-w-none" width={10000} height={10000}  alt="website banner" />
                </div>
                <div className="recipe-ingredients flex justify-center items-center">
                    <ul className={`flex flex-wrap w-[80%] ${recipesSample.length > 5 ? 'flex-row' : 'flex-col'}`}>
                    {
                        recipesSample.map(el => {
                            return <li className={`${recipesSample.length > 5 ? 'basis-1/2' : 'basis-1'} text-center`}>{el}</li>
                        })
                    }
                    </ul>
                </div>
                <div className="recipe-instructions-title flex justify-center items-center relative">
                    <h1 className="absolute top-[7px] font-semibold text-[#523636]">材料</h1>
                    <Image src={'/icons/ribbon.png'} className="h-[auto] w-[200px] sm:w-[300px] max-w-none" width={10000} height={10000}  alt="website banner" />
                </div>
                <div className="recipe-instructions-content">
                    <ol className="list-decimal pl-[20px]">
                        {
                            recipeInstruction.map(el => {
                               return <li>{el}</li> 
                            })
                        }
                    </ol>
                </div>
                <div className="w-full relative">
                    <h1 className={`text-[13px] tracking-tighter inline-block text-[#523636] relative pb-[10px] after:content-[''] z-[10] after:w-[105%] after:h-[20px] after:top-[5px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]`}>
                        レビュー
                        <svg className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500 inline"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" strokeWidth="0.5" stroke="grey"/>
                        </svg> <span className="text-[10px]">4.5 (20)</span>
                    </h1>
                    <div className="absolute w-full top-[13px] border-[1px] border-solid border-[#523636]"/>
                </div>
                <div className="reviews flex flex-col gap-[20px]">
                    {
                        reviewComments.map(comment => {
                            return (
                                <div className="review-comment flex w-[100%] gap-[10px]">
                                    <div className="avatar">
                                        <Image src={'/LP/bday-dogs/puppy1.jpg'} className="w-[40px] rounded-full object-cover overflow-hidden h-[40px] max-w-none" width={10000} height={10000} alt="website banner" />
                                    </div>
                                    <div className="comment-container w-[100%] flex flex-col justify-center">
                                        <div className="upper-content flex justify-between items-center text-[10px] h-[40px]">
                                            <div className="name-stars flex items-center justify-center self-center gap-[10px]">
                                                Victor
                                                {StarReviews()}
                                            </div>
                                            <div className="date">
                                                5/23/2024
                                            </div>
                                        </div>
                                        <div className="lower-content text-[10px] bg-[#fef1dd] p-[10px]">
                                            <span>{comment}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <span className="text-[10px] ml-[50px]">全てのレビューを見る</span>
                    <div>
                        <form className="relative flex items-center justify-center" action="">
                            <textarea placeholder="このレシピのレビューを投稿する" className="text-[10px] rounded-[50px] px-[15px] py-[10px] w-[80%]" name="" id="" rows={1}></textarea>
                            <button className="absolute bg-[#7e594e] px-[20px] py-[7px] rounded-[50px] right-[40px]" type="submit">
                                <svg fill="#ffffff" className="" height="10px" width="10px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                                        viewBox="0 0 384.923 384.923" xmlSpace="preserve">
                                    <g>
                                        <path id="Arrow_Upward" d="M321.337,122.567L201.046,3.479c-4.776-4.728-12.391-4.547-17.179,0l-120.291,119.1
                                            c-4.74,4.704-4.74,12.319,0,17.011c4.752,4.704,12.439,4.704,17.191,0l99.551-98.552v331.856c0,6.641,5.438,12.03,12.151,12.03
                                            s12.151-5.39,12.151-12.03V41.025l99.551,98.552c4.74,4.704,12.439,4.704,17.179,0C326.089,134.886,326.089,127.27,321.337,122.567
                                            z"/>
                                    </g>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    )
}