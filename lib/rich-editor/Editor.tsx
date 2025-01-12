"use client";
import './style.css';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {LinkPlugin} from '@lexical/react/LexicalLinkPlugin';
import {AutoLinkPlugin, createLinkMatcherWithRegExp} from '@lexical/react/LexicalAutoLinkPlugin';

import {
  $isTextNode,
  DOMConversionMap,
  DOMExportOutput,
  Klass,
  LexicalEditor,
  LexicalNode,
  ParagraphNode,
  TextNode,
} from 'lexical';
import {LinkNode, AutoLinkNode} from "@lexical/link";

import ExampleTheme from './Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import {parseAllowedColor, parseAllowedFontSize} from './styleConfig';
import React, {  memo, useCallback, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import Button from '@/app/components/Button';
import ImagesPlugin from './plugins/ImagePlugin';
import YouTubePlugin from './plugins/YoutubePlugin';
import { HeadingNode } from '@lexical/rich-text';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';
import { customGenerateHtmlFromNodes } from '@/lib/lib/GenerateHtml';
import { ImageNode } from '@/lib/nodes/ImageNode';
import { YouTubeNode } from '@/lib/nodes/YoutubeNode';
import { AlignmentNode } from '@/lib/nodes/AlignmentNode';
import { IndentationNode } from '@/lib/nodes/IndentationNode';
import { FontFamilyPlugin, FontNode } from '../nodes/FontNode';
import { FontSizeNode, FontSizePlugin } from '../nodes/FontSizeNode';
import { FontColorNode, FontColorPlugin } from '../nodes/FontColorNode';
import { FontBackgroundColorNode, FontBackgroundColorNodePlugin } from '../nodes/FontBackgroundColorNode';

const placeholder = 'Enter some rich text...';

const removeStylesExportDOM = (
  editor: LexicalEditor,
  target: LexicalNode,
): DOMExportOutput => {
  const output = target.exportDOM(editor);
  if (output && output.element instanceof HTMLElement) {
    // Remove all inline styles and classes if the element is an HTMLElement
    // Children are checked as well since TextNode can be nested
    // in i, b, and strong tags.
    for (const el of [
      output.element,
      ...output.element.querySelectorAll('[style],[class],[dir="ltr"]'),
    ]) {
      el.removeAttribute('class');
      el.removeAttribute('style');
      if (el.getAttribute('dir') === 'ltr') {
        el.removeAttribute('dir');
      }
    }
  }
  return output;
};

const exportDOM = (
  editor: LexicalEditor,
  target: LexicalNode,
): DOMExportOutput => {
  const output = target.exportDOM(editor);

  return output;
};

const createYoutubeExportDom = (
  editor: LexicalEditor,
  target: LexicalNode,
): DOMExportOutput => {
  const output = target.exportDOM(editor);
  if (output && output.element instanceof HTMLElement) {
    // Remove all inline styles and classes if the element is an HTMLElement
    // Children are checked as well since TextNode can be nested
    // in i, b, and strong tags.
  }
  return output;
};

export const exportMap = new Map<
  Klass<LexicalNode>,
  (editor: LexicalEditor, target: LexicalNode) => DOMExportOutput
>([
  [ParagraphNode, exportDOM],
  [TextNode, exportDOM],
  [YouTubeNode, exportDOM]
]);

const getExtraStyles = (element: HTMLElement): string => {
  // Parse styles from pasted input, but only if they match exactly the
  // sort of styles that would be produced by exportDOM
  let extraStyles = '';
  const fontSize = parseAllowedFontSize(element.style.fontSize);
  const backgroundColor = parseAllowedColor(element.style.backgroundColor);
  const color = parseAllowedColor(element.style.color);
  if (fontSize !== '' && fontSize !== '15px') {
    extraStyles += `font-size: ${fontSize};`;
  }
  if (backgroundColor !== '' && backgroundColor !== 'rgb(255, 255, 255)') {
    extraStyles += `background-color: ${backgroundColor};`;
  }
  if (color !== '' && color !== 'rgb(0, 0, 0)') {
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
            const {forChild} = output;
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
  namespace: 'React.js Demo',
  nodes: [
    FontNode,
    ParagraphNode, 
    TextNode, 
    LinkNode, 
    AutoLinkNode, 
    ImageNode, 
    YouTubeNode, 
    HeadingNode, 
    AlignmentNode, 
    IndentationNode,
    FontSizeNode,
    FontColorNode,
    FontBackgroundColorNode
  ],
  onError(error: Error) {
    throw error;
  },
  theme: ExampleTheme,
};


export default memo(function App({content}:{content: string}) {
  const [state, setState] = useState<String>();
  const [htmlString, setHtmlString] = useState<String>('');
  const [isMounted, setIsMounted] = useState(false);
  const [editorState, setEditorState] = useState<string | null>(content);
  const [submit, setSubmit] = useState(false);

  const OnChangePlugin = memo(function OnChangePlugin() {
    const [editor] = useLexicalComposerContext();
  
    useEffect(() => {

      return editor.registerUpdateListener(({editorState}) => {
        editor.read(() => {
          const jsonState = editorState.toJSON();
          setState(JSON.stringify(jsonState));
          const html = customGenerateHtmlFromNodes(editor);
          setHtmlString(html);
          sessionStorage.setItem('editor', JSON.stringify(jsonState));
        });
      })
    },[editor]);
    return null;
  });

  useEffect(() => {
    const c = sessionStorage.getItem('editor');
    if(c) {
      setEditorState(c);
    }

    setIsMounted(true);
  },[]);

  const createBlog = useCallback( async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    setSubmit(true);
    const res = await fetch("/api/blog", {
      method: 'POST',
      body: JSON.stringify({editorState: state})
    })

    if(res.ok) {
      console.log("it is ok");
    }

    setSubmit(false);
  },[state]); 

  const URL_REGEX =
   /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const EMAIL_REGEX =
   /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const MATCHERS = [
   createLinkMatcherWithRegExp(URL_REGEX, (text) => {
      return text;
   }),
   createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => {
      return `mailto:${text}`;
   }),
];


  return (
    isMounted && (
      <LexicalComposer initialConfig={{...editorConfig, editorState: editorState}}>
        <div className="editor-container" style={{margin: '0', marginTop: '1em', maxWidth: 'none'}}>
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="editor-input"
                  aria-placeholder={placeholder}
                  placeholder={
                    <div className="editor-placeholder">{placeholder}</div>
                  }
                />
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <LinkPlugin/>
            <AutoLinkPlugin matchers={MATCHERS}/>
            <ImagesPlugin />
            <OnChangePlugin/>
            <YouTubePlugin />
            <FontSizePlugin />
            <FontColorPlugin />
            <FontBackgroundColorNodePlugin />
            <FontFamilyPlugin />
            {/* <TreeViewPlugin /> */}
          </div>
        </div>
        <Button onClick={createBlog} aria-label="create-recipe-button" disabled={submit} className={`bg-[#ffb762] text-white py-[10px] rounded-md text-[13px] px-[20px] font-bold self-center ${submit ? 'opacity-50' : ''}`} type="submit">   
          {!submit ? (
              '作成する'
          ): (
            <span className="flex justify-center items-center">
              <CircleNotch size={20} className="animate-spin"/> 作成する
            </span>
          )}
        </Button>
        <div dangerouslySetInnerHTML={{__html: htmlString}}></div>
      </LexicalComposer>
    )
  );
})