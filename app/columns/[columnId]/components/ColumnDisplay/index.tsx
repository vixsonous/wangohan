"use client";
import React from "react";
import "./columnDisplay.css";
import "@/lib/rich-editor/style.css";
import "@/lib/nodes/ImageNode.css";
import "@/lib/lib/ImageResizer.css";
import OptImage from "@/app/components/ElementComponents/Image";
import useColumnDisplay from "./useColumnDisplay";
import { BlogData } from "@/constants/interface";

const ColumnDisplay = ({ blogData }: { blogData: BlogData }) => {
  const { htmlString, state } = useColumnDisplay(blogData);

  return (
    <article className="grid gap-4 grid-cols-12">
      <section className="col-span-8 mt-6 bg-secondary-bg p-4">
        <h1 className="md:text-4xl text-4xl mb-8">{state.title}</h1>
        <OptImage
          src={state.blog_image}
          width={1280}
          height={800}
          fullContainer={false}
          fit="cover"
        />
        <div
          className="my-8 break-all"
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
        <h2 className="text-lg md:text-xl">{state.blog_category}</h2>
      </section>
      <section className="col-span-4 mt-6 bg-secondary-bg max-h-max p-4">
        Navigation is here
      </section>
    </article>
  );
};

export default ColumnDisplay;
