"use client";
import React from "react";
import "./columnDisplay.css";
import "@/lib/rich-editor/style.css";
import "@/lib/nodes/ImageNode.css";
import "@/lib/lib/ImageResizer.css";
import OptImage from "@/app/components/ElementComponents/Image";
import useColumnDisplay from "./useColumnDisplay";
import { BlogData, DisplayRecipe } from "@/constants/interface";
import { Book, CalendarPlus, Confetti, Dog, ForkKnife, PawPrint } from "@phosphor-icons/react/dist/ssr";
import MainSearchForm from "@/app/components/MainSearchForm";
import Link from "next/link";

const blogCategories = [
  {icon: <PawPrint weight="fill" fill="#523636" />,text: "All", url: "/columns"},
  {icon: <ForkKnife weight="fill" fill="#523636" />,text: "レシピ特集", url: "/columns"},
  {icon: <Book weight="fill" fill="#523636" />,text: "基礎知識", url: "/columns"},
  {icon: <PawPrint weight="fill" fill="#523636" />,text: "その他", url: "/columns"},
]

const icons = {
  All: <PawPrint weight="fill" fill="#52363680" />,
  レシピ特集: <ForkKnife weight="fill" fill="#52363680" />,
  基礎知識: <Book weight="fill" fill="#52363680" />,
  その他: <PawPrint weight="fill" fill="#52363680" />,
}

const ColumnDisplay = ({ blogData, relatedBlogs, popularRecipes }: { blogData: BlogData, relatedBlogs: BlogData[], popularRecipes: DisplayRecipe[] }) => {
  const { htmlString } = useColumnDisplay(blogData);
  return (
    <article className="grid lg:gap-4 grid-cols-12">
      <section className="col-span-12 max-h-max lg:col-span-8 mt-6 bg-secondary-bg p-10">
        <h1 className="text-xl mb-2">{blogData.title}</h1>
        <p className="flex gap-2 items-center mb-6 text-sm text-gray-500">
          <CalendarPlus size={16} />
          {new Date(blogData.created_at).toDateString()}
          <p className="ml-4">{blogData.blog_category}</p>
        </p>
        <OptImage
          src={blogData.blog_image}
          width={1280}
          fullContainer={false}
          fit="cover"
        />
        <div
          className="my-8 break-all"
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      </section>
      <section className="flex flex-col gap-12 col-span-12 lg:col-span-4 lg:mt-6 bg-secondary-bg max-h-max p-4">
        <section className="hidden lg:flex flex-col gap-2">
          <header className="flex gap-4 items-center">
            <img
                src={"/icons/logo-new-v2.png"}
                className=" h-[20px] w-[20px] relative"
                width={60}
                height={60}
                alt="website icon"
              />
              <h1>Search</h1>
          </header>
          <MainSearchForm isInView/>
        </section>
        <section className="flex flex-col gap-2 items-center">
          <header className="flex w-full gap-4 items-center">
            <img
              src={"/icons/logo-new-v2.png"}
              className=" h-[20px] w-[20px] relative"
              width={60}
              height={60}
              alt="website icon"
            />
            <h1>About me</h1>
          </header>
          <div className="w-full flex justify-center mb-10">
            <img
              src={"/about_me.jpg"}
              className=" h-[130px] w-[130px] rounded-full relative"
              width={60}
              height={60}
              alt="about me image"
            />
          </div>
          <p>わんごはんの中の人。愛犬に美味しいご飯を作ってあげたい。そんな愛犬家の皆さんが作る「わんごはん」レシピを共有するサイトを作れたらと思いこのwebアプリを作成。ブログでは、飼い主さんなら知っておきたい知識をお届けしています。</p>
          <a target="_blank" href="https://www.instagram.com/rei_wangohan?igsh=MTRtcHIzaGQydTg0">
          <img
            src={"/icons/sns-ig.svg"}
            className="mt-8 h-[40px] w-[40px] relative"
            width={60}
            height={60}
            alt="website icon"
          />
          </a>
        </section>
        <section className="grid grid-cols-1">
          <header className="flex gap-4 items-center mb-4">
            <img
              src={"/icons/logo-new-v2.png"}
              className=" h-[20px] w-[20px] relative"
              width={60}
              height={60}
              alt="website icon"
            />
            <h1>Categories</h1>
          </header>
          <nav>
            <ul className="grid grid-cols-1 gap-2">
              {blogCategories.map( (c, idx) => {
                return (
                  <li className="hover:bg-black/5 text-sm transition-colors duration-250 flex items-center gap-4 px-4 py-2" key={idx}>
                    {c.icon} <Link href={c.url}>{c.text}</Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </section>
        <section className="grid grid-cols-1">
          <header className="flex gap-4 items-center mb-4">
            <img
              src={"/icons/logo-new-v2.png"}
              className=" h-[20px] w-[20px] relative"
              width={60}
              height={60}
              alt="website icon"
            />
            <h1>こちらの記事もチェック</h1>
          </header>
          <nav>
            <ul className="grid grid-cols-1 gap-1">
              {relatedBlogs.map( (c, idx) => {
                const obj = JSON.parse(JSON.stringify(c.editor_state));
                let i = 0;
                while(obj.root.children[i].type !== 'heading' && obj.root.children[i].type !== 'paragraph') {
                  i++;
                }
                const first = obj.root.children[i];
                let x = 0;
                while(first.children[x].type !== 'text') {
                  x++;
                }

                const text = first.children[x].text;

                return (
                  <li className="hover:bg-black/5 text-sm transition-colors duration-250 flex items-center gap-4 px-4 py-2" key={idx}>
                    <Link className="grid grid-cols-7 py-1 w-full gap-2 overflow-hidden" href={"/columns/" + c.blog_id}>
                      <img
                        src={c.blog_image}
                        className=" h-[90px] w-[140px] col-span-3 relative"
                        width={120}
                        height={67.5}
                        alt="website icon"
                      />
                      <h1 className="h-[90px] relative text-sm col-span-4 overflow-hidden">
                        <span className="line-clamp-3">
                          【{c.title}】<span className="text-xs">{text}</span>
                        </span>
                        <span className="text-xs flex items-center gap-1 absolute bottom-0 right-0 text-primary-text/50">Category: {icons[c.blog_category as keyof typeof icons]}{c.blog_category}</span>
                      </h1>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </section>

        <section className="grid grid-cols-1">
          <header className="flex gap-4 items-center mb-4">
            <img
              src={"/icons/logo-new-v2.png"}
              className=" h-[20px] w-[20px] relative"
              width={60}
              height={60}
              alt="website icon"
            />
            <h1>人気のレシピをチェック</h1>
          </header>
          <nav>
            <ul className="grid grid-cols-1 gap-1">
              {popularRecipes.map( (r, idx) => {
                return (
                  <li className="hover:bg-black/5 text-sm transition-colors duration-250 flex items-center gap-4 px-4 py-2" key={idx}>
                    <Link className="grid grid-cols-7 py-1 w-full gap-2 overflow-hidden" href={"/recipes/show/" + r.recipe_id}>
                      <img
                        src={r.recipe_image}
                        className=" h-[90px] w-[140px] col-span-3 relative"
                        width={120}
                        height={67.5}
                        alt="website icon"
                      />
                      <h1 className="text-sm col-span-4 overflow-hidden">
                        <span className="line-clamp-4">
                          {r.recipe_age_tag && `【${r.recipe_age_tag}】`} {r.recipe_event_tag && `【${r.recipe_event_tag}】`} {r.recipe_size_tag && `【${r.recipe_size_tag}】`}{r.recipe_name}
                        </span>
                      </h1>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </section>
      </section>
    </article>
  );
};

export default ColumnDisplay;
