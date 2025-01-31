import Dropdown from "@/app/admin/components/Dropdown";
import Button from "@/app/components/Button";
import {
  ButtonText,
  Mitimasu,
  Sans,
  SansSerif,
} from "@/app/components/ElementComponents/MemoizedButtons";
import useToolbarStates from "../toolbar-states";
import { LexicalCommand, LexicalEditor } from "lexical";
import useFontFamilyHelper from "./font-family-helper";
import { FORMAT_FONTFAMILY_COMMAND } from "@/lib/nodes/FontNode";

const FontFamily = ({
  states,
  editor,
}: {
  states: ReturnType<typeof useToolbarStates>;
  editor: LexicalEditor;
}) => {
  const helper = useFontFamilyHelper(editor, states);

  const handleFontFamilyChange =
    (
      command: LexicalCommand<string>,
      payload: string,
      icon: React.JSX.Element,
      idx: number
    ) =>
    (e: React.MouseEvent<HTMLButtonElement>) =>
      helper.changeFontFamily(command, payload, icon, idx);
  return (
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
            onClick={handleFontFamilyChange(
              FORMAT_FONTFAMILY_COMMAND,
              "sans-serif",
              <SansSerif />,
              0
            )}
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
            onClick={handleFontFamilyChange(
              FORMAT_FONTFAMILY_COMMAND,
              "sans",
              <Sans />,
              1
            )}
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
            onClick={handleFontFamilyChange(
              FORMAT_FONTFAMILY_COMMAND,
              "mitimasu",
              <Mitimasu />,
              2
            )}
            name="paragraph"
            className="toolbar-item spaced flex gap-4"
            aria-label="Image Insert"
          >
            <ButtonText>Mitimasu</ButtonText>
          </Button>
        </li>
      </ul>
    </Dropdown>
  );
};

export default FontFamily;
