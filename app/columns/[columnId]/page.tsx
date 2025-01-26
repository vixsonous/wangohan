import dynamic from "next/dynamic";
import IndexLoading from "@/app/loading";
import { Metadata, ResolvingMetadata } from "next";
import { get } from "@/action/common";
import { BlogData } from "@/constants/interface";

type Props = {
  params: { columnId: String };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { columnId } = params;
  const title = `Blog ${columnId}`;

  return {
    title: title,
  };
}

const ColumnDisplay = dynamic(() => import("./ColumnDisplay"), {
  ssr: false,
  loading: () => <IndexLoading />,
});

export default async function OneColumn({
  params,
}: {
  params: { columnId: string };
}) {
  const { columnId } = params;

  const blogData: BlogData = await get<"blog_columns_table", BlogData>(
    "blog_columns_table"
  ).findEqualOne("blog_id", columnId);

  return (
    <div>
      <ColumnDisplay blogData={blogData} />
    </div>
  );
}
