import dynamic from "next/dynamic";
import IndexLoading from "@/app/loading";
import { Metadata, ResolvingMetadata } from "next";
import { get } from "@/action/common";
import { BlogData } from "@/constants/interface";

type Props = {
  params: { columnId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { columnId } = params;
  const blogData: BlogData = await get<"blog_columns_table", BlogData>(
    "blog_columns_table"
  ).findEqualOne("blog_id", columnId);
  const title = `${blogData.title}`;

  return {
    title: title,
  };
}

const ColumnDisplay = dynamic(() => import("./components/ColumnDisplay"), {
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: blogData.title,
    description: blogData.title,
    image: blogData.blog_image || "",
    author: {
      "@type": "Person",
      name: blogData.user_id,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ColumnDisplay blogData={blogData} />
    </div>
  );
}
