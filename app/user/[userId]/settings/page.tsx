import { getDecryptedSession } from "@/action/lib";
import EditForm from "./components/EditForm";
import { getUserDetails } from "@/action/users";
import { redirect } from "next/navigation";
import { getFile } from "@/action/file-lib";

interface DogData {
    id: number,
    thumbnail: string,
    name: string,
    birthdate: Date,
    breed: string
}

export default async function Settings() {
    const decryptedSession = await getDecryptedSession();
    if(!decryptedSession) return;
    const userDetails = await getUserDetails(decryptedSession.user.user_id).catch(() => redirect("/signup/personal-info"));
    userDetails.user_image = userDetails.user_image !== '' ? await getFile(userDetails.user_image) : '/recipe-making/pic-background.png'
    const pets : DogData[] = [
        {
            id: 1,
            thumbnail: '/LP/bday-dogs/puppy1.jpg',
            name: 'ポチ',
            birthdate: new Date("2022/05/25"),
            breed: '柴犬'
        },
        {
            id: 2,
            thumbnail: '/LP/bday-dogs/puppy2.jpg',
            name: 'くるむ',
            birthdate: new Date("2021/01/25"),
            breed: 'まるぷー'
        },
        {
            id: 3,
            thumbnail: '/LP/bday-dogs/puppy3.jpg',
            name: 'John',
            birthdate: new Date("2019/08/25"),
            breed: '柴犬'
        },
        {
            id: 4,
            thumbnail: '/LP/bday-dogs/puppy4.jpg',
            name: 'Victor',
            birthdate: new Date("2024/03/25"),
            breed: 'まるぷー'
        }
    ];

    return (
        <div className="relative pb-[100px] w-full flex justify-center">
            <EditForm userDetails={userDetails} pets={pets}/>
        </div>
    )
}