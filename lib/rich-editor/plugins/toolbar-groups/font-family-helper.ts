import { LexicalCommand, LexicalEditor } from "lexical";
import React, { useMemo } from "react";
import useToolbarStates from "../toolbar-states";

const useFontFamilyHelper = (
  editor: LexicalEditor,
  states: ReturnType<typeof useToolbarStates>
) => {
  const actions = useMemo(
    () => ({
      changeFontFamily(
        command: LexicalCommand<string>,
        payload: string,
        icon: React.JSX.Element,
        idx: number
      ) {
        editor.dispatchCommand(command, payload);
        states.setIcons((prev) => ({
          ...prev,
          fontFamily: icon,
          fontFamilyIdx: idx,
        }));
      },
    }),
    [editor]
  );

  return actions;
};

export default useFontFamilyHelper;
