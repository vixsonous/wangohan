import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $addNodeStyle, $patchStyleText } from "@lexical/selection";
import {
  $getSelection,
  $getTextContent,
  $insertNodes,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  createCommand,
  EditorConfig,
  LexicalCommand,
  LexicalEditor,
  NodeKey,
  SerializedLexicalNode,
  SerializedTextNode,
  Spread,
  TextModeType,
  TextNode,
} from "lexical";
import { DEFAULT_SERIF_FONT } from "next/dist/shared/lib/constants";

export class FontNode extends TextNode {
  __font: string;

  constructor(text: string, font: string, key?: NodeKey) {
    super(text, key);
    this.__font = font;
  }

  static getType(): string {
    return "font";
  }

  static clone(node: FontNode): FontNode {
    return new FontNode(node.__text, node.__font, node.__key);
  }

  createDOM(config: EditorConfig, editor?: LexicalEditor): HTMLElement {
    const element = document.createElement("p");
    element.style.fontFamily = config.theme.fontFamily;
    return element;
  }

  updateDOM(
    prevNode: TextNode,
    dom: HTMLElement,
    config: EditorConfig
  ): boolean {
    return false;
  }

  exportJSON(): SerializedFontNode {
    return {
      ...super.exportJSON(),
      font: this.__font,
      type: "font",
      version: 2,
    };
  }

  static importJSON(serializedNode: SerializedFontNode): FontNode {
    const node = $createFontNode(serializedNode.text, serializedNode.font);
    node.setDetail(serializedNode.detail);
    node.setFormat(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }
}

export function $createFontNode(text: string, font: string): FontNode {
  return new FontNode(text, font);
}

export function $isFontNode(node: FontNode): node is FontNode {
  return node instanceof FontNode;
}

export const FORMAT_FONTFAMILY_COMMAND: LexicalCommand<string> =
  createCommand("changeFontFamily");

export function FontFamilyPlugin(): null {
  const [editor] = useLexicalComposerContext();
  if (!editor.hasNodes([FontNode])) {
    throw new Error(
      "FontFamilyPlugin: FontNode not registered on the editor (initialConfig.nodes)"
    );
  }

  editor.registerCommand(
    FORMAT_FONTFAMILY_COMMAND,
    (font: string) => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const text = $getTextContent();
        const node = $createFontNode(text, font);
        $patchStyleText(selection, {
          "font-family": font || DEFAULT_SERIF_FONT.name,
        });
      }

      return true;
    },
    COMMAND_PRIORITY_HIGH
  );

  return null;
}

export type SerializedFontNode = Spread<
  {
    detail: number;
    format: number;
    mode: TextModeType;
    style: string;
    text: string;
    font: string;
  },
  SerializedLexicalNode
>;
