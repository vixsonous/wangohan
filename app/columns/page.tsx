import { get } from "@/action/common";
import { BlogData } from "@/constants/interface";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Columns",
};

export default async function Columns() {
  const blogData: BlogData = await get<"blog_columns_table", BlogData>(
    "blog_columns_table"
  ).findEqualOne("blog_id", "1");

  return (
    <section className="mt-6">
      <h1>Columns</h1>
      <div className="flex flex-col gap-1"></div>
    </section>
  );
}
