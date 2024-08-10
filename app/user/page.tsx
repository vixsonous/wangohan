
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import TabList from "./components/TabList";
import PetContainer from "./components/PetContainer";

interface DogData {
    id: number,
    thumbnail: string,
    name: string,
    birthdate: Date,
    breed: string
}

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

export default function User() {
    
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
        <div className="relative pb-[100px]">
            <div className="user-image flex flex-col justify-center items-center mt-[30px]">
                <Image src={'/resource/dog-and-cat.jpg'} className="rounded-[100px] w-[150px] h-[150px] relative" width={10000} height={10000}  alt="website banner" />
                <h1 className="text-[36px] font-bold text-[#5b5351]">あみち</h1>
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