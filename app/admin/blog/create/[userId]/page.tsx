import Editor from "@/lib/rich-editor/Editor";


export default function BlogCreate() {

  const content = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

  return (
    <div className="w-full px-4 flex flex-col gap-4">
      <Editor content={content}/>
    </div>
  )
}