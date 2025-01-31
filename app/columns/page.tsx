import { getBlogs } from "@/action/blog";
import React from "react";
import BlogList from "./BlogList";

export default async function Columns() {
  const blogData = await getBlogs();
  return (
    <section className="mt-6">
      <div className="flex flex-col items-center relative mt-16">
        <h1 className="w-full bottom-16 p-4 bg-white border-2 rounded-2xl border-button max-w-max absolute text-2xl whitespace-pre-wrap lg:text-4xl font-bold text-[#523636]">
          {`犬と「食」に関する知識や\nレシピ特集をご紹介！`}
        </h1>
        <img
          src={"/LP/column.png"}
          loading="lazy"
          className="rounded-md w-[100%] h-[100%] inline max-w-none object-fill"
          width={100}
          height={100}
          alt="website banner"
        />
      </div>
      <BlogList blogData={blogData} />
    </section>
  );
}
