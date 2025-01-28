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
import { CircleNotch, Plus, X } from "@phosphor-icons/react/dist/ssr";
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
  hideModal,
  hideSuccess,
  showError,
  showModal,
  showSuccess,
} from "../redux/states/messageSlice";
import { modalIds, POPUPTIME } from "@/constants/constants";
import { useAppDispatch } from "../redux/hooks";
import ErrorSpan from "@/app/components/TextComponents/ErrorSpan";
import Modal from "@/app/components/ElementComponents/Modal";
import Dropdown from "@/app/admin/components/Dropdown";
import heic2any from "heic2any";
import OptImage from "@/app/components/ElementComponents/Image";
import GeneralButton from "@/app/components/ElementComponents/GeneralButton";

const placeholder = "Enter some rich text...";
const IconSize = 20;

const FileButton = memo(() => (
  <Button
    className={`w-[100%] bg-[#ffb762] border-[1px] border-primary-text text-primary-text px-32 py-2 rounded-md text-sm font-semibold`}
  >
    <span>File</span>
  </Button>
));

type ImageMetadata = {
  blog_image_title: string;
  blog_image_url: string;
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
  const [modalMode, setModalMode] = useState("image-upload");
  const [imageListPage, setImageListPage] = useState(0);
  const [fileName, setFileName] = useState("No image uploaded!");
  const [imageUpload, setImageUpload] = useState(false);
  const [imageList, setImageList] = useState<Array<ImageMetadata>>([]);
  const [imageFetch, setImageFetch] = useState(false);
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
    file: string;
  }>({
    blog_title: "",
    blog_category: "レシピ特集",
    filename: "No file selected!",
    file: "",
  });
  const [submit, setSubmit] = useState(false);

  const dispatch = useAppDispatch();
  const closeModalOnClick = useCallback(() => dispatch(hideModal()), []);

  const imageFileRef = useRef<HTMLInputElement>(null);

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

  const uploadFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (imageFileRef.current) {
        const t = imageFileRef.current;
        if (!t.files || !t.files[0]) return;

        const fileName = t.files[0].name;
        const fileNameExt = fileName.substring(fileName.lastIndexOf(".") + 1);

        const fd = new FormData();

        setImageUpload(true);
        setFileName(t.files[0].name);

        if (
          typeof window !== "undefined" &&
          (fileNameExt.toLowerCase() === "heic" ||
            fileNameExt.toLowerCase() === "heif")
        ) {
          const image = await heic2any({
            blob: t.files[0],
            toType: "image/webp",
            quality: 0.8,
          });

          const img = !Array.isArray(image) ? [image] : image;
          const f = new File(img, fileName);

          fd.append("file", f);
        } else {
          fd.append("file", t.files[0]);
        }

        const res = await fetch("/api/blog-images", {
          method: "POST",
          body: fd,
        });
        setImageUpload(false);

        const body = await res.json();

        if (!res.ok) {
          showError(body.message);
          setTimeout(() => hideError(), 5000);
        }

        dispatch(hideModal());
        setFileName("No image uploaded");
      }
    },
    []
  );

  const insertImageFromList = (e: React.MouseEvent<HTMLButtonElement>) => {
    const t = e.currentTarget;

    const src = t.id;
    const name = t.name;

    setForm((prev) => ({ ...prev, filename: name, file: src }));

    dispatch(hideModal());
  };

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

      if (form.blog_title.length > 40) {
        setFormErrors((prev) => ({
          ...prev,
          blog_title: "The title must be less than 40 characters!",
        }));
        return;
      }

      if (form.blog_title === "") {
        setFormErrors((prev) => ({
          ...prev,
          blog_title: "Please input a title of the blog!",
        }));
        return;
      }

      if (form.file === "") {
        setFormErrors((prev) => ({ ...prev, file: "Please choose a file!" }));
        return;
      }

      setSubmit(true);
      const res = await fetch("/api/blog", {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          editorState: state,
          blog_image: form.file,
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
      <React.Fragment>
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
                <GeneralButton
                  onClick={() => {
                    dispatch(showModal(modalIds.editorModal));
                    setModalMode("image-upload");
                    setImageListPage(0);
                  }}
                >
                  {form.filename}
                </GeneralButton>
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
            <GeneralButton
              onClick={createBlog}
              aria-label="create-recipe-button"
              disabled={submit}
              type="submit"
            >
              {!submit ? (
                "作成する"
              ) : (
                <span className="flex justify-center items-center">
                  <CircleNotch size={20} className="animate-spin" /> 作成する
                </span>
              )}
            </GeneralButton>
            <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
          </LexicalComposer>
        </section>
        <Modal modalIdProps={modalIds.editorModal}>
          {modalMode === "image-upload" ? (
            <div className="absolute justify-center items-center flex px-4">
              <div className="max-w-screen-lg w-full bg-primary-bg p-4 flex flex-col gap-2 ">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Insert Image</span>
                  <Button
                    className="group relative p-2"
                    onClick={closeModalOnClick}
                  >
                    <X size={IconSize} />
                    <div className="absolute w-full h-full bg-black top-0 left-0 opacity-0 group-hover:opacity-[0.2] transition-all rounded-full"></div>
                  </Button>
                </div>
                <hr className="border-b-[1px] border-black w-full" />
                <Button
                  onClick={async () => {
                    setModalMode("image-list");
                    setImageListPage(0);

                    setImageFetch(true);
                    const res = await fetch("/api/blog-images");
                    setImageFetch(false);

                    const parsed = await res.json();

                    if (!res.ok) {
                      dispatch(hideModal());
                      showError("Error loading files!");
                      setTimeout(() => dispatch(hideError()), POPUPTIME);
                      return;
                    }

                    setImageList(parsed.body);
                  }}
                  className={`w-[100%] bg-[#ffb762] border-[1px] border-primary-text text-primary-text py-2 rounded-md text-sm font-semibold`}
                >
                  <span>Uploaded Images</span>
                </Button>
                <Dropdown
                  className="w-full"
                  closeOnClick={false}
                  openIcon={<FileButton />}
                  closeIcon={<FileButton />}
                >
                  <div className="p-2 flex gap-2 items-center">
                    <Button aria-label="file" name="file">
                      <label htmlFor="file">
                        <input
                          disabled={imageUpload}
                          onChange={uploadFile}
                          ref={imageFileRef}
                          type="file"
                          hidden
                          name="file"
                          id="file"
                        />
                        <span
                          className={`w-[100%] cursor-pointer bg-[#ffb762] border-[1px] border-primary-text text-primary-text px-4 py-2 rounded-md text-sm font-semibold`}
                        >
                          {fileName}
                        </span>
                      </label>
                    </Button>

                    <Button disabled className="p-2 relative group">
                      {!imageUpload ? (
                        <Plus size={IconSize} />
                      ) : (
                        <CircleNotch className="animate-spin" />
                      )}
                      <div className="w-full h-full bg-black absolute top-0 left-0 rounded-full opacity-0 group-hover:opacity-[0.2] transition-all"></div>
                    </Button>
                  </div>
                </Dropdown>
              </div>
            </div>
          ) : (
            <div className="fixed top-0 left-0 justify-center items-center flex w-full h-full">
              <div className="bg-primary-bg p-4 max-w-screen-lg w-full flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Uploaded Images</span>
                  <Button
                    className="group relative p-2"
                    onClick={closeModalOnClick}
                  >
                    <X size={IconSize} />
                    <div className="absolute w-full h-full bg-black top-0 left-0 opacity-0 group-hover:opacity-[0.2] transition-all rounded-full"></div>
                  </Button>
                </div>
                <hr className="border-b-[1px] border-black w-full" />
                <div className="overflow-y-scroll max-h-96">
                  {imageFetch ? (
                    <div className="w-full mx-auto">
                      <CircleNotch className="animate-spin" />
                    </div>
                  ) : (
                    <div>
                      {imageList.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                          {imageList.map((i, idx) => {
                            return (
                              <Button
                                onClick={insertImageFromList}
                                name={i.blog_image_title}
                                id={i.blog_image_url}
                                key={idx}
                                className=""
                              >
                                <OptImage
                                  className="w-full"
                                  fit="cover"
                                  width={250}
                                  height={250}
                                  centered
                                  resize
                                  square
                                  src={i.blog_image_url}
                                />
                              </Button>
                            );
                          })}
                        </div>
                      ) : (
                        <span>Empty Files</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </React.Fragment>
    )
  );
});
