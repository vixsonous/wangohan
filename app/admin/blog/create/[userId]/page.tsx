import Editor from "./components/Editor";

export default function BlogCreate() {

  const content = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qew","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"qweerty","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}';

  return (
    <div className="w-full px-4 flex flex-col gap-4">
      <Editor content={content}/>
    </div>
  )
}