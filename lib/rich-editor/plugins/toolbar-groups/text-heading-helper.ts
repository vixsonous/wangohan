import { $getSelection, $isRangeSelection, LexicalEditor } from "lexical";
import { useMemo } from "react";
import useToolbarStates from "../toolbar-states";
import { $wrapNodes } from "@lexical/selection";
import { $createHeadingNode, HeadingTagType } from "@lexical/rich-text";
import { $createParagraphNode } from "lexical";

const useTextHeadingHelper = (
  editor: LexicalEditor,
  states: ReturnType<typeof useToolbarStates>
) => {
  const actions = useMemo(
    () => ({
      formatHeading(e: React.MouseEvent<HTMLButtonElement>) {
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
      },
    }),
    [editor]
  );

  return actions;
};

export default useTextHeadingHelper;
