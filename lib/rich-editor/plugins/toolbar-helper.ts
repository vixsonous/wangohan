import { LexicalEditor, RangeSelection } from "lexical";
import useToolbarStates from "./toolbar-states";
import { $isAtNodeEnd } from "@lexical/selection";
import { useMemo } from "react";
import { FORMAT_FONTCOLOR_COMMAND } from "@/lib/nodes/FontColorNode";
import { FORMAT_FONTBACKGROUNDCOLOR_COMMAND } from "@/lib/nodes/FontBackgroundColorNode";

const useToolbarHelper = (
  editor: LexicalEditor,
  states: ReturnType<typeof useToolbarStates>
) => {
  const actions = useMemo(
    () => ({
      getSelectedNode(selection: RangeSelection) {
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
      },
      fontColorOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const t = e.currentTarget;
        editor.dispatchCommand(FORMAT_FONTCOLOR_COMMAND, String(t.value));
        states.setFontColor(t.value);
      },

      fontBackgroundColorOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const t = e.currentTarget;
        editor.dispatchCommand(
          FORMAT_FONTBACKGROUNDCOLOR_COMMAND,
          String(t.value)
        );
        states.setFontBackgroundColor(t.value);
      },

      resetFontBackgroundColor(e: React.MouseEvent<HTMLButtonElement>) {
        editor.dispatchCommand(FORMAT_FONTBACKGROUNDCOLOR_COMMAND, String(""));
        states.setFontBackgroundColor("#FFE9C9");
      },

      resetFontColor(e: React.MouseEvent<HTMLButtonElement>) {
        editor.dispatchCommand(FORMAT_FONTCOLOR_COMMAND, String("#523636"));
        states.setFontBackgroundColor("#523636");
      },
    }),
    [editor]
  );

  return actions;
};

export default useToolbarHelper;
