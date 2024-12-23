
import { Metadata, ResolvingMetadata } from "next";
import TabList from "./components/TabList";
import { getUserDetails, retrieveDecryptedSession, retrieveLikedRecipes, retrieveUserRecipes } from "@/action/users";
import { getDecryptedSession, logEnd, logStart } from "@/action/lib";
import { DogData } from "@/constants/interface";
import React, { Suspense } from "react";
import IndexLoading from "@/app/loading";
import Link from "next/link";
import PetList from "./components/PetList";
import OptImage from "@/app/components/ElementComponents/Image";
import { redirect } from "next/navigation";

type Props = {
    params: {userId: String},
    searchParams: {[key: string]: string | string[] | undefined}
}

export async function generateMetadata({params} : Props, parent: ResolvingMetadata):Promise<Metadata> {
    const {userId} = params;
    const details = await getUserDetails(Number(userId));
    const title = `${details.user_codename}`;

    return {
        title: title
    }
}

export default async function User({params} : {params: {userId: String}}) {

    const {userId} = params;
    const [userDetails, decryptedSession] = await Promise.all([
      await getUserDetails(Number(userId)),
      await getDecryptedSession()
    ]);
    if(userDetails.user_id === 0) redirect("/signup/personal-info");
    const image_url = userDetails.user_image === '' ? `/recipe-making/pic-background.webp` : userDetails.user_image;
    const pets : DogData[] = userDetails.pets;

    const st = logStart("Retrieving Owned Recipes");
    const recipes = await retrieveUserRecipes(userDetails.user_id, 1);
    logEnd(st);

    const st1 = logStart("Retrieving Liked Recipes");
    const liked_recipes = decryptedSession && userDetails.user_id === decryptedSession.user.user_id ? await retrieveLikedRecipes(userDetails.user_id, 1) : undefined;
    logEnd(st1);

    const recipes_data = recipes.body || [];
    const liked_recipes_data = liked_recipes && liked_recipes.body || [];
    
    return (
        <Suspense fallback={<IndexLoading />}>
            <div className="flex flex-col justify-center items-center ">
                <div className="relative flex flex-col pb-[100px] max-w-xl w-full">
                  <div className="lg:flex gap-8 justify-center lg:mb-16 mt-16">
                    <div className="user-image w-full relative flex flex-col justify-center lg:justify-start items-center">
                        <div className="hidden md:block">
                          <OptImage src={image_url} centered className=" rounded-full object-cover relative" square width={300} height={300}  alt="website banner"/>
                        </div>
                        <div className="block md:hidden">
                          <OptImage src={image_url} centered className=" rounded-full object-cover relative" square width={150} height={150}  alt="website banner"/>
                        </div>
                        <h1 className="text-[36px] font-bold text-[#5b5351]">{userDetails.user_codename === '' ? `Wanuser` + userDetails.user_id : userDetails.user_codename}</h1>
                        <div className="flex justify-center items-center relative mt-12 mb-4">
                          <h1 className="absolute text-sm md:text-lg top-2 md:top-4 font-semibold text-[#523636]">うちのわん</h1>
                          <img loading="lazy" src={'/icons/ribbon.webp'} className="h-[auto] w-[200px] sm:w-[300px] max-w-none" width={100} height={100}  alt="website banner" />
                        </div>
                        <PetList pets={pets}/>
                    </div>
                    <div className="flex flex-col w-full items-center justify-start">
                      <TabList curUser={decryptedSession && userDetails.user_id === decryptedSession.user.user_id} owned_recipes={recipes_data} liked_recipes={liked_recipes_data}/>
                      {
                        (decryptedSession && userDetails.user_id === decryptedSession.user.user_id) && (
                          <div className="fixed bottom-8 z-[99] right-8">
                            <Link className="relative" href={`/user/settings/${userDetails.user_id}`}>
                                <img loading="lazy" src={'/Setting/newsetting.webp'} className="h-[auto] w-[80px] md:w-[100px]  max-w-none" width={100} height={100}  alt="website banner" />
                            </Link>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
            </div>
        </Suspense>
    )
}