import { DecoratorNode, SerializedLexicalNode } from "lexical";

export interface SerializedAlignmentNode extends SerializedLexicalNode {
  type: 'alignment';
  version: 1;
  alignment: string;
}

export class AlignmentNode extends DecoratorNode<JSX.Element> {
  alignment: string;

  constructor(alignment: string, key?:string) {
    super(key);
    this.alignment = alignment
  }

  static getType(): string {
    return 'alignment';
  }

  static clone(node: AlignmentNode): AlignmentNode {
    return new AlignmentNode(node.alignment, node.getKey());
  }

  createDOM(config: Record<string, unknown>): HTMLElement {
    const dom = document.createElement('div');
    dom.style.textAlign = this.alignment;
    return dom;
  }

  updateDOM(prevNode: AlignmentNode, dom: HTMLElement): boolean {
    if (prevNode.alignment !== this.alignment) {
      dom.style.textAlign = this.alignment;
    }
    return true;
  }

  exportJSON(): SerializedAlignmentNode {
    return {
      type: 'alignment',
      version: 1,
      alignment: this.alignment,
    };
  }

  static importJSON(serializedNode: Record<string, any>): AlignmentNode {
    return new AlignmentNode(serializedNode.alignment);
  }
}