
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import TabList from "./components/TabList";
import PetContainer from "./components/PetContainer";
import { getUser, getUserDetails } from "@/action/users";
import { cookies } from "next/headers";
import { decrypt } from "@/action/lib";
import { redirect } from "next/navigation";
import { DogData } from "@/constants/interface";

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
    const userDetails = await getUserDetails(decryptedSession.user.user_id);

    if(!userDetails) redirect("/");

    const pets : DogData[] = userDetails.pets;

    return (
        <div className="relative pb-[100px]">
            <div className="user-image flex flex-col justify-center items-center mt-[30px]">
                <Image src={'/resource/dog-and-cat.jpg'} className="rounded-[100px] w-[150px] h-[150px] relative" width={10000} height={10000}  alt="website banner" />
                <h1 className="text-[36px] font-bold text-[#5b5351]">wanvictor</h1>
            </div>
            <div className="flex justify-center items-center relative mt-[10px] mb-[30px]">
                <h1 className="absolute top-[10px] font-semibold text-[#523636]">うちのわん</h1>
                <Image src={'/icons/ribbon.png'} className="h-[auto] w-[200px] sm:w-[300px] max-w-none" width={10000} height={10000}  alt="website banner" />
            </div>
            <div className="pet-list p-[20px] flex flex-wrap gap-[20px] items-center">
                {
                    pets.map(pet => <PetContainer key={new Date().getTime() * Math.random()} petData={pet} />)
                }
            </div>
            <TabList />
            <div className="fixed bottom-[20px] z-[9999] right-[10px]">
                <Image src={'/Setting/settingpaw.png'} className="h-[auto] w-[120px]  max-w-none" width={10000} height={10000}  alt="website banner" />
                <span className="relative bottom-[33px] text-[13px] text-white right-[-45px]">設定</span>
            </div>
        </div>
    )
}