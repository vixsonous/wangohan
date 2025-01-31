"use client";
import "./style.css";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Button from "@/app/components/Button";

import { CircleNotch, Plus, X } from "@phosphor-icons/react/dist/ssr";
import { FileButton, modalIds, REGICONSIZE } from "@/constants/constants";
import ErrorSpan from "@/app/components/TextComponents/ErrorSpan";
import Modal from "@/app/components/ElementComponents/Modal";
import Dropdown from "@/app/admin/components/Dropdown";
import GeneralButton from "@/app/components/ElementComponents/GeneralButton";
import useDisplayMessage from "../hooks/dispatch-hooks";
import useEditorStates from "./editor-states";
import useEditorHelper from "./editor-helper";
import EditorLexicalComposer from "./editor-lexical-composer";
import FetchedImageList from "./fetched-image-list";
import Label from "@/app/components/ElementComponents/Label";

export default memo(function Editor({ userId }: { userId: number }) {
  const customDispatch = useDisplayMessage();
  const helper = useEditorHelper();
  const states = useEditorStates();
  const closeModalOnClick = useCallback(() => customDispatch.hideModal(), []);

  const imageFileRef = useRef<HTMLInputElement>(null);

  const handleUploadFile = (
    imageFileRef: React.RefObject<HTMLInputElement>,
    states: ReturnType<typeof useEditorStates>
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      helper.uploadFile(e, imageFileRef, states);
  };

  useEffect(() => {
    const c = sessionStorage.getItem("editor");
    if (c) {
      states.setEditorState(c);
    }

    states.setIsMounted(true);
  }, []);

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
          <Label htmlFor="blog_title" label="Title:">
            <React.Fragment>
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
            </React.Fragment>
          </Label>
          <div className="flex gap-4">
            <Label htmlFor="blog-category" label="Category:">
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
            </Label>
            <Label htmlFor="blog_image" label="Thumbnail:">
              <React.Fragment>
                <GeneralButton
                  onClick={() => {
                    customDispatch.displayModal(modalIds.editorModal);
                    states.setModalMode("image-upload");
                    states.setImageListPage(0);
                  }}
                >
                  {states.form.filename}
                </GeneralButton>
                <ErrorSpan>{states.formErrors.file}</ErrorSpan>
              </React.Fragment>
            </Label>
          </div>
          <EditorLexicalComposer
            states={states}
            helper={helper}
            userId={userId}
          />
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
                    <X size={REGICONSIZE} />
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
                        <Plus size={REGICONSIZE} />
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
            <FetchedImageList
              states={states}
              helper={helper}
              dispatch={customDispatch}
            />
          )}
        </Modal>
      </React.Fragment>
    )
  );
});
