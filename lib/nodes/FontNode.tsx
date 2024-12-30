import { EditorConfig, LexicalEditor, NodeKey, SerializedLexicalNode, SerializedTextNode, Spread, TextModeType, TextNode } from "lexical";

export class FontNode extends TextNode {
  __font: string;

  constructor(text: string, font: string, key?: NodeKey) {
    super(text, key);
    this.__font = font;
  }

  static getType(): string {
      return 'font';
  }

  static clone(node: FontNode): FontNode {
    return new FontNode(node.__text, node.__font, node.__key);
  }

  createDOM(config: EditorConfig, editor?: LexicalEditor): HTMLElement {
    const element = document.createElement("p");
    element.style.fontFamily = config.theme.fontFamily;
    return element;
  }

  updateDOM(prevNode: TextNode, dom: HTMLElement, config: EditorConfig): boolean {
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
}

export type SerializedFontNode = Spread<{
  detail: number;
  format: number;
  mode: TextModeType;
  style: string;
  text: string;
  font: string;
}, SerializedLexicalNode>;