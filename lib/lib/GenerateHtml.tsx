import { $getRoot, $getSelection, DOMExportOutput, EditorState, ElementNode, LexicalEditor, LexicalNode, ParagraphNode, TextNode } from 'lexical';
import {$generateHtmlFromNodes} from '@lexical/html';

export function customGenerateHtmlFromNodes(editor: LexicalEditor): string {
  return editor.getEditorState().read(() => {
    const root = $getRoot(); // Get the root of the editor
    const selection = $getSelection(); // Optional: Get the current selection, if needed
    return $generateHtmlFromNodes(editor, null)
  });
}