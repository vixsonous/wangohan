import { getBlogs } from "@/action/blog";
import { get } from "@/action/common";
import { BlogData } from "@/constants/interface";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Columns() {
  const data = await getBlogs();
  console.log(data);
  return (
    <section className="mt-6">
      <h1>Columns</h1>
      <div className="flex flex-col gap-1">
        {/* {blogData.map((blog, idx) => {
          return (
            <Link key={idx} href={"/blog/columns/" + blog.blog_id}>
              {blog.title}
            </Link>
          );
        })} */}
      </div>
    </section>
  );
}
