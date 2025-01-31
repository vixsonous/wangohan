import Dropdown from "@/app/admin/components/Dropdown";
import useToolbarStates from "../toolbar-states";
import Button from "@/app/components/Button";
import {
  ButtonText,
  CenterAlign,
  JustifyAlign,
  LeftAlign,
  RightAlign,
} from "@/app/components/ElementComponents/MemoizedButtons";
import { REGICONSIZE } from "@/constants/constants";
import {
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
  TextIndent,
  TextOutdent,
} from "@phosphor-icons/react/dist/ssr";
import useJustifyGroupHelper from "./justify-group-helper";
import {
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  INDENT_CONTENT_COMMAND,
  LexicalCommand,
  LexicalEditor,
  OUTDENT_CONTENT_COMMAND,
} from "lexical";
import React from "react";

const ElementFormatTypeObject = {
  LEFT: "left" as ElementFormatType,
  RIGHT: "right" as ElementFormatType,
  CENTER: "center" as ElementFormatType,
  JUSTIFY: "justify" as ElementFormatType,
  START: "start" as ElementFormatType,
  END: "end" as ElementFormatType,
};

const JustifyGroup = ({
  states,
  editor,
}: {
  states: ReturnType<typeof useToolbarStates>;
  editor: LexicalEditor;
}) => {
  const jgHelper = useJustifyGroupHelper(editor, states);

  const handleDispatchCommand =
    (
      command: LexicalCommand<ElementFormatType>,
      payload: ElementFormatType,
      icon: React.JSX.Element,
      justifyIdx: number
    ) =>
    (e: React.MouseEvent<HTMLButtonElement>) =>
      jgHelper.handleJustifyClick(command, payload, icon, justifyIdx);

  return (
    <Dropdown openIcon={states.icons.justify} closeIcon={states.icons.justify}>
      <ul className=" flex flex-col gap-2 bg-secondary-bg items-center rounded-md border border-primary-text">
        <li
          className={`flex items-center justify-between w-full px-2 ${
            states.icons.justifyIdx === 0 ? "bg-primary-bg" : ""
          } rounded-t-md`}
        >
          <Button
            onClick={handleDispatchCommand(
              FORMAT_ELEMENT_COMMAND,
              ElementFormatTypeObject.LEFT,
              <LeftAlign />,
              0
            )}
            className="toolbar-item spaced flex gap-4"
            aria-label="Left Align"
          >
            <TextAlignLeft size={REGICONSIZE} />
            <ButtonText>Left Align</ButtonText>
          </Button>
        </li>
        <li
          className={`flex items-center justify-between w-full px-2 ${
            states.icons.justifyIdx === 1 ? "bg-primary-bg" : ""
          }`}
        >
          <Button
            onClick={handleDispatchCommand(
              FORMAT_ELEMENT_COMMAND,
              ElementFormatTypeObject.CENTER,
              <CenterAlign />,
              1
            )}
            className="toolbar-item spaced flex gap-4"
            aria-label="Center Align"
          >
            <TextAlignCenter size={REGICONSIZE} />
            <ButtonText>Center Align</ButtonText>
          </Button>
        </li>
        <li
          className={`flex items-center justify-between w-full px-2 ${
            states.icons.justifyIdx === 2 ? "bg-primary-bg" : ""
          }`}
        >
          <Button
            onClick={handleDispatchCommand(
              FORMAT_ELEMENT_COMMAND,
              ElementFormatTypeObject.RIGHT,
              <RightAlign />,
              2
            )}
            className="toolbar-item spaced flex gap-4"
            aria-label="Right Align"
          >
            <TextAlignRight size={REGICONSIZE} />
            <ButtonText>Right Align</ButtonText>
          </Button>
        </li>
        <li
          className={`flex items-center justify-between w-full px-2 ${
            states.icons.justifyIdx === 3 ? "bg-primary-bg" : ""
          } rounded-b-md`}
        >
          <Button
            onClick={handleDispatchCommand(
              FORMAT_ELEMENT_COMMAND,
              ElementFormatTypeObject.JUSTIFY,
              <JustifyAlign />,
              3
            )}
            className="toolbar-item flex gap-4"
            aria-label="Justify Align"
          >
            <TextAlignJustify size={REGICONSIZE} />
            <ButtonText>Justify Align</ButtonText>
          </Button>
        </li>
        <li
          className={`flex items-center justify-between w-full px-2 ${
            states.icons.justifyIdx === 4 ? "bg-primary-bg" : ""
          } rounded-b-md`}
        >
          <Button
            onClick={handleDispatchCommand(
              FORMAT_ELEMENT_COMMAND,
              ElementFormatTypeObject.START,
              <JustifyAlign />,
              4
            )}
            className="toolbar-item flex gap-4"
            aria-label="Justify Align"
          >
            <TextAlignJustify size={REGICONSIZE} />
            <ButtonText>Start Align</ButtonText>
          </Button>
        </li>
        <li
          className={`flex items-center justify-between w-full px-2 ${
            states.icons.justifyIdx === 5 ? "bg-primary-bg" : ""
          } rounded-b-md`}
        >
          <Button
            onClick={handleDispatchCommand(
              FORMAT_ELEMENT_COMMAND,
              ElementFormatTypeObject.END,
              <JustifyAlign />,
              5
            )}
            className="toolbar-item flex gap-4"
            aria-label="Justify Align"
          >
            <TextAlignJustify size={REGICONSIZE} />
            <ButtonText>End Align</ButtonText>
          </Button>
        </li>
        <hr className="border-b-[1px] border-black w-[90%]" />
        <li
          className={`flex items-center justify-between w-full px-2 rounded-b-md`}
        >
          <Button
            onClick={() => {
              editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
            }}
            className="toolbar-item flex gap-4"
            aria-label="Justify Align"
          >
            <TextOutdent size={REGICONSIZE} />
            <ButtonText>Outdent</ButtonText>
          </Button>
        </li>
        <li
          className={`flex items-center justify-between w-full px-2 rounded-b-md`}
        >
          <Button
            onClick={() => {
              editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
            }}
            className="toolbar-item flex gap-4"
            aria-label="Justify Align"
          >
            <TextIndent size={REGICONSIZE} />
            <ButtonText>Indent</ButtonText>
          </Button>
        </li>
      </ul>
    </Dropdown>
  );
};

export default JustifyGroup;
