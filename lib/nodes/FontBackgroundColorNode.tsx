import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $addNodeStyle, $patchStyleText } from "@lexical/selection";
import { $getSelection, $getTextContent, $insertNodes, $isRangeSelection, COMMAND_PRIORITY_HIGH, createCommand, EditorConfig, LexicalCommand, LexicalEditor, NodeKey, SerializedLexicalNode, SerializedTextNode, Spread, TextModeType, TextNode } from "lexical";
import { DEFAULT_SERIF_FONT } from "next/dist/shared/lib/constants";

export class FontBackgroundColorNode extends TextNode {
  __backgroundColor: string;

  constructor(text: string, backgroundColor: string, key?: NodeKey) {
    super(text, key);
    this.__backgroundColor = backgroundColor;
  }

  static getType(): string {
      return 'fontBackgroundColor';
  }

  static clone(node: FontBackgroundColorNode): FontBackgroundColorNode {
    return new FontBackgroundColorNode(node.__text, node.__backgroundColor, node.__key);
  }

  createDOM(config: EditorConfig, editor?: LexicalEditor): HTMLElement {
    const element = document.createElement("p");
    element.style.color = config.theme.color;
    return element;
  }

  updateDOM(prevNode: TextNode, dom: HTMLElement, config: EditorConfig): boolean {
    return false;
  }

  exportJSON(): SerializedFontBackgroundColorNode {
    return {
      ...super.exportJSON(),
      backgroundColor: this.__backgroundColor,
      type: "fontBackgroundColor",
      version: 2,
    };
  }

  static importJSON(serializedNode: SerializedFontBackgroundColorNode): FontBackgroundColorNode {
    const node = $createFontBackgroundColorNode(serializedNode.text, serializedNode.backgroundColor);
    node.setDetail(serializedNode.detail);
    node.setFormat(serializedNode.format);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }
  
}

export function $createFontBackgroundColorNode(text: string, backgroundColor: string): FontBackgroundColorNode {
  return new FontBackgroundColorNode(text, backgroundColor);
}

export function $isFontColorNode(node: FontBackgroundColorNode): node is FontBackgroundColorNode {
  return node instanceof FontBackgroundColorNode;
}

export const FORMAT_FONTBACKGROUNDCOLOR_COMMAND: LexicalCommand<string> = createCommand("changeFontBackgroundColor");

export function FontBackgroundColorNodePlugin(): null {
  const [editor] = useLexicalComposerContext();
  if(!editor.hasNodes([FontBackgroundColorNode])) {
    throw new Error(
      "FontBackgroundColorNodePlugin: FontBackgroundColorNode not registered on the editor (initialConfig.nodes)"
    );
  }

  editor.registerCommand(
    FORMAT_FONTBACKGROUNDCOLOR_COMMAND,
    (backgroundColor: string) => {
      const selection = $getSelection();
      if($isRangeSelection(selection)) {
        $patchStyleText(selection, {"background": `${backgroundColor}` || ''})
      }

      return true;
    },
    COMMAND_PRIORITY_HIGH
  );

  return null;
}

export type SerializedFontBackgroundColorNode = Spread<{
  detail: number;
  format: number;
  mode: TextModeType;
  style: string;
  text: string;
  backgroundColor: string;
}, SerializedLexicalNode>;