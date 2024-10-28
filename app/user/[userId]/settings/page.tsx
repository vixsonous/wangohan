import { getDecryptedSession } from "@/action/lib";
import EditForm from "./components/EditForm";
import { getUserDetails } from "@/action/users";
import { redirect } from "next/navigation";
import { getFile } from "@/action/file-lib";
import { DogData } from "@/constants/interface";

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