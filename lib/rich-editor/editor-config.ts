import {
  $isTextNode,
  DOMConversionMap,
  DOMExportOutput,
  Klass,
  LexicalEditor,
  LexicalNode,
  ParagraphNode,
  TextNode,
} from "lexical";
import { FontColorNode } from "../nodes/FontColorNode";
import { FontNode } from "../nodes/FontNode";
import { FontBackgroundColorNode } from "../nodes/FontBackgroundColorNode";
import { FontSizeNode } from "../nodes/FontSizeNode";
import { HeadingNode } from "@lexical/rich-text";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { ImageNode } from "@/lib/nodes/ImageNode";
import { YouTubeNode } from "@/lib/nodes/YoutubeNode";
import { IndentationNode } from "@/lib/nodes/IndentationNode";
import { parseAllowedColor, parseAllowedFontSize } from "./styleConfig";
import ExampleTheme from "./Theme";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";

const exportDOM = (
  editor: LexicalEditor,
  target: LexicalNode
): DOMExportOutput => {
  const output = target.exportDOM(editor);

  return output;
};

export const exportMap = new Map<
  Klass<LexicalNode>,
  (editor: LexicalEditor, target: LexicalNode) => DOMExportOutput
>([
  [ParagraphNode, exportDOM],
  [TextNode, exportDOM],
  [YouTubeNode, exportDOM],
]);

const getExtraStyles = (element: HTMLElement): string => {
  // Parse styles from pasted input, but only if they match exactly the
  // sort of styles that would be produced by exportDOM
  let extraStyles = "";
  const fontSize = parseAllowedFontSize(element.style.fontSize);
  const backgroundColor = parseAllowedColor(element.style.backgroundColor);
  const color = parseAllowedColor(element.style.color);
  if (fontSize !== "" && fontSize !== "15px") {
    extraStyles += `font-size: ${fontSize};`;
  }
  if (backgroundColor !== "" && backgroundColor !== "rgb(255, 255, 255)") {
    extraStyles += `background-color: ${backgroundColor};`;
  }
  if (color !== "" && color !== "rgb(0, 0, 0)") {
    extraStyles += `color: ${color};`;
  }
  return extraStyles;
};

export const constructImportMap = (): DOMConversionMap => {
  const importMap: DOMConversionMap = {};

  // Wrap all TextNode importers with a function that also imports
  // the custom styles implemented by the playground
  for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode);
      if (!importer) {
        return null;
      }
      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element);
          if (
            output === null ||
            output.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
          ) {
            return output;
          }
          const extraStyles = getExtraStyles(element);
          if (extraStyles) {
            const { forChild } = output;
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent);
                if ($isTextNode(textNode)) {
                  textNode.setStyle(textNode.getStyle() + extraStyles);
                }
                return textNode;
              },
            };
          }
          return output;
        },
      };
    };
  }

  return importMap;
};

export const editorConfig = {
  html: {
    export: exportMap,
    import: constructImportMap(),
  },
  namespace: "React.js Demo",
  nodes: [
    FontNode,
    ParagraphNode,
    TextNode,
    LinkNode,
    AutoLinkNode,
    ImageNode,
    YouTubeNode,
    HeadingNode,
    IndentationNode,
    FontSizeNode,
    FontColorNode,
    FontBackgroundColorNode,
    TableNode,
    TableRowNode,
    TableCellNode
  ],
  onError(error: Error) {
    throw error;
  },
  theme: ExampleTheme,
  autoFocus: false,
};
