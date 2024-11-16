import { Suspense } from "react";
import IndexLoading from "../loading";
import OptImage from "../components/ElementComponents/Image";
import Dropdown from "./components/Dropdown";
import { Monitor, Article, Book, UsersThree } from '@phosphor-icons/react/dist/ssr';

export default async function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  const IconSize=20;
    return (
        <Suspense fallback={<IndexLoading />}>
            <div className="flex flex-col overflow-y-visible justify-center items-center ">
                <div className="relative overflow-y-visible max-w-md w-full">
                    <section className="md:hidden px-4 pt-2">
                        <div className="bg-secondary-bg p-2 rounded-full flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <OptImage className="w-8 h-8 rounded-full" src={'https://wangohan-public.s3.ap-northeast-1.amazonaws.com/00000003/profile/MlXG7GuTcRjVhQS2FB7VPtype_thumbnail.webp'}/>
                                <span className="text-sm font-bold">Victor Chiong</span>
                            </div>
                            <Dropdown>
                              <ul className=" flex w-full min-w-min flex-col gap-2 bg-secondary-bg items-center p-2 rounded-md border border-primary-text">
                                <li className="flex items-center gap-2 justify-between w-full px-4 bg-primary-bg rounded-l-full">
                                    <Monitor />
                                    <span>Dashboard</span>
                                </li>
                                <li className="flex items-center justify-between w-full px-4 rounded-l-full">
                                    <UsersThree />
                                    <span>Users</span>
                                </li>
                                <li className="flex items-center justify-between w-full px-4 rounded-l-full">
                                    <Book />
                                    <span>Recipe</span>
                                </li>
                                <li className="flex items-center justify-between w-full px-4 rounded-l-full">
                                    <Article />
                                    <span>Blog</span>
                                </li>
                              </ul>
                            </Dropdown>
                        </div>
                    </section>
                    {children}
                </div>
            </div>
        </Suspense>
    )
}