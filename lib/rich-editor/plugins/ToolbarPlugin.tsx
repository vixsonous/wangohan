"use client";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  BracketsAngle,
  PaintBucket,
  TextAa,
  TextBolder,
  TextItalic,
  TextUnderline,
} from "@phosphor-icons/react/dist/ssr";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_EDITOR,
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
import { $isHeadingNode } from "@lexical/rich-text";
import { $isListNode, ListNode } from "@lexical/list";
import { $isCodeNode, getDefaultCodeLanguage } from "@lexical/code";
import { $isAtNodeEnd } from "@lexical/selection";
import React, { memo, useCallback, useEffect, useRef } from "react";
import Button from "@/app/components/Button";
import Modal from "@/app/components/ElementComponents/Modal";
import { modalIds } from "@/constants/constants";
import { FORMAT_FONTCOLOR_COMMAND } from "@/lib/nodes/FontColorNode";
import { FORMAT_FONTBACKGROUNDCOLOR_COMMAND } from "@/lib/nodes/FontBackgroundColorNode";
import {
  FontSize,
  H1Button,
  H2Button,
  H3Button,
  Mitimasu,
  ParagraphButton,
  Sans,
  SansSerif,
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
import TextHeading from "./toolbar-groups/text-heading";
import FontFamily from "./toolbar-groups/font-family";

const LowPriority = 1;
const IconSize = 20;

const Divider = memo(function Divider() {
  return <div className="divider" />;
});

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
      <TextHeading states={states} editor={editor} />
      <Divider />
      <FontFamily states={states} editor={editor} />
      <Divider />
      <FontSizeDropdown states={states} editor={editor} />
      <Divider />
      <Button
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
