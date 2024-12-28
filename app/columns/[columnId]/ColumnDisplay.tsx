"use client";
import React, { useEffect, useState } from "react";
import { createEditor, ParagraphNode, TextNode } from "lexical";
import { customGenerateHtmlFromNodes } from "@/lib/lib/GenerateHtml";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ImageNode } from "@/lib/nodes/ImageNode";
import { YouTubeNode } from "@/lib/nodes/YoutubeNode";
import { HeadingNode } from "@lexical/rich-text";
import { AlignmentNode } from "@/lib/nodes/AlignmentNode";
import { IndentationNode } from "@/lib/nodes/IndentationNode";
import { constructImportMap, exportMap } from "@/lib/rich-editor/Editor";
import './columnDisplay.css';
import Theme from "@/lib/rich-editor/Theme";


const ColumnDisplay = ({ editorStateJson }: {editorStateJson: string}) => {
  const [htmlString, setHtmlString] = useState("");

  useEffect(() => {
    // Create a new Lexical editor instance
    const ss = sessionStorage.getItem('editor');
    if(!ss) return;
    const editor = createEditor({
      namespace: 'Display',
      html: {
        export: exportMap,
        import: constructImportMap()
      },
      nodes: [ParagraphNode, TextNode, LinkNode, AutoLinkNode, ImageNode, YouTubeNode, HeadingNode, AlignmentNode, IndentationNode],
      theme: Theme
    });
    
    
    // Parse the JSON and set it as the editor state
    const parsedEditorState = editor.parseEditorState(ss);
    editor.setEditorState(parsedEditorState);
    editor.read(() => {
      // Convert the editor state to HTML
      const html = customGenerateHtmlFromNodes(editor);
      setHtmlString(html);
    });
    
  }, []);

  return (
    <div>
      <h2>Rendered HTML:</h2>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </div>
  );
};

export default ColumnDisplay;
