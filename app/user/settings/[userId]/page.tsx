import { getDecryptedSession } from "@/action/lib";
import { getUserDetails } from "@/action/users";
import { redirect } from "next/navigation";
import { DogData } from "@/constants/interface";
import dynamic from "next/dynamic";
import IndexLoading from "@/app/loading";
const EditForm = dynamic(() => import("./components/EditForm"), { ssr: false, loading: () => <IndexLoading />});

export default async function Settings() {
    const decryptedSession = await getDecryptedSession();
    if(!decryptedSession) return;
    const userDetails = await getUserDetails(decryptedSession.user.user_id).catch(() => redirect("/signup/personal-info"));
    userDetails.user_image = userDetails.user_image !== '' ? userDetails.user_image : '/recipe-making/pic-background.webp'
    const pets : DogData[] = userDetails.pets;

    return (
        <div className="relative pb-[100px] w-full flex justify-center">
            <EditForm userDetails={userDetails} pets={pets}/>
        </div>
    )
}