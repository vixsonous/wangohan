import { ElementFormatType, LexicalCommand, LexicalEditor } from "lexical";
import React, { useMemo } from "react";
import useToolbarStates from "../toolbar-states";

const useJustifyGroupHelper = (
  editor: LexicalEditor,
  states: ReturnType<typeof useToolbarStates>
) => {
  const actions = useMemo(
    () => ({
      handleJustifyClick(
        command: LexicalCommand<ElementFormatType>,
        payload: string,
        icon: React.JSX.Element,
        justifyIdx: number
      ) {
        editor.dispatchCommand(command, payload as ElementFormatType);
        states.setIcons((prev) => ({
          ...prev,
          justify: icon,
          justifyIdx: justifyIdx,
        }));
      },
    }),
    [editor]
  );

  return actions;
};

export default useJustifyGroupHelper;
