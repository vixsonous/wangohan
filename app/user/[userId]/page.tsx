import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

interface DogData {
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
            thumbnail: '/LP/bday-dogs/puppy1.jpg',
            name: 'ポチ',
            birthdate: new Date("2022/05/25"),
            breed: '柴犬'
        },
        {
            thumbnail: '/LP/bday-dogs/puppy2.jpg',
            name: 'くるむ',
            birthdate: new Date("2021/01/25"),
            breed: 'まるぷー'
        },
        {
            thumbnail: '/LP/bday-dogs/puppy3.jpg',
            name: 'John',
            birthdate: new Date("2019/08/25"),
            breed: '柴犬'
        },
        {
            thumbnail: '/LP/bday-dogs/puppy4.jpg',
            name: 'Victor',
            birthdate: new Date("2024/03/25"),
            breed: 'まるぷー'
        }
    ];

    function _calculateAge(birthDate : Date) { // birthday is a date
        var ageDifMs = Date.now() - birthDate.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const petContainer = (petData: DogData) => {
        
        return (
            <div key={new Date().getTime() * Math.random()} className="flex flex-grow flex-shrink-0 flex-basis: 50% justify-center items-center gap-[20px]">
                <div>
                    <Image src={petData.thumbnail} className="rounded-[50%] w-[50px] h-[50px] object-cover relative" width={10000} height={10000}  alt="website banner" />
                </div>
                <div className="flex flex-col gap-[5px] text-[#5b5351]">
                    <p className="text-[16px] font-bold">{petData.name}</p>
                    <p className="text-[10px]">{`(${_calculateAge(petData.birthdate)}才) `}{petData.birthdate.toISOString().split('T')[0]}</p>
                    <p className="text-[10px]">{petData.breed}</p>
                </div> 
            </div>
        )
    }
    return (
        <div>
            <div className="user-image flex flex-col justify-center items-center mt-[30px]">
                <Image src={'/resource/dog-and-cat.jpg'} className=" h-[auto] rounded-[50%] w-[150px] h-[150px] relative" width={10000} height={10000}  alt="website banner" />
                <h1 className="text-[36px] font-bold text-[#5b5351]">あみち</h1>
            </div>
            <div className="flex justify-center items-center relative mt-[10px] mb-[30px]">
                <h1 className="absolute top-[10px] font-semibold text-[#523636]">うちのわん</h1>
                <Image src={'/icons/ribbon.png'} className="h-[auto] w-[200px] sm:w-[300px] max-w-none" width={10000} height={10000}  alt="website banner" />
            </div>
            <div className="pet-list p-[20px] flex flex-wrap gap-[20px] items-center">
                {
                    pets.map(pet => petContainer(pet))
                }
            </div>
            <div className="tab-list">

            </div>
        </div>
    )
}