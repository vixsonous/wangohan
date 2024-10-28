import { searchRecipes } from "@/action/recipe";
import RecipeElementV1 from "@/app/components/RecipeElementV1";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
    params: {searchRec: string},
    searchParams: {[key: string]: string | string[] | undefined}
}

export async function generateMetadata({params} : Props, parent: ResolvingMetadata):Promise<Metadata> {
    const {searchRec} = params;
    const decoded = decodeURIComponent(searchRec);
    const title = `${decoded}`;

    return {
        title: title
    }
}

export default async function SearchPage({params, searchParams}:{params: {searchRec:string}, searchParams: { [key: string]:string | string[] | undefined}}) {

    const {searchRec} = params;
    const decoded = decodeURIComponent(searchRec);

    const recipes = await searchRecipes(decoded);
    const result = recipes.body

    return (
        <section className="p-[20px]">
            <div className="flex justify-center items-center relative mt-[10px] mb-[30px]">
                <h1 className="absolute top-[10px] font-semibold text-[#523636]">"{decoded}"を含むレシピ</h1>
                <img loading="lazy" src={'/icons/ribbon.webp'} className="h-[auto] w-[200px] sm:w-[300px] max-w-none opacity-0" width={10000} height={10000}  alt="website banner" />
            </div>
            <div className="grid grid-cols-2 gap-x-[10px] gap-y-[20px]">
            {
                result && result.length != 0 ? (
                    result.map( (rec, idx) => {
                        return (
                            <div key={idx} className="h-full">
                                <RecipeElementV1 key={idx} recipe={rec} />
                            </div>
                        )
                    })
                ) : (
                    <span>レシピがありません。</span>
                )
            }
            </div>
        </section>
    )
}