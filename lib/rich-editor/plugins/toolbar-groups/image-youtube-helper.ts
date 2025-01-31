import { modalIds } from "@/constants/constants";
import useDisplayMessage from "@/lib/hooks/dispatch-hooks";
import { useMemo } from "react";
import useToolbarStates from "../toolbar-states";
import { LexicalEditor } from "lexical";
import { INSERT_YOUTUBE_COMMAND } from "../YoutubePlugin";

function fillUrl(url: string) {
  const match =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(
      url || ""
    );

  const id = match ? (match?.[2].length === 11 ? match[2] : null) : null;

  if (id != null) {
    return id;
  }

  return "";
}

const useImageYoutubeHelper = (
  dispatch: ReturnType<typeof useDisplayMessage>,
  states: ReturnType<typeof useToolbarStates>
) => {
  const action = useMemo(
    () => ({
      displayImageSelection(e: React.MouseEvent<HTMLButtonElement>) {
        dispatch.displayModal(modalIds.toolbarpluginModal);
        states.setModalMode("image-upload");
        states.setImageListPage(0);
      },

      displayYoutubeInsert(editor: LexicalEditor) {
        const url = prompt("Enter the URL of the YouTube video:", "");
        editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, fillUrl(url || ""));
      },
    }),
    []
  );

  return action;
};

export default useImageYoutubeHelper;
