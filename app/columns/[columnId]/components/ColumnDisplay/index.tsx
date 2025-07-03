"use client";
import React from "react";
import "./columnDisplay.css";
import "@/lib/rich-editor/style.css";
import "@/lib/nodes/ImageNode.css";
import "@/lib/lib/ImageResizer.css";
import OptImage from "@/app/components/ElementComponents/Image";
import useColumnDisplay from "./useColumnDisplay";
import { BlogData } from "@/constants/interface";
import { CalendarPlus } from "@phosphor-icons/react/dist/ssr";

const ColumnDisplay = ({ blogData }: { blogData: BlogData }) => {
  const { htmlString } = useColumnDisplay(blogData);

  return (
    <article className="grid gap-4 grid-cols-12">
      <section className="col-span-12 lg:col-span-8 mt-6 bg-secondary-bg p-10">
        <h1 className="text-xl mb-2">{blogData.title}</h1>
        <p className="flex gap-2 items-center mb-6 text-sm text-gray-500">
          <CalendarPlus size={16} />
          {new Date(blogData.created_at).toDateString()}
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
        <h2 className="text-lg md:text-xl">{blogData.blog_category}</h2>
      </section>
      <section className="hidden lg:block col-span-4 mt-6 bg-secondary-bg max-h-max p-4">
        Navigation is here
      </section>
    </article>
  );
};

export default ColumnDisplay;
