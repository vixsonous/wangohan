import { BlogData } from "@/constants/interface";
import { constructImportMap, exportMap } from "@/lib/rich-editor/editor-config";
import { createEditor, ParagraphNode, TextNode } from "lexical";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ImageNode } from "@/lib/nodes/ImageNode";
import { YouTubeNode } from "@/lib/nodes/YoutubeNode";
import { HeadingNode } from "@lexical/rich-text";
import { IndentationNode } from "@/lib/nodes/IndentationNode";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import ExampleTheme from "@/lib/rich-editor/Theme";
import { customGenerateHtmlFromNodes } from "@/lib/lib/GenerateHtml";

export default function useColumnDisplay(blogData: BlogData) {
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

  return {
    htmlString,
    state,
  };
}
