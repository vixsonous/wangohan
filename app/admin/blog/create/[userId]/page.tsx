import IndexLoading from "@/app/loading";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/lib/rich-editor/Editor"), {
  ssr: false,
  loading: () => <IndexLoading />,
});

export default function BlogCreate({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const content =
    '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

  return (
    <div className="w-full px-4 flex flex-col gap-4">
      <Editor content={content} userId={Number(userId)} />
    </div>
  );
}
