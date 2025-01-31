import Dropdown from "@/app/admin/components/Dropdown";
import {
  ButtonIcon,
  ButtonText,
} from "@/app/components/ElementComponents/MemoizedButtons";
import { REGICONSIZE } from "@/constants/constants";
import {
  CaretDown,
  TextStrikethrough,
  TextSubscript,
  TextSuperscript,
} from "@phosphor-icons/react/dist/ssr";
import useToolbarStates from "../toolbar-states";
import {
  FORMAT_TEXT_COMMAND,
  LexicalCommand,
  LexicalEditor,
  TextFormatType,
} from "lexical";
import Button from "@/app/components/Button";

const TextMod = ({
  states,
  editor,
}: {
  states: ReturnType<typeof useToolbarStates>;
  editor: LexicalEditor;
}) => {
  const handleButtonClick =
    (command: LexicalCommand<TextFormatType>, payload: TextFormatType) =>
    (e: React.MouseEvent<HTMLButtonElement>) =>
      editor.dispatchCommand(command, payload);
  return (
    <Dropdown
      openIcon={
        <ButtonIcon>
          Aa <CaretDown size={REGICONSIZE} />
        </ButtonIcon>
      }
      closeIcon={
        <ButtonIcon>
          Aa <CaretDown size={REGICONSIZE} />
        </ButtonIcon>
      }
    >
      <ul className=" flex flex-col gap-2 bg-secondary-bg items-center rounded-md border border-primary-text">
        <li
          className={`flex items-center justify-between w-full px-2 ${
            states.isStrikethrough ? "bg-primary-bg" : ""
          } rounded-t-md`}
        >
          <Button
            onClick={handleButtonClick(FORMAT_TEXT_COMMAND, "strikethrough")}
            className={"toolbar-item spaced flex gap-4 "}
            aria-label="Format Strikethrough"
          >
            <TextStrikethrough size={REGICONSIZE} />
            <ButtonText>Strikethrough</ButtonText>
          </Button>
        </li>
        <li
          className={`flex items-center justify-between w-full px-2 ${
            states.isSubscript ? "bg-primary-bg" : ""
          } rounded-t-md`}
        >
          <Button
            onClick={handleButtonClick(FORMAT_TEXT_COMMAND, "subscript")}
            className={"toolbar-item spaced flex gap-4 "}
            aria-label="Format Subscript"
          >
            <TextSubscript size={REGICONSIZE} />
            <ButtonText>Subscript</ButtonText>
          </Button>
        </li>
        <li
          className={`flex items-center justify-between w-full px-2 ${
            states.isSuperscript ? "bg-primary-bg" : ""
          } rounded-t-md`}
        >
          <Button
            onClick={handleButtonClick(FORMAT_TEXT_COMMAND, "superscript")}
            className={"toolbar-item spaced flex gap-4"}
            aria-label="Format Superscript"
          >
            <TextSuperscript size={REGICONSIZE} />
            <ButtonText>Superscript</ButtonText>
          </Button>
        </li>
      </ul>
    </Dropdown>
  );
};

export default TextMod;
