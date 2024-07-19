import Image from "next/image";
import RecipeListElement from "../RecipeListElement";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
    params: {pageNo: String},
    searchParams: {[key: string]: string | string[] | undefined}
}

export async function generateMetadata({params} : Props, parent: ResolvingMetadata):Promise<Metadata> {
    const {pageNo} = params;
    const title = `Page ${pageNo}`;

    return {
        title: title
    }
}

export default function RecipeList() {
    return (
        <div className="flex flex-col mt-[30px] gap-[30px]">
            <div className="flex flex-col justify-center items-center relative">
                <h1 className="absolute top-[15px] text-[18px] font-semibold text-[#523636]">わんごはん図鑑</h1>
                <Image src={'/icons/ribbon.png'} className="h-[auto] w-[270px] sm:w-[300px] max-w-none mb-[30px]" width={10000} height={10000}  alt="website banner" />
                <RecipeListElement recipes={[1,2,3,4,5,6,7,8,9,10, 11, 12, 13, 14, 15, 1,2,3,4,5,6,7,8,9,10, 11, 12, 13, 14, 15, 1,2,3,4,5,6,7,8,9,10, 11, 12, 13, 14, 15]}/>
                <div className="p-[20px]">
                    <span className="active p-[10px] bg-[#523636] rounded-[10px] text-white">1</span>
                    <span className=" rounded-[10px] p-[10px]">2</span>
                    <span className=" rounded-[10px] p-[10px]">3</span>
                    <span className=" rounded-[10px] p-[10px]">4</span>
                    <span>...</span>
                    <span className=" rounded-[10px] p-[10px]">20</span>
                </div>
            </div>
        </div>
    )
}