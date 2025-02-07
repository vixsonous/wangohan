"use client";
import { BlogData } from "@/constants/interface";
import Link from "next/link";
import FileElement from "../../../components/ElementComponents/FileElement";
import React, { useState } from "react";
import Button from "../../../components/Button";
import CategoryButton from "../CategoryButton";

const BlogList = ({ blogData }: { blogData: BlogData[] }) => {
  const [displayBlogs, setDisplayBlogs] = useState([...blogData]);

  const handleChange = (category: string) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      const t = e.currentTarget;
      const name = category;
      const tempData = [...blogData];
      const resultData = tempData.filter((data) => data.blog_category === name);
      setDisplayBlogs(name === "" ? blogData : resultData);
    };
  };

  return (
    <React.Fragment>
      <ul className="py-8 flex w-full text-xs md:text-sm justify-center gap-2">
        <li>
          <CategoryButton onClick={handleChange("")}>
            <p>All</p>
          </CategoryButton>
        </li>
        <li>
          <CategoryButton onClick={handleChange("レシピ特集")}>
            レシピ特集
          </CategoryButton>
        </li>
        <li>
          <CategoryButton onClick={handleChange("基礎知識")}>
            基礎知識
          </CategoryButton>
        </li>
        <li>
          <CategoryButton onClick={handleChange("その他")}>
            その他
          </CategoryButton>
        </li>
      </ul>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {displayBlogs.length > 0 ? (
          displayBlogs.map((blog, idx) => {
            return (
              <Link
                href={`/columns/` + blog.blog_id}
                className="col-span-1 flex flex-col items-center justify-center"
              >
                <FileElement blog={blog} />
              </Link>
            );
          })
        ) : (
          <div>No blogs!</div>
        )}
      </div>
    </React.Fragment>
  );
};

export default BlogList;
