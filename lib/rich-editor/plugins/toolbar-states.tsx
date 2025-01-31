import {
  FontSize,
  LeftAlign,
  ParagraphButton,
  SansSerif,
} from "@/app/components/ElementComponents/MemoizedButtons";
import { ImageMetadata } from "@/constants/interface";
import { useState } from "react";

const useToolbarStates = () => {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubScript] = useState(false);
  const [isSuperscript, setIsSuperScript] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [fontColor, setFontColor] = useState("#523636");
  const [fontBackgroundColor, setFontBackgroundColor] = useState("#FFE9C9");
  const [modalMode, setModalMode] = useState("image-upload");
  const [imageListPage, setImageListPage] = useState(0);
  const [imageList, setImageList] = useState<Array<ImageMetadata>>([]);
  const [imageFetch, setImageFetch] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [fileName, setFileName] = useState("No image uploaded!");
  const [blockType, setBlockType] = useState("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState<string>("");
  const [codeLanguage, setCodeLanguage] = useState("");
  const [isLink, setIsLink] = useState(false);
  // icons
  const [icons, setIcons] = useState({
    justifyOpen: false,
    justify: <LeftAlign />,
    justifyIdx: 0,

    fontFamily: <SansSerif />,
    fontFamilyIdx: 0,

    textType: <ParagraphButton />,
    textTypeIdx: 0,

    fontSize: <FontSize size={"15"} />,
    fontSizeVal: 15,
  });

  return {
    canUndo,
    setCanUndo,
    canRedo,
    setCanRedo,
    isBold,
    setIsBold,
    isItalic,
    setIsItalic,
    isUnderline,
    setIsUnderline,
    isStrikethrough,
    setIsStrikethrough,
    isSubscript,
    setIsSubScript,
    isSuperscript,
    setIsSuperScript,
    isCode,
    setIsCode,
    fontColor,
    setFontColor,
    fontBackgroundColor,
    setFontBackgroundColor,
    modalMode,
    setModalMode,
    imageListPage,
    setImageListPage,
    imageList,
    setImageList,
    imageFetch,
    setImageFetch,
    imageUpload,
    setImageUpload,
    blockType,
    setBlockType,
    selectedElementKey,
    setSelectedElementKey,
    codeLanguage,
    setCodeLanguage,
    isLink,
    setIsLink,
    icons,
    setIcons,
    fileName,
    setFileName,
  };
};

export default useToolbarStates;
