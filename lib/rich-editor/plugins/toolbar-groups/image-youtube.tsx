import Dropdown from "@/app/admin/components/Dropdown";
import {
  ButtonIcon,
  ButtonText,
} from "@/app/components/ElementComponents/MemoizedButtons";
import { REGICONSIZE } from "@/constants/constants";
import {
  CaretDown,
  Image,
  Plus,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import useToolbarStates from "../toolbar-states";
import useDisplayMessage from "@/lib/hooks/dispatch-hooks";
import Button from "@/app/components/Button";
import React from "react";
import useImageYoutubeHelper from "./image-youtube-helper";
import { LexicalEditor } from "lexical";

const ImageYoutube = ({
  states,
  dispatch,
  editor,
}: {
  states: ReturnType<typeof useToolbarStates>;
  dispatch: ReturnType<typeof useDisplayMessage>;
  editor: LexicalEditor;
}) => {
  const imgYtHelper = useImageYoutubeHelper(dispatch, states);

  const handleYoutubeInsert =
    (editor: LexicalEditor) => (e: React.MouseEvent<HTMLButtonElement>) =>
      imgYtHelper.displayYoutubeInsert(editor);

  return (
    <Dropdown
      openIcon={
        <ButtonIcon>
          <Plus />
          <ButtonText>Insert</ButtonText>
          <CaretDown size={REGICONSIZE} />
        </ButtonIcon>
      }
      closeIcon={
        <ButtonIcon>
          <Plus />
          <ButtonText>Insert</ButtonText>
          <CaretDown size={REGICONSIZE} />
        </ButtonIcon>
      }
    >
      <ul className=" flex flex-col gap-2 bg-secondary-bg items-center rounded-md border border-primary-text">
        <li
          className={`flex items-center justify-between w-full px-2 ${
            states.icons.justifyIdx === 0 ? "bg-primary-bg" : ""
          } rounded-t-md`}
        >
          <Button
            onClick={imgYtHelper.displayImageSelection}
            className="toolbar-item spaced flex gap-4"
            aria-label="Image Insert"
          >
            <Image size={REGICONSIZE} />
            <ButtonText>Image</ButtonText>
          </Button>
        </li>
        <li className={`flex items-center justify-between w-full px-2`}>
          <Button
            onClick={handleYoutubeInsert(editor)}
            className="toolbar-item spaced flex gap-4"
            aria-label="Youtube Video"
          >
            <YoutubeLogo size={REGICONSIZE} />
            <ButtonText>Youtube Video</ButtonText>
          </Button>
        </li>
      </ul>
    </Dropdown>
  );
};

export default ImageYoutube;
