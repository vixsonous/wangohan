"use client";
import { BlogData } from "@/constants/interface";
import Link from "next/link";
import FileElement from "../components/ElementComponents/FileElement";
import React, { useState } from "react";
import Button from "../components/Button";

const BlogList = ({ blogData }: { blogData: BlogData[] }) => {
  const [displayBlogs, setDisplayBlogs] = useState([...blogData]);

  const handleCategoryChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const t = e.currentTarget;
    const name = t.name;
    const tempData = [...blogData];
    const resultData = tempData.filter((data) => data.blog_category === name);
    setDisplayBlogs(name === "" ? blogData : resultData);
  };
  return (
    <React.Fragment>
      <ul className="flex w-full justify-center gap-2">
        <li>
          <Button name="" onClick={handleCategoryChange}>
            All
          </Button>
        </li>
        <li>
          <Button name="レシピ特集" onClick={handleCategoryChange}>
            レシピ特集
          </Button>
        </li>
        <li>
          <Button name="基礎知識" onClick={handleCategoryChange}>
            基礎知識
          </Button>
        </li>
        <li>
          <Button name="その他" onClick={handleCategoryChange}>
            その他
          </Button>
        </li>
      </ul>
      <div className="flex flex-wrap gap-6 p-4 justify-between">
        {displayBlogs.length > 0 ? (
          displayBlogs.map((blog, idx) => {
            return (
              <Link href={`/columns/` + blog.blog_id} className="self-start">
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
