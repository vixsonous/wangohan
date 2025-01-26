import { get } from "@/action/common";
import { BlogData } from "@/constants/interface";
import Link from "next/link";

export default async function Columns() {
  return (
    <section className="mt-6">
      <h1>Columns</h1>
      <div className="flex flex-col gap-1"></div>
    </section>
  );
}
