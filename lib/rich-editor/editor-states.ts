import { content } from "@/constants/constants";
import { ImageMetadata } from "@/constants/interface";
import { useState } from "react";

export const useEditorStates = () => {
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

  return {
    state,
    setState,
    htmlString,
    setHtmlString,
    isMounted,
    setIsMounted,
    editorState,
    setEditorState,
    titleFocus,
    setTitleFocus,
    modalMode,
    setModalMode,
    imageListPage,
    setImageListPage,
    fileName,
    setFileName,
    imageUpload,
    setImageUpload,
    imageList,
    setImageList,
    imageFetch,
    setImageFetch,
    formErrors,
    setFormErrors,
    form,
    setForm,
    submit,
    setSubmit,
  };
};

export default useEditorStates;
