
import { Metadata, ResolvingMetadata } from "next";
import { getUserDetails } from "@/action/users";
import { cookies } from "next/headers";
import { decrypt } from "@/action/lib";
import { redirect } from "next/navigation";
import { DogData } from "@/constants/interface";
import { getFile } from "@/action/file-lib";
import React, { Suspense } from "react";
import IndexLoading from "../loading";
import UserDisplay from "./components/UserDisplay";

type Props = {
    params: {userId: String},
    searchParams: {[key: string]: string | string[] | undefined}
}

export async function generateMetadata({params} : Props, parent: ResolvingMetadata):Promise<Metadata> {
    const {userId} = params;
    const title = `User ${userId}`;

    return {
        title: title
    }
}

export default async function User() {

    const docCookies = cookies();
    const session = docCookies.get('session')?.value;

    if(!session) redirect("/login");

    const decryptedSession = await decrypt(session as string);
    const userDetails = await getUserDetails(decryptedSession.user.user_id).catch(() => redirect("/signup/personal-info"));

    const image_url = userDetails.user_image === '' ? `/recipe-making/pic-background.png` : await getFile(userDetails.user_image);
    const pets : DogData[] = userDetails.pets;
    
    return (
        <Suspense fallback={<IndexLoading />}>
            <UserDisplay image_url={image_url} pets={pets} userDetails={userDetails} decryptedSession={decryptedSession}/>
        </Suspense>
    )
}