import IndexLoading from "@/app/loading";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/lib/rich-editor/Editor"), {
  ssr: false,
  loading: () => <IndexLoading />,
});

export default function BlogCreate({ params }: { params: { userId: string } }) {
  const { userId } = params;

  return (
    <div className="w-full px-4 flex flex-col gap-4">
      <Editor userId={Number(userId)} />
    </div>
  );
}
