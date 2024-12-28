import { ElementNode,SerializedElementNode, SerializedLexicalNode } from 'lexical';

export interface SerializedIndentationNode extends SerializedElementNode {
  type: 'indentation';
  version: 1;
  level: number;
}

export class IndentationNode extends ElementNode {
  level: number;

  constructor(level: number, key?: string) {
    super(key);
    this.level = level;
  }

  static getType(): string {
    return 'indentation';
  }

  static clone(node: IndentationNode): IndentationNode {
    return new IndentationNode(node.level, node.getKey());
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('div');
    dom.style.paddingLeft = `${this.level * 20}px`; // 20px per level
    return dom;
  }

  updateDOM(prevNode: IndentationNode, dom: HTMLElement): boolean {
    if (prevNode.level !== this.level) {
      dom.style.paddingLeft = `${this.level * 20}px`;
    }
    return true;
  }

  exportJSON(): SerializedIndentationNode {
    return {
      ...super.exportJSON(), // Include properties from SerializedElementNode
      type: 'indentation',
      version: 1,
      level: this.level,
    };
  }

  static importJSON(serializedNode: SerializedIndentationNode): IndentationNode {
    return new IndentationNode(serializedNode.level);
  }

  // Override to handle children if needed
  canInsertTextBefore(): boolean {
    return true;
  }
  canInsertTextAfter(): boolean {
    return true;
  }
}
