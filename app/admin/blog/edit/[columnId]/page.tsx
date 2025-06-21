import IndexLoading from "@/app/loading";
import { BlogData } from "@/constants/interface";
import { get } from "@/action/common";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/lib/rich-editor/Editor"), {
  ssr: false,
  loading: () => <IndexLoading />,
});

export default async function BlogEdit({ params }: { params: { columnId: string } }) {
  const { columnId } = params;

  const blogData: BlogData = await get<"blog_columns_table", BlogData>(
      "blog_columns_table"
    ).findEqualOne("blog_id", columnId);
  
  if(!blogData) {
    return (
      <div className="flex justify-center items-center h-screen text-4xl">Blog not found!</div>
    )
  }
  return (
    <div className="w-full px-4 flex flex-col gap-4">
      <Editor userId={Number(columnId)} blogData={blogData}/>
    </div>
  );
}
