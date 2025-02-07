import { BlogData } from "@/constants/interface";
import React from "react";
import ColumnLine from "./ColumnLine";

export default function FileElement({ blog }: { blog: BlogData }) {
  return (
    <React.Fragment>
      <section className="w-44 md:w-96 relative">
        <div className="grid-cols-12 absolute w-full grid justify-center">
          <img
            src="/columns/paw1.png"
            className="col-span-3 p-2 relative left-2 z-20"
            alt=""
          />
          <h1 className="col-span-9"></h1>
        </div>
        <div
          style={{
            maskImage: `url(mask.png)`,
            maskRepeat: "no-repeat",
            maskSize: "100%",
          }}
          className="file-head grid grid-cols-12 h-20 md:h-52 relative"
        >
          <img
            src={blog.blog_image}
            className="absolute w-full h-full top-0 object-cover z-10 left-0 rounded-t-lg"
            alt=""
          />
        </div>
        <div className="bg-shadow absolute top-2 rounded-lg -right-1 md:-right-2 w-1/2 h-full -z-10"></div>
        <div className="file-body bg-white p-2 px-4 rounded-b-lg relative">
          <div className="absolute top-2 -right-1 md:-right-2 bg-shadow w-full h-full rounded-b-lg -z-10"></div>
          <h1 className="text-xs font-bold md:text-sm line-clamp-2 h-[2lh]">
            {blog.title}
          </h1>
        </div>
      </section>
      <section className="w-44 md:w-96 flex gap-4 items-center mt-8">
        <ColumnLine />
        <p className="font-bold min-w-24 md:px-6 py-2 text-xs md:text-sm bg-white rounded-full w-full line-clamp-1 text-center">
          {blog.blog_category}
        </p>
        <ColumnLine />
      </section>
    </React.Fragment>
  );
}
