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
import ImageUploadSelection from "./image-upload-selection";

export default memo(function Editor({ userId }: { userId: number }) {
  const customDispatch = useDisplayMessage();
  const helper = useEditorHelper();
  const states = useEditorStates();
  const closeModalOnClick = useCallback(() => customDispatch.hideModal(), []);

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
            <ImageUploadSelection
              states={states}
              helper={helper}
              dispatch={customDispatch}
            />
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
