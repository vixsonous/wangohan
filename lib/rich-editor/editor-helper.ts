import { useCallback, useMemo } from "react";
import useEditorStates from "./editor-states";
import useDisplayMessage from "../hooks/dispatch-hooks";
import heic2any from "heic2any";
import { content } from "@/constants/constants";
import useToolbarStates from "./plugins/toolbar-states";
import { LexicalEditor } from "lexical";
import { INSERT_IMAGE_COMMAND } from "./plugins/ImagePlugin";

const useEditorHelper = () => {
  const customDispatch = useDisplayMessage();

  const actions = useMemo(
    () => ({
      async createBlog(
        e: React.MouseEvent<HTMLButtonElement>,
        states: ReturnType<typeof useEditorStates>,
        userId: number
      ) {
        e.preventDefault();

        if (states.form.blog_title.length > 40) {
          states.setFormErrors((prev) => ({
            ...prev,
            blog_title: "The title must be less than 40 characters!",
          }));
          return;
        }

        if (states.form.blog_title === "") {
          states.setFormErrors((prev) => ({
            ...prev,
            blog_title: "Please input a title of the blog!",
          }));
          return;
        }

        if (states.form.file === "") {
          states.setFormErrors((prev) => ({
            ...prev,
            file: "Please choose a file!",
          }));
          return;
        }

        states.setSubmit(true);
        const res = await fetch("/api/blog", {
          method: "POST",
          body: JSON.stringify({
            user_id: userId,
            editorState: states.state,
            blog_image: states.form.file,
            blog_category: states.form.blog_category,
            title: states.form.blog_title,
          }),
        });

        const parsed = await res.json();
        if (!res.ok) {
          customDispatch.displayError(parsed.message);
        }

        sessionStorage.removeItem("editor");
        states.setHtmlString("");
        states.setEditorState(content);
        customDispatch.displaySuccess(parsed.message);
        states.setSubmit(false);
      },

      insertImageFromList(
        e: React.MouseEvent<HTMLButtonElement>,
        src: string,
        filename: string,
        states: ReturnType<typeof useEditorStates>
      ) {
        states.setForm((prev) => ({ ...prev, filename: filename, file: src }));
        customDispatch.hideModal();
      },

      async uploadFile(
        e: React.ChangeEvent<HTMLInputElement>,
        imageFileRef: React.RefObject<HTMLInputElement>,
        states: ReturnType<typeof useEditorStates | typeof useToolbarStates>,
        editor?: LexicalEditor | undefined
      ) {
        if (imageFileRef.current) {
          const t = imageFileRef.current;
          if (!t.files || !t.files[0]) return;

          const fileName = t.files[0].name;
          const fileNameExt = fileName.substring(fileName.lastIndexOf(".") + 1);

          const fd = new FormData();

          states.setImageUpload(true);
          states.setFileName(t.files[0].name);

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
          states.setImageUpload(false);

          const body = await res.json();

          if (!res.ok) customDispatch.displayError(body.message);

          customDispatch.hideModal();
          states.setFileName("No image uploaded");

          if ("form" in states) {
            states.setForm((prev) => ({
              ...prev,
              filename: fileName,
              file: body.body.fileUrl,
            }));
          }

          if (!editor) return;
          editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
            altText: fileName,
            src: body.body.fileUrl,
            width: 500,
          });
        }
      },

      async fetchImageUploads(
        e: React.MouseEvent<HTMLButtonElement>,
        states: ReturnType<typeof useEditorStates | typeof useToolbarStates>
      ) {
        states.setModalMode("image-list");
        states.setImageListPage(0);

        states.setImageFetch(true);
        const res = await fetch("/api/blog-images");
        states.setImageFetch(false);

        const parsed = await res.json();

        if (!res.ok) {
          customDispatch.hideModal();
          customDispatch.displayError("Error loading files!");

          return;
        }

        states.setImageList(parsed.body);
      },
    }),
    [customDispatch]
  );

  return actions;
};

export default useEditorHelper;
