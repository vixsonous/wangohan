import Image from "next/image";
import RecipeListElement from "../RecipeListElement";
import { Metadata, ResolvingMetadata } from "next";
import { getAllRecipes, totalRecipes } from "@/action/recipe";
import { DisplayRecipe } from "@/constants/interface";
import Link from "next/link";

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

export default async function RecipeList({params, searchParams}:{params: {pageNo:string}, searchParams: { [key: string]:string | string[] | undefined}}) {
  const {pageNo} = params;

  const [recipes, count] = await Promise.all([await getAllRecipes(parseInt(pageNo) - 1, 20), await totalRecipes()]);
  const cnt = Math.ceil(count / 20);
  const r = new Array(cnt).fill(0).map((_,i) => i );
  console.log(r);
    return (
        <div className="flex flex-col mt-[30px] gap-[30px]">
            <div className="flex flex-col justify-center items-center relative p-2 lg:p-0">
                <h1 className="absolute top-[26px] lg:top-[15px] text-[18px] font-semibold text-[#523636]">わんごはん図鑑</h1>
                <img src={'/icons/ribbon.webp'} className="h-[auto] w-[270px] sm:w-[300px] max-w-none mb-[30px]" width={10000} height={10000}  alt="website banner" />
                <RecipeListElement recipes={recipes.body as DisplayRecipe[]}/>
                <div className="p-[20px]">
                  {
                    r.map( (l, idx) => {
                      return <Link href={`/recipe/list/${l + 1}`} className={`p-[10px] rounded-[10px] ${Number(l + 1) === Number(pageNo) ? `bg-[#523636] text-white active`: ``}`}>{ Number(l) + 1}</Link>
                    })
                  }
                    {/* <span className="active p-[10px] bg-[#523636] rounded-[10px] text-white">1</span>
                    <span className=" rounded-[10px] p-[10px]">2</span>
                    <span className=" rounded-[10px] p-[10px]">3</span>
                    <span className=" rounded-[10px] p-[10px]">4</span>
                    <span>...</span>
                    <span className=" rounded-[10px] p-[10px]">20</span> */}
                </div>
            </div>
        </div>
    )
}