"use client";
import "./style.css";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import {
  AutoLinkPlugin,
  createLinkMatcherWithRegExp,
} from "@lexical/react/LexicalAutoLinkPlugin";

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
import { LinkNode, AutoLinkNode } from "@lexical/link";

import ExampleTheme from "./Theme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { parseAllowedColor, parseAllowedFontSize } from "./styleConfig";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Button from "@/app/components/Button";
import ImagesPlugin from "./plugins/ImagePlugin";
import YouTubePlugin from "./plugins/YoutubePlugin";
import { HeadingNode } from "@lexical/rich-text";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { customGenerateHtmlFromNodes } from "@/lib/lib/GenerateHtml";
import { ImageNode } from "@/lib/nodes/ImageNode";
import { YouTubeNode } from "@/lib/nodes/YoutubeNode";
import { IndentationNode } from "@/lib/nodes/IndentationNode";
import { FontFamilyPlugin, FontNode } from "../nodes/FontNode";
import { FontSizeNode, FontSizePlugin } from "../nodes/FontSizeNode";
import { FontColorNode, FontColorPlugin } from "../nodes/FontColorNode";
import {
  FontBackgroundColorNode,
  FontBackgroundColorNodePlugin,
} from "../nodes/FontBackgroundColorNode";
import {
  hideError,
  hideSuccess,
  showError,
  showSuccess,
} from "../redux/states/messageSlice";
import { POPUPTIME } from "@/constants/constants";
import { useAppDispatch } from "../redux/hooks";
import ErrorSpan from "@/app/components/TextComponents/ErrorSpan";

const placeholder = "Enter some rich text...";

const removeStylesExportDOM = (
  editor: LexicalEditor,
  target: LexicalNode
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
      el.removeAttribute("class");
      el.removeAttribute("style");
      if (el.getAttribute("dir") === "ltr") {
        el.removeAttribute("dir");
      }
    }
  }
  return output;
};

const exportDOM = (
  editor: LexicalEditor,
  target: LexicalNode
): DOMExportOutput => {
  const output = target.exportDOM(editor);

  return output;
};

const createYoutubeExportDom = (
  editor: LexicalEditor,
  target: LexicalNode
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
  ],
  onError(error: Error) {
    throw error;
  },
  theme: ExampleTheme,
  autoFocus: false,
};

export default memo(function App({
  content,
  userId,
}: {
  content: string;
  userId: number;
}) {
  const [state, setState] = useState<String>();
  const [htmlString, setHtmlString] = useState<String>("");
  const [isMounted, setIsMounted] = useState(false);
  const [editorState, setEditorState] = useState<string | null>(content);
  const [titleFocus, setTitleFocus] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{
    blog_title: string;
    file: string;
  }>({
    blog_title: "",
    file: "",
  });
  const [form, setForm] = useState<{
    blog_title: string;
    blog_category: string;
    filename: string;
    file: File | string | null;
  }>({
    blog_title: "",
    blog_category: "レシピ特集",
    filename: "No file selected!",
    file: null,
  });
  const [submit, setSubmit] = useState(false);

  const dispatch = useAppDispatch();

  const OnChangePlugin = memo(function OnChangePlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        editor.read(() => {
          const jsonState = editorState.toJSON();
          setState(JSON.stringify(jsonState));
          const html = customGenerateHtmlFromNodes(editor);
          setHtmlString(html);
          sessionStorage.setItem("editor", JSON.stringify(jsonState));
        });
      });
    }, [editor]);
    return null;
  });

  useEffect(() => {
    const c = sessionStorage.getItem("editor");
    if (c) {
      setEditorState(c);
    }

    setIsMounted(true);
  }, []);

  const createBlog = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (form.blog_title.length < 35) {
        setFormErrors((prev) => ({
          ...prev,
          blog_title: "The title must be 35 characters or more!",
        }));
        return;
      }

      if (form.file === null) {
        setFormErrors((prev) => ({ ...prev, file: "Please choose a file!" }));
        return;
      }

      setSubmit(true);
      const res = await fetch("/api/blog", {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          editorState: state,
          blog_image: form.filename,
          blog_category: form.blog_category,
          title: form.blog_title,
        }),
      });

      const parsed = await res.json();
      if (!res.ok) {
        dispatch(showError(parsed.message));
        setTimeout(() => dispatch(hideError()), POPUPTIME);
      }

      dispatch(showSuccess(parsed.message));
      setSubmit(false);
      setTimeout(() => dispatch(hideSuccess()), POPUPTIME);
    },
    [state, form]
  );

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

  const formOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const t = e.currentTarget;
    const name = t.name;

    setForm((prev) => ({ ...prev, [name]: t.value }));
  };

  return (
    isMounted && (
      <section className="mt-6">
        <label htmlFor="blog_title" className="flex flex-col gap-2 mb-4">
          <span className="text-lg">Title: </span>
          <input
            value={form.blog_title}
            type="text"
            className="py-1 px-4 focus:outline-primary-text rounded-md"
            name="blog_title"
            id="blog_title"
            onChange={formOnChange}
            onFocus={() => setTitleFocus(true)}
            onBlur={() => setTitleFocus(false)}
          />
          <ErrorSpan>{formErrors.blog_title}</ErrorSpan>
        </label>
        <div className="flex gap-4">
          <label htmlFor="blog-category" className="mt-4 flex flex-col gap-2">
            <span>Category:</span>
            <select
              value={form.blog_category}
              className="py-2 px-4 rounded-md"
              name="blog_category"
              id="blog_category"
              onChange={formOnChange}
            >
              <option value="レシピ特集">レシピ特集</option>
              <option value="基礎知識">基礎知識</option>
              <option value="その他">その他</option>
            </select>
          </label>
          <label htmlFor="blog_image" className="mt-4 flex flex-col gap-2">
            <span>Thumbnail:</span>
            <div>
              <span>{form.filename}</span>
              <input
                type="file"
                hidden
                name=""
                className="py-2 px-4 rounded-md"
                id="blog_image"
              />
            </div>
            <ErrorSpan>{formErrors.file}</ErrorSpan>
          </label>
        </div>
        <LexicalComposer
          initialConfig={{ ...editorConfig, editorState: editorState }}
        >
          <div
            className="editor-container"
            style={{ margin: "0", marginTop: "1em", maxWidth: "none" }}
          >
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
              {/* <AutoFocusPlugin /> */}
              <LinkPlugin />
              {!titleFocus && <AutoLinkPlugin matchers={MATCHERS} />}
              <ImagesPlugin />
              <OnChangePlugin />
              <YouTubePlugin />
              <FontSizePlugin />
              <FontColorPlugin />
              <FontBackgroundColorNodePlugin />
              <FontFamilyPlugin />
            </div>
          </div>
          <Button
            onClick={createBlog}
            aria-label="create-recipe-button"
            disabled={submit}
            className={`bg-[#ffb762] text-white py-[10px] rounded-md text-[13px] px-[20px] font-bold self-center ${
              submit ? "opacity-50" : ""
            }`}
            type="submit"
          >
            {!submit ? (
              "作成する"
            ) : (
              <span className="flex justify-center items-center">
                <CircleNotch size={20} className="animate-spin" /> 作成する
              </span>
            )}
          </Button>
          <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
        </LexicalComposer>
      </section>
    )
  );
});
