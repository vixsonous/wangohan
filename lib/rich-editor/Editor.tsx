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

import ToolbarPlugin from "./plugins/ToolbarPlugin";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Button from "@/app/components/Button";
import ImagesPlugin from "./plugins/ImagePlugin";
import YouTubePlugin from "./plugins/YoutubePlugin";

import { CircleNotch, Plus, X } from "@phosphor-icons/react/dist/ssr";
import { customGenerateHtmlFromNodes } from "@/lib/lib/GenerateHtml";

import { FontFamilyPlugin } from "../nodes/FontNode";
import { FontSizePlugin } from "../nodes/FontSizeNode";
import { FontColorPlugin } from "../nodes/FontColorNode";
import { FontBackgroundColorNodePlugin } from "../nodes/FontBackgroundColorNode";
import { EMAIL_REGEX, modalIds, URL_REGEX } from "@/constants/constants";
import ErrorSpan from "@/app/components/TextComponents/ErrorSpan";
import Modal from "@/app/components/ElementComponents/Modal";
import Dropdown from "@/app/admin/components/Dropdown";
import OptImage from "@/app/components/ElementComponents/Image";
import GeneralButton from "@/app/components/ElementComponents/GeneralButton";
import CenteredLoading from "@/app/components/ElementComponents/CenteredLoading";
import useDisplayMessage from "../hooks/dispatch-hooks";
import useEditorStates from "./editor-states";
import useEditorHelper from "./editor-helper";
import { editorConfig } from "./editor-config";

const placeholder = "Enter some rich text...";
const IconSize = 20;

const FileButton = memo(() => (
  <Button
    className={`w-[100%] bg-[#ffb762] border-[1px] border-primary-text text-primary-text px-32 py-2 rounded-md text-sm font-semibold`}
  >
    <span>File</span>
  </Button>
));

export default memo(function Editor({ userId }: { userId: number }) {
  const customDispatch = useDisplayMessage();
  const helper = useEditorHelper();
  const states = useEditorStates();
  const closeModalOnClick = useCallback(() => customDispatch.hideModal(), []);

  const imageFileRef = useRef<HTMLInputElement>(null);

  const OnChangePlugin = memo(function OnChangePlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        editor.read(() => {
          const jsonState = editorState.toJSON();
          states.setState(JSON.stringify(jsonState));
          const html = customGenerateHtmlFromNodes(editor);
          states.setHtmlString(html);
          sessionStorage.setItem("editor", JSON.stringify(jsonState));
        });
      });
    }, [editor]);
    return null;
  });

  const handleUploadFile = (
    imageFileRef: React.RefObject<HTMLInputElement>,
    states: ReturnType<typeof useEditorStates>
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      helper.uploadFile(e, imageFileRef, states);
  };

  const handleInsertImageFromList = (
    src: string,
    filename: string,
    states: ReturnType<typeof useEditorStates>
  ) => {
    return (e: React.MouseEvent<HTMLButtonElement>) =>
      helper.insertImageFromList(e, src, filename, states);
  };

  useEffect(() => {
    const c = sessionStorage.getItem("editor");
    if (c) {
      states.setEditorState(c);
    }

    states.setIsMounted(true);
  }, []);

  const handleCreateBlog = (
    states: ReturnType<typeof useEditorStates>,
    userId: number
  ) => {
    return (e: React.MouseEvent<HTMLButtonElement>) =>
      helper.createBlog(e, states, userId);
  };

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

    states.setForm((prev) => ({ ...prev, [name]: t.value }));
  };

  const handleFetchImageUploads = (
    states: ReturnType<typeof useEditorStates>
  ) => {
    return (e: React.MouseEvent<HTMLButtonElement>) =>
      helper.fetchImageUploads(e, states);
  };

  return (
    states.isMounted && (
      <React.Fragment>
        <section className="mt-6">
          <label htmlFor="blog_title" className="flex flex-col gap-2">
            <span className="text-lg font-bold">Title: </span>
            <input
              value={states.form.blog_title}
              type="text"
              className="py-1 px-4 focus:outline-primary-text rounded-md"
              name="blog_title"
              id="blog_title"
              onChange={formOnChange}
              onFocus={() => states.setTitleFocus(true)}
              onBlur={() => states.setTitleFocus(false)}
            />
            <ErrorSpan>{states.formErrors.blog_title}</ErrorSpan>
          </label>
          <div className="flex gap-4">
            <label htmlFor="blog-category" className="mt-4 flex flex-col gap-2">
              <span className="text-lg font-bold">Category:</span>
              <select
                value={states.form.blog_category}
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
              <span className="text-lg font-bold">Thumbnail:</span>
              <div>
                <GeneralButton
                  onClick={() => {
                    customDispatch.displayModal(modalIds.editorModal);
                    states.setModalMode("image-upload");
                    states.setImageListPage(0);
                  }}
                >
                  {states.form.filename}
                </GeneralButton>
              </div>
              <ErrorSpan>{states.formErrors.file}</ErrorSpan>
            </label>
          </div>
          <LexicalComposer
            initialConfig={{ ...editorConfig, editorState: states.editorState }}
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
                {!states.titleFocus && <AutoLinkPlugin matchers={MATCHERS} />}
                <ImagesPlugin />
                <OnChangePlugin />
                <YouTubePlugin />
                <FontSizePlugin />
                <FontColorPlugin />
                <FontBackgroundColorNodePlugin />
                <FontFamilyPlugin />
              </div>
            </div>
            <div className="w-full flex justify-center items-center mt-8">
              <GeneralButton
                onClick={handleCreateBlog(states, userId)}
                aria-label="create-recipe-button"
                disabled={states.submit}
                type="submit"
              >
                {!states.submit ? (
                  "作成する"
                ) : (
                  <span className="flex justify-center items-center">
                    <CircleNotch size={20} className="animate-spin" /> 作成する
                  </span>
                )}
              </GeneralButton>
            </div>
            <div
              className="mt-8"
              dangerouslySetInnerHTML={{ __html: states.htmlString }}
            ></div>
          </LexicalComposer>
        </section>
        <Modal modalIdProps={modalIds.editorModal}>
          {states.modalMode === "image-upload" ? (
            <div className="relative justify-center items-center flex px-4">
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
                  onClick={handleFetchImageUploads(states)}
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
                          disabled={states.imageUpload}
                          onChange={handleUploadFile(imageFileRef, states)}
                          ref={imageFileRef}
                          type="file"
                          hidden
                          name="file"
                          id="file"
                        />
                        <span
                          className={`w-[100%] cursor-pointer bg-[#ffb762] border-[1px] border-primary-text text-primary-text px-4 py-2 rounded-md text-sm font-semibold`}
                        >
                          {states.fileName}
                        </span>
                      </label>
                    </Button>

                    <Button disabled className="p-2 relative group">
                      {!states.imageUpload ? (
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
            <div className="relative top-0 left-0 justify-center items-center flex w-full h-full">
              <div className="bg-primary-bg p-4 max-w-screen-lg w-full flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Uploaded Images</span>
                  <Button
                    className="group relative p-2"
                    onClick={closeModalOnClick}
                  >
                    <X size={IconSize} />
                    <div className="absolute w-full h-full bg-black top-0 left-0 opacity-0 group-hover:opacity-20 transition-all rounded-full"></div>
                  </Button>
                </div>
                <hr className="border-b-[1px] border-black w-full" />
                <div
                  className={`${
                    !states.imageFetch && "overflow-y-scroll"
                  } max-h-96 min-w-96`}
                >
                  {states.imageFetch ? (
                    <CenteredLoading size={IconSize} />
                  ) : (
                    <div>
                      {states.imageList.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                          {states.imageList.map((i, idx) => {
                            return (
                              <Button
                                onClick={handleInsertImageFromList(
                                  i.blog_image_url,
                                  i.blog_image_title,
                                  states
                                )}
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
