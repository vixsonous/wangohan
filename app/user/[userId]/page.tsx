
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import TabList from "./components/TabList";
import { getUser, getUserDetails, retrieveDecryptedSession, retrieveLikedRecipes, retrieveUserRecipes } from "@/action/users";
import { cookies } from "next/headers";
import { decrypt, logEnd, logStart } from "@/action/lib";
import { redirect } from "next/navigation";
import { DogData } from "@/constants/interface";
import { getFile } from "@/action/file-lib";
import React, { Suspense } from "react";
import IndexLoading from "@/app/loading";
import Link from "next/link";
import PetList from "./components/PetList";
import OptImage from "@/app/components/ElementComponents/Image";

type Props = {
    params: {userId: String},
    searchParams: {[key: string]: string | string[] | undefined}
}

export async function generateMetadata({params} : Props, parent: ResolvingMetadata):Promise<Metadata> {
    const {userId} = params;
    const {userDetails} = await retrieveDecryptedSession();
    const title = `${userDetails.user_codename}`;

    return {
        title: title
    }
}

export default async function User() {

    const {decryptedSession, userDetails} = await retrieveDecryptedSession();
    const image_url = userDetails.user_image === '' ? `/recipe-making/pic-background.webp` : userDetails.user_image;
    const pets : DogData[] = userDetails.pets;

    const st = logStart("Retrieving Owned Recipes");
    const recipes = await retrieveUserRecipes(userDetails.user_id, 1);
    logEnd(st);

    const st1 = logStart("Retrieving Liked Recipes");
    const liked_recipes = await retrieveLikedRecipes(userDetails.user_id, 1);
    logEnd(st1);

    const recipes_data = recipes.body || [];
    const liked_recipes_data = liked_recipes.body || [];
    
    return (
        <Suspense fallback={<IndexLoading />}>
            <div className="flex flex-col justify-center items-center ">
                <div className="relative pb-[100px] max-w-[768px]">
                    <div className="user-image relative flex flex-col justify-center items-center mt-[30px]">
                        <OptImage loading="lazy" src={image_url} className="rounded-[100px] w-[150px] h-[150px] object-cover relative" width={150} height={150} alt="website banner"/>
                        <img loading="lazy" src={'/recipe-making/pic-background.webp'} className="absolute top-0 rounded-[100px] w-[150px] h-[150px] object-cover z-[-1]" width={150} height={150}  alt="website banner" />
                        <h1 className="text-[36px] font-bold text-[#5b5351]">{userDetails.user_codename === '' ? `Wanuser` + decryptedSession.user.user_id : userDetails.user_codename}</h1>
                    </div>
                    <div className="flex justify-center items-center relative mt-12 mb-4">
                        <h1 className="absolute top-[10px] font-semibold text-[#523636]">うちのわん</h1>
                        <img loading="lazy" src={'/icons/ribbon.webp'} className="h-[auto] w-[200px] sm:w-[300px] max-w-none" width={10000} height={10000}  alt="website banner" />
                    </div>
                    <PetList pets={pets}/>
                    <TabList owned_recipes={recipes_data} liked_recipes={liked_recipes_data}/>
                    <div className="fixed bottom-[20px] z-[9999] right-[10px]">
                        <Link href={`/user/${userDetails.user_id}/settings`}>
                            <img loading="lazy" src={'/Setting/settingpaw.webp'} className="h-[auto] w-[120px]  max-w-none" width={10000} height={10000}  alt="website banner" />
                            <span className="relative bottom-[33px] text-[13px] text-white right-[-45px]">設定</span>
                        </Link>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}