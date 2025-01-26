"use client";
import React, { useEffect, useState } from "react";
import { createEditor, ParagraphNode, TextNode } from "lexical";
import { customGenerateHtmlFromNodes } from "@/lib/lib/GenerateHtml";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ImageNode } from "@/lib/nodes/ImageNode";
import { YouTubeNode } from "@/lib/nodes/YoutubeNode";
import { HeadingNode } from "@lexical/rich-text";
import { IndentationNode } from "@/lib/nodes/IndentationNode";
import { constructImportMap, exportMap } from "@/lib/rich-editor/Editor";
import "./columnDisplay.css";
import "@/lib/rich-editor/style.css";
import "@/lib/nodes/ImageNode.css";
import "@/lib/lib/ImageResizer.css";
import ExampleTheme from "@/lib/rich-editor/Theme";
import { useRouter } from "next/navigation";
import OptImage from "@/app/components/ElementComponents/Image";
interface BlogData {
  blog_id: number;
  user_id: number;
  title: string;
  editor_state: JSON;
  blog_image: string;
  blog_category: string;
}

const ColumnDisplay = ({ blogData }: { blogData: BlogData }) => {
  const [htmlString, setHtmlString] = useState("");
  const [state, setState] = useState<BlogData>({ ...blogData });
  const router = useRouter();

  useEffect(() => {
    // Create a new Lexical editor instance
    if (!blogData) {
      router.push("/");
      return;
    }

    const editor = createEditor({
      namespace: "Display",
      html: {
        export: exportMap,
        import: constructImportMap(),
      },
      nodes: [
        ParagraphNode,
        TextNode,
        LinkNode,
        AutoLinkNode,
        ImageNode,
        YouTubeNode,
        HeadingNode,
        IndentationNode,
      ],
      onError(error: Error) {
        throw error;
      },
      theme: ExampleTheme,
    });

    // Parse the JSON and set it as the editor state
    const parsedEditorState = editor.parseEditorState(
      JSON.stringify(blogData.editor_state)
    );
    editor.setEditorState(parsedEditorState);
    editor.read(() => {
      // Convert the editor state to HTML
      const html = customGenerateHtmlFromNodes(editor);
      setHtmlString(html);
    });
  }, []);

  return (
    <div className="mt-6 bg-secondary-bg min-h-96 p-4">
      <h1 className="md:text-4xl text-4xl mb-8">{state.title}</h1>
      <OptImage src={state.blog_image} width={1280} height={800} fit="cover" />
      <div
        className="my-8 break-all"
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
      <h2 className="text-lg md:text-xl">{state.blog_category}</h2>
    </div>
  );
};

export default ColumnDisplay;
