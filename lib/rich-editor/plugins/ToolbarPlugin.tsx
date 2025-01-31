"use client";
import Dropdown from "@/app/admin/components/Dropdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  BracketsAngle,
  CaretDown,
  CircleNotch,
  Image,
  PaintBrush,
  PaintBucket,
  Paragraph,
  Plus,
  TextAa,
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
  TextBolder,
  TextHOne,
  TextHThree,
  TextHTwo,
  TextIndent,
  TextItalic,
  TextOutdent,
  TextStrikethrough,
  TextSubscript,
  TextSuperscript,
  TextUnderline,
  X,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_EDITOR,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  KEY_TAB_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  RangeSelection,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { $isLinkNode } from "@lexical/link";
import {
  $createHeadingNode,
  $isHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { $isListNode, ListNode } from "@lexical/list";
import { $isCodeNode, getDefaultCodeLanguage } from "@lexical/code";
import { $wrapNodes, $isAtNodeEnd } from "@lexical/selection";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Button from "@/app/components/Button";
import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";
import { useDispatch } from "react-redux";
import {
  hideError,
  hideModal,
  showError,
  showModal,
} from "@/lib/redux/states/messageSlice";
import Modal from "@/app/components/ElementComponents/Modal";
import {
  FileButton,
  imageFileTypes,
  modalIds,
  POPUPTIME,
} from "@/constants/constants";
import { INSERT_YOUTUBE_COMMAND } from "./YoutubePlugin";
import { FORMAT_FONTFAMILY_COMMAND } from "@/lib/nodes/FontNode";
import { FORMAT_FONTSIZE_COMMAND } from "@/lib/nodes/FontSizeNode";
import { FORMAT_FONTCOLOR_COMMAND } from "@/lib/nodes/FontColorNode";
import { FORMAT_FONTBACKGROUNDCOLOR_COMMAND } from "@/lib/nodes/FontBackgroundColorNode";
import LoadingCircle from "@/app/components/IconComponents/LoadingCircle";
import OptImage from "@/app/components/ElementComponents/Image";
import heic2any from "heic2any";
import CenteredLoading from "@/app/components/ElementComponents/CenteredLoading";
import {
  ButtonIcon,
  ButtonText,
  CenterAlign,
  FontSize,
  H1Button,
  H2Button,
  H3Button,
  JustifyAlign,
  LeftAlign,
  Mitimasu,
  ParagraphButton,
  RightAlign,
  Sans,
  SansSerif,
  UrlButton,
} from "@/app/components/ElementComponents/MemoizedButtons";
import useToolbarStates from "./toolbar-states";
import useEditorHelper from "../editor-helper";
import useDisplayMessage from "@/lib/hooks/dispatch-hooks";
import FetchedImageList from "../fetched-image-list";
import ImageUploadSelection from "../image-upload-selection";
import JustifyGroup from "./toolbar-groups/justify-group";
import ImageYoutube from "./toolbar-groups/image-youtube";
import TextMod from "./toolbar-groups/text-mod";
import FontSizeDropdown from "./toolbar-groups/font-size";

const LowPriority = 1;
const IconSize = 20;

const Divider = memo(function Divider() {
  return <div className="divider" />;
});

type ImageMetadata = {
  blog_image_title: string;
  blog_image_url: string;
};

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const states = useToolbarStates();
  const editorHelper = useEditorHelper();
  const dispatch = useDisplayMessage();

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      states.setIsBold(selection.hasFormat("bold"));
      states.setIsItalic(selection.hasFormat("italic"));
      states.setIsUnderline(selection.hasFormat("underline"));
      states.setIsStrikethrough(selection.hasFormat("strikethrough"));
      states.setIsSubScript(selection.hasFormat("subscript"));
      states.setIsSuperScript(selection.hasFormat("superscript"));
      states.setIsCode(selection.hasFormat("code"));

      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        states.setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          states.setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          states.setBlockType(type);
          const computedStyle = window.getComputedStyle(elementDOM);
          const fontSize = computedStyle.fontSize;

          states.setFontColor(
            selection.style.includes("color:")
              ? selection.style.split("color: ")[1].split(";")[0] || "#523636"
              : "#523636"
          );
          states.setFontBackgroundColor(
            selection.style.includes("background:")
              ? selection.style.split("background: ")[1].split(";")[0] ||
                  "#FFE9C9"
              : "#FFE9C9"
          );
          states.setIcons((prev) => ({
            ...prev,
            textType:
              type === "paragraph" ? (
                <ParagraphButton />
              ) : type === "h1" ? (
                <H1Button />
              ) : type === "h2" ? (
                <H2Button />
              ) : type === "h3" ? (
                <H3Button />
              ) : (
                <ParagraphButton />
              ),
            textTypeIdx:
              type === "paragraph"
                ? 0
                : type === "h1"
                ? 1
                : type === "h2"
                ? 2
                : type === "h3"
                ? 3
                : 0,
            fontFamily: selection.style.includes("sans-serif") ? (
              <SansSerif />
            ) : selection.style.includes("mitimasu") ? (
              <Mitimasu />
            ) : (
              <Sans />
            ),
            fontFamilyIdx: selection.style.includes("sans-serif")
              ? 0
              : selection.style.includes("mitimasu")
              ? 2
              : 1,
            fontSize: (
              <FontSize
                size={
                  selection.style.includes("font-size:")
                    ? selection.style.split("font-size: ")[1].replace("px;", "")
                    : fontSize.replace("px", "")
                }
              />
            ),
            fontSizeVal: selection.style.includes("font-size:")
              ? Number(
                  selection.style.split("font-size: ")[1].replace("px;", "")
                )
              : Number(String(fontSize).replace("px;", "")),
          }));
          if ($isCodeNode(element)) {
            states.setCodeLanguage(
              element.getLanguage() || getDefaultCodeLanguage()
            );
          }
        }
      }
      // Update text format
      states.setIsBold(selection.hasFormat("bold"));
      states.setIsItalic(selection.hasFormat("italic"));
      states.setIsUnderline(selection.hasFormat("underline"));
      states.setIsStrikethrough(selection.hasFormat("strikethrough"));
      states.setIsCode(selection.hasFormat("code"));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        states.setIsLink(true);
      } else {
        states.setIsLink(false);
      }
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          states.setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          states.setCanRedo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        KEY_TAB_COMMAND,
        (payload) => {
          const event: KeyboardEvent = payload;
          event.preventDefault();
          return editor.dispatchCommand(
            event.shiftKey ? OUTDENT_CONTENT_COMMAND : INDENT_CONTENT_COMMAND,
            undefined
          );
        },
        COMMAND_PRIORITY_EDITOR
      )
    );
  }, [editor, $updateToolbar]);

  const urlRef = useRef<HTMLInputElement>(null);
  const imageAltRef = useRef<HTMLInputElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);

  const closeModalOnClick = useCallback(() => dispatch.hideModal(), []);
  const uploadFileUrl = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const t = e.currentTarget;

      if (urlRef.current && imageAltRef.current) {
        const val = urlRef.current.value;
        const alt = imageAltRef.current.value;

        editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
          altText: alt,
          src: val,
        });
        dispatch.hideModal();
      }
    },
    []
  );

  const uploadFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
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

        if (!res.ok) {
          showError(body.message);
          setTimeout(() => hideError(), 5000);
        }

        editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
          altText: t.files[0].name,
          src: body.body.fileUrl,
          width: 500,
        });

        dispatch.hideModal();
        states.setFileName("No image uploaded");
      }
    },
    []
  );

  const insertImageFromList = (e: React.MouseEvent<HTMLButtonElement>) => {
    const t = e.currentTarget;

    const src = t.id;
    const name = t.name;

    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      altText: name,
      src: src,
      width: 500,
    });

    hideModal();
  };

  const formatHeading = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nameDetail = e.currentTarget.name;
    const idx = nameDetail.split("-")[1];
    const name = nameDetail.split("-")[0];
    states.setIcons((prev) => ({ ...prev, textTypeIdx: Number(idx) }));

    if (states.blockType !== "paragraph" || states.blockType !== name) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            $wrapNodes(selection, () =>
              $createHeadingNode(name as HeadingTagType)
            );
            states.setBlockType(name);
          }
        }
      });
    } else {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            $wrapNodes(selection, () => $createParagraphNode());
            states.setBlockType("paragraph");
          }
        }
      });
    }
  };

  function getSelectedNode(selection: RangeSelection) {
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();
    if (anchorNode === focusNode) {
      return anchorNode;
    }
    const isBackward = selection.isBackward();
    if (isBackward) {
      return $isAtNodeEnd(focus) ? anchorNode : focusNode;
    } else {
      return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
    }
  }

  const fontColorOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = e.currentTarget;
    editor.dispatchCommand(FORMAT_FONTCOLOR_COMMAND, String(t.value));
    states.setFontColor(t.value);
  };

  const fontBackgroundColorOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const t = e.currentTarget;
    editor.dispatchCommand(FORMAT_FONTBACKGROUNDCOLOR_COMMAND, String(t.value));
    states.setFontBackgroundColor(t.value);
  };

  const resetFontBackgroundColor = (e: React.MouseEvent<HTMLButtonElement>) => {
    editor.dispatchCommand(FORMAT_FONTBACKGROUNDCOLOR_COMMAND, String(""));
    states.setFontBackgroundColor("#FFE9C9");
  };

  const resetFontColor = (e: React.MouseEvent<HTMLButtonElement>) => {
    editor.dispatchCommand(FORMAT_FONTCOLOR_COMMAND, String("#523636"));
    states.setFontBackgroundColor("#523636");
  };

  return (
    <div className="toolbar flex flex-wrap" ref={toolbarRef}>
      <Button
        disabled={!states.canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <ArrowClockwise size={IconSize} />
      </Button>
      <Button
        disabled={!states.canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo"
      >
        <ArrowCounterClockwise size={IconSize} />
      </Button>
      <Divider />
      <Dropdown
        openIcon={states.icons.textType}
        closeIcon={states.icons.textType}
      >
        <ul className=" flex flex-col gap-2 bg-secondary-bg items-center rounded-md border border-primary-text">
          <li
            className={`flex items-center justify-between w-full px-2 ${
              states.icons.textTypeIdx === 0 ? "bg-primary-bg" : ""
            } rounded-t-md`}
          >
            <Button
              onClick={formatHeading}
              name="paragraph-0"
              className="toolbar-item spaced flex gap-4"
              aria-label="Image Insert"
            >
              <Paragraph size={IconSize} />
              <ButtonText>Paragraph</ButtonText>
            </Button>
          </li>
          <li
            className={`flex items-center justify-between w-full px-2 ${
              states.icons.textTypeIdx === 1 ? "bg-primary-bg" : ""
            } rounded-t-md`}
          >
            <Button
              onClick={formatHeading}
              name="h1-1"
              className="toolbar-item spaced flex gap-4"
              aria-label="Image Insert"
            >
              <TextHOne size={IconSize} />
              <ButtonText>H1 Heading</ButtonText>
            </Button>
          </li>
          <li
            className={`flex items-center justify-between w-full px-2 ${
              states.icons.textTypeIdx === 2 ? "bg-primary-bg" : ""
            } rounded-t-md`}
          >
            <Button
              onClick={formatHeading}
              name="h2-2"
              className="toolbar-item spaced flex gap-4"
              aria-label="Image Insert"
            >
              <TextHTwo size={IconSize} />
              <ButtonText>H2 Heading</ButtonText>
            </Button>
          </li>
          <li
            className={`flex items-center justify-between w-full px-2 ${
              states.icons.textTypeIdx === 3 ? "bg-primary-bg" : ""
            } rounded-t-md`}
          >
            <Button
              onClick={formatHeading}
              name="h3-3"
              className="toolbar-item spaced flex gap-4"
              aria-label="Image Insert"
            >
              <TextHThree size={IconSize} />
              <ButtonText>H3 Heading</ButtonText>
            </Button>
          </li>
          <li
            className={`flex items-center justify-between w-full px-2 ${
              states.icons.justifyIdx === 2 ? "bg-primary-bg" : ""
            }`}
          >
            <Button
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
                states.setIcons((prev) => ({
                  ...prev,
                  justify: <RightAlign />,
                  justifyIdx: 2,
                }));
              }}
              className="toolbar-item spaced flex gap-4"
              aria-label="Right Align"
            >
              <TextAlignRight size={IconSize} />
              <ButtonText>Right Align</ButtonText>
            </Button>
          </li>
          <li
            className={`flex items-center justify-between w-full px-2 ${
              states.icons.justifyIdx === 3 ? "bg-primary-bg" : ""
            } rounded-b-md`}
          >
            <Button
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
                states.setIcons((prev) => ({
                  ...prev,
                  justify: <JustifyAlign />,
                  justifyIdx: 3,
                }));
              }}
              className="toolbar-item flex gap-4"
              aria-label="Justify Align"
            >
              <TextAlignJustify size={IconSize} />
              <ButtonText>Justify Align</ButtonText>
            </Button>
          </li>
        </ul>
      </Dropdown>
      <Divider />
      <Dropdown
        openIcon={states.icons.fontFamily}
        closeIcon={states.icons.fontFamily}
      >
        <ul className=" flex flex-col gap-2 bg-secondary-bg items-center rounded-md border border-primary-text">
          <li
            className={`flex items-center justify-between w-full px-2 ${
              states.icons.fontFamilyIdx === 0 ? "bg-primary-bg" : ""
            } rounded-t-md`}
          >
            <Button
              onClick={() => {
                editor.dispatchCommand(FORMAT_FONTFAMILY_COMMAND, "sans-serif");
                states.setIcons((prev) => ({
                  ...prev,
                  fontFamily: <SansSerif />,
                  fontFamilyIdx: 0,
                }));
              }}
              name="paragraph"
              className="toolbar-item spaced flex gap-4"
              aria-label="Image Insert"
            >
              <ButtonText>Sans Serif</ButtonText>
            </Button>
          </li>
          <li
            className={`flex items-center justify-between w-full px-2 ${
              states.icons.fontFamilyIdx === 1 ? "bg-primary-bg" : ""
            } rounded-t-md`}
          >
            <Button
              onClick={() => {
                editor.dispatchCommand(FORMAT_FONTFAMILY_COMMAND, "sans");
                states.setIcons((prev) => ({
                  ...prev,
                  fontFamily: <Sans />,
                  fontFamilyIdx: 1,
                }));
              }}
              name="paragraph"
              className="toolbar-item spaced flex gap-4"
              aria-label="Image Insert"
            >
              <ButtonText>Sans</ButtonText>
            </Button>
          </li>
          <li
            className={`flex items-center justify-between w-full px-2 ${
              states.icons.fontFamilyIdx === 2 ? "bg-primary-bg" : ""
            } rounded-t-md`}
          >
            <Button
              onClick={() => {
                editor.dispatchCommand(FORMAT_FONTFAMILY_COMMAND, "mitimasu");
                states.setIcons((prev) => ({
                  ...prev,
                  fontFamily: <Mitimasu />,
                  fontFamilyIdx: 2,
                }));
              }}
              name="paragraph"
              className="toolbar-item spaced flex gap-4"
              aria-label="Image Insert"
            >
              <ButtonText>Mitimasu</ButtonText>
            </Button>
          </li>
        </ul>
      </Dropdown>
      <Divider />
      {/* font size */}
      <FontSizeDropdown states={states} editor={editor} />
      <Divider />
      <Button
        // onClick={() => alert(5)}
        className={
          "toolbar-item spaced cursor-pointer " +
          (states.isBold ? "active" : "")
        }
        aria-label="Format Bold"
      >
        <label
          htmlFor="text-color"
          className="flex gap-1 items-center cursor-pointer"
        >
          <TextAa size={IconSize} className="cursor-pointer" />
          <input
            onChange={fontColorOnChange}
            type="color"
            id="text-color"
            value={states.fontColor}
            className="bg-none p-0 cursor-pointer w-2"
          />
        </label>
      </Button>
      <Button
        className={
          "toolbar-item flex justify-center items-center spaced cursor-pointer " +
          (states.isBold ? "active" : "")
        }
        aria-label="Format Bold"
        onClick={resetFontColor}
      >
        <ArrowClockwise size={IconSize - 4} />
      </Button>
      <Divider />
      <Button
        className={
          "toolbar-item spaced cursor-pointer " +
          (states.isBold ? "active" : "")
        }
        aria-label="Format Bold"
      >
        <label
          htmlFor="text-background-color"
          className="flex gap-1 items-center cursor-pointer"
        >
          <PaintBucket size={IconSize} className="cursor-pointer" />
          <input
            onChange={fontBackgroundColorOnChange}
            type="color"
            id="text-background-color"
            value={states.fontBackgroundColor}
            className="bg-none p-0 cursor-pointer w-2"
          />
        </label>
      </Button>
      <Button
        className={
          "toolbar-item flex justify-center items-center spaced cursor-pointer " +
          (states.isBold ? "active" : "")
        }
        aria-label="Format Bold"
        onClick={resetFontBackgroundColor}
      >
        <ArrowClockwise size={IconSize - 4} />
      </Button>
      <Divider />
      <Button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"toolbar-item spaced " + (states.isBold ? "active" : "")}
        aria-label="Format Bold"
      >
        <TextBolder size={IconSize} />
      </Button>
      <Button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={"toolbar-item spaced " + (states.isItalic ? "active" : "")}
        aria-label="Format Italics"
      >
        <TextItalic size={IconSize} />
      </Button>
      <Button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={
          "toolbar-item spaced " + (states.isUnderline ? "active" : "")
        }
        aria-label="Format Underline"
      >
        <TextUnderline size={IconSize} />
      </Button>
      <Button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
        }}
        className={
          "toolbar-item spaced " + (states.isUnderline ? "active" : "")
        }
        aria-label="Format Code"
      >
        <BracketsAngle size={IconSize} />
      </Button>
      <TextMod states={states} editor={editor} />
      <Divider />
      <ImageYoutube states={states} dispatch={dispatch} editor={editor} />
      <Divider />
      <JustifyGroup states={states} editor={editor} />
      <Modal modalIdProps={modalIds.toolbarpluginModal}>
        {states.modalMode === "image-upload" ? (
          <ImageUploadSelection
            states={states}
            dispatch={dispatch}
            helper={editorHelper}
            editor={editor}
          />
        ) : (
          <FetchedImageList
            states={states}
            dispatch={dispatch}
            helper={editorHelper}
            editor={editor}
          />
        )}
      </Modal>
    </div>
  );
}
