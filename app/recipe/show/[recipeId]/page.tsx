import { getFile } from "@/action/file-lib";
import { getRecipeData, getRecipeTitle, isLikedExist, updateRecipeViews } from "@/action/recipe";
import {  Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import ImageSwiper from "./components/ImageSwiper";
import { Comment } from "@/constants/interface";
import { cookies } from "next/headers";
import ViewUpdateCountdown from "./components/ViewUpdateCountdown";
import { fontSize, lgScreen } from "@/constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import UserSetter from "@/app/components/UserSetter";
import { getDecryptedSession } from "@/action/lib";
import StarReviews from "../../../components/ElementComponents/StarReviews";
import CommentForm from "./components/CommentForm";
import CommentSection from "./components/CommentSection";
import LikeRecipe from "@/app/components/ElementComponents/LikeRecipe";
import { getUserDetails } from "@/action/users";

type Props = {
    params: {recipeId: String},
    searchParams: {[key: string]: string | string[] | undefined}
}

// export const metadata:Metadata = {
//     title: {
//       template: '%s | わんごはん | 愛犬のための手作りごはんレシピサイト',
//       default: "わんごはん | 愛犬のための手作りごはんレシピサイト"
//     },
//     keywords: ["愛犬のための手作りごはんレシピサイト","わんごはん","Wangohan", "Dog food", "Pet food", "Pets", "Inu"],
//     creator: "Victor Chiong",
//     description: "Web for WanWan"
// }

export async function generateMetadata({params} : Props, parent: ResolvingMetadata):Promise<Metadata> {
    const {recipeId} = params;
    const recipeData = await getRecipeTitle(Number(recipeId));

    let title = '';
    if(recipeData.status === 200 && recipeData.body !== undefined) {
        title = recipeData.body.recipe_name;
    }

    return {
        title: title,
        keywords: ["愛犬のための手作りごはんレシピサイト","わんごはん","Wangohan", "Dog food", "Pet food", "Pets", "Inu"],
        creator: "Victor Chiong",
        description: "Web for WanWan"
    }
}

export default async function ShowRecipe({params, searchParams}:{params: {recipeId:string}, searchParams: { [key: string]:string | string[] | undefined}}) {
    const CardTagSize = '13px';
    const MAXWSIZE = lgScreen;

    const {recipeId} = params;

    const [ret, decryptedSession] = await Promise.all([await getRecipeData(Number(recipeId)), await getDecryptedSession()]);

    const recipe_data = ret.body;

    if(recipe_data === undefined || recipe_data.user === undefined ) redirect("/"); 

    const recipeIngredients = recipe_data.recipe_ingredients.map(ingr => `${ingr.recipe_ingredients_name} ${ingr.recipe_ingredients_amount}`);
    const recipeInstructions = recipe_data.recipe_instructions.map(instr => `${instr.recipe_instructions_text}`);
    const recipe_images = recipe_data.recipe_images.map( img => img.recipe_image)

    const user_image = recipe_data.user.user_image === '' ? '/LP/bday-dogs/puppy1.jpg' : recipe_data.user.user_image;

    const reviewComments:Array<Comment> = recipe_data.recipe_comments;

    
    const isLoggedIn = decryptedSession ? true : false;
    const likeStatus = await isLikedExist(recipe_data.recipe_id,decryptedSession ? decryptedSession.user.user_id : -1);
    
    return (
        <section className="flex justify-center flex-col items-center">
            <ViewUpdateCountdown recipe_id={recipe_data.recipe_id}/>
            <div style={{maxWidth: MAXWSIZE}} className="w-full relative">
                <ImageSwiper loginSts={{isLoggedIn, user_id: decryptedSession ? decryptedSession.user.user_id : -1}} recipe_images={recipe_images} recipe_id={recipe_data.recipe_id} owner_id={recipe_data.user_id}/>
                <div className={`tags-likes flex justify-between items-center px-[5px] py-[5px]`}>
                    <div className={`w-[60%] flex gap-[5px] flex-wrap items-center `}>
                        {recipe_data.recipe_age_tag !== '' ? <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>{recipe_data.recipe_age_tag}</span> : null}
                        {recipe_data.recipe_size_tag !== '' ? <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>{recipe_data.recipe_size_tag}</span> : null}
                        {recipe_data.recipe_event_tag !== '' ? <span className={`bg-[#523636] self-center flex justify-center items-center text-white py-[2px] px-[7px] rounded-[5px] text-[${CardTagSize}]`}>{recipe_data.recipe_event_tag}</span> : null}
                    </div>
                    <div className="flex gap-[5px] items-center">
                        {isLoggedIn && 
                          <LikeRecipe 
                            user_name={decryptedSession.user.codename} 
                            likeStatus={likeStatus.body} 
                            user_id={decryptedSession.user.user_id} 
                            recipe_id={recipe_data.recipe_id} 
                            recipe_owner_id={recipe_data.user_id}
                            recipe_name={recipe_data.recipe_name}
                            style={{width: '30px', height: '30px'}}
                          />}
                    </div>
                </div>
            </div>
            <div style={{maxWidth: MAXWSIZE}} className="w-full content-container p-[20px] flex flex-col justify-center gap-[30px]">
                <div className="recipe-title flex w-full justify-start items-center self-start font-semibold">
                    <h1 style={{fontSize: fontSize.l5}}>{recipe_data.recipe_name}</h1>
                </div>
                <div className="recipe-description w-full flex justify-start items-center self-center">
                    <span className="leading-snug text-[13px]">
                        {recipe_data.recipe_description}
                    </span>
                </div>
                <div className="recipe-ingredients w-full flex flex-col justify-start items-start gap-[10px]">
                    <h1 style={{fontSize: fontSize.l4}} className="font-semibold text-[#523636]">材料</h1>
                    <ul className={`flex flex-wrap w-[100%] ${recipeIngredients.length > 5 ? 'flex-row' : 'flex-col'}`}>
                    {
                        recipeIngredients.map((el, idx) => {
                            return <>
                            <li key={idx} className={`${recipeIngredients.length > 5 ? 'basis-1/2' : 'basis-1'} text-left`}>{el}</li>
                            </>
                        })
                    }
                    </ul>
                </div>
                <div className="recipe-instructions-content flex flex-col gap-[10px]">
                    <h1 style={{fontSize: fontSize.l4}} className=" font-semibold text-[#523636]">作り方</h1>
                    <ol className="list-decimal pl-[25px] flex flex-col gap-[10px]">
                        {
                            recipeInstructions.map((el, idx) => {
                               return <li key={idx}>{el}</li> 
                            })
                        }
                    </ol>
                </div>
                <div className="relative w-full h-full text-[13px] flex justify-between items-center top-[30px]">
                    <span>No. {recipe_data.recipe_id}</span>
                    <span className="flex items-center gap-[10px]">
                        Recipe by 
                        <img src={user_image} className="h-[30px] w-[30px] rounded-[100px] object-cover" width={10000} height={10000}  alt="website banner" />
                    </span>
                </div>
                <div className="w-full relative">
                    
                    <h1 className={`text-[13px] tracking-tighter inline-block text-[#523636] relative pb-[10px] after:content-[''] z-[10] after:w-[105%] after:h-[20px] after:top-[5px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]`}>
                        レビュー
                        <svg className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500 inline"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" strokeWidth="0.5" stroke="grey"/>
                        </svg> <span className="text-[10px]">{Number(recipe_data.recipe_rating_data.avgRating).toFixed(1)} ({recipe_data.recipe_rating_data.totalRating})</span>
                    </h1>
                    <div className="absolute w-full top-[13px] border-[1px] border-solid border-[#523636]"/>
                </div>
                <CommentSection reviewComments={reviewComments} recipe_id={recipe_data.recipe_id} total_comments={recipe_data.recipe_rating_data.totalRating}/>
                <CommentForm isLoggedIn={isLoggedIn} recipe_id={recipe_data.recipe_id}/>
            </div>
        </section>
    )
}