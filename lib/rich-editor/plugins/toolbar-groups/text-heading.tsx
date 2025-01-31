import Dropdown from "@/app/admin/components/Dropdown";
import Button from "@/app/components/Button";
import { ButtonText } from "@/app/components/ElementComponents/MemoizedButtons";
import {
  Paragraph,
  TextHOne,
  TextHThree,
  TextHTwo,
} from "@phosphor-icons/react/dist/ssr";
import useToolbarStates from "../toolbar-states";
import useTextHeadingHelper from "./text-heading-helper";
import { LexicalEditor } from "lexical";
import { REGICONSIZE } from "@/constants/constants";

const TextHeading = ({
  states,
  editor,
}: {
  states: ReturnType<typeof useToolbarStates>;
  editor: LexicalEditor;
}) => {
  const helper = useTextHeadingHelper(editor, states);

  return (
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
            onClick={helper.formatHeading}
            name="paragraph-0"
            className="toolbar-item spaced flex gap-4"
            aria-label="Image Insert"
          >
            <Paragraph size={REGICONSIZE} />
            <ButtonText>Paragraph</ButtonText>
          </Button>
        </li>
        <li
          className={`flex items-center justify-between w-full px-2 ${
            states.icons.textTypeIdx === 1 ? "bg-primary-bg" : ""
          } rounded-t-md`}
        >
          <Button
            onClick={helper.formatHeading}
            name="h1-1"
            className="toolbar-item spaced flex gap-4"
            aria-label="Image Insert"
          >
            <TextHOne size={REGICONSIZE} />
            <ButtonText>H1 Heading</ButtonText>
          </Button>
        </li>
        <li
          className={`flex items-center justify-between w-full px-2 ${
            states.icons.textTypeIdx === 2 ? "bg-primary-bg" : ""
          } rounded-t-md`}
        >
          <Button
            onClick={helper.formatHeading}
            name="h2-2"
            className="toolbar-item spaced flex gap-4"
            aria-label="Image Insert"
          >
            <TextHTwo size={REGICONSIZE} />
            <ButtonText>H2 Heading</ButtonText>
          </Button>
        </li>
        <li
          className={`flex items-center justify-between w-full px-2 ${
            states.icons.textTypeIdx === 3 ? "bg-primary-bg" : ""
          } rounded-t-md`}
        >
          <Button
            onClick={helper.formatHeading}
            name="h3-3"
            className="toolbar-item spaced flex gap-4"
            aria-label="Image Insert"
          >
            <TextHThree size={REGICONSIZE} />
            <ButtonText>H3 Heading</ButtonText>
          </Button>
        </li>
      </ul>
    </Dropdown>
  );
};

export default TextHeading;
