import Dropdown from "@/app/admin/components/Dropdown";
import Button from "@/app/components/Button";
import {
  ButtonText,
  FontSize,
} from "@/app/components/ElementComponents/MemoizedButtons";
import useToolbarStates from "../toolbar-states";
import { LexicalEditor } from "lexical";
import { FORMAT_FONTSIZE_COMMAND } from "@/lib/nodes/FontSizeNode";

const FontSizeDropdown = ({
  states,
  editor,
}: {
  states: ReturnType<typeof useToolbarStates>;
  editor: LexicalEditor;
}) => {
  const handleFontSizeChange =
    (size: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      editor.dispatchCommand(FORMAT_FONTSIZE_COMMAND, size);
      states.setIcons((prev) => ({
        ...prev,
        fontSize: <FontSize size={size} />,
        fontSizeVal: Number(size),
      }));
    };
  return (
    <Dropdown
      openIcon={states.icons.fontSize}
      closeIcon={states.icons.fontSize}
    >
      <ul className=" flex flex-col gap-1 bg-secondary-bg items-center rounded-md border border-primary-text">
        {[8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72].map(
          (s, i) => {
            return (
              <li
                key={i}
                className={`flex items-center justify-between w-full px-2 ${
                  states.icons.fontSizeVal === s ? "bg-primary-bg" : ""
                } rounded-md`}
              >
                <Button
                  onClick={handleFontSizeChange(String(s))}
                  name="paragraph"
                  className="flex px-2 rounded-md"
                  aria-label="Image Insert"
                >
                  <ButtonText>{s}</ButtonText>
                </Button>
              </li>
            );
          }
        )}
      </ul>
    </Dropdown>
  );
};

export default FontSizeDropdown;
