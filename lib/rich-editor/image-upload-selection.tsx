import Dropdown from "@/app/admin/components/Dropdown";
import Button from "@/app/components/Button";
import { FileButton, REGICONSIZE } from "@/constants/constants";
import { CircleNotch, Plus, X } from "@phosphor-icons/react/dist/ssr";
import useEditorStates from "./editor-states";
import useEditorHelper from "./editor-helper";
import useDisplayMessage from "../hooks/dispatch-hooks";
import { useRef } from "react";

const ImageUploadSelection = ({
  states,
  helper,
  dispatch,
}: {
  states: ReturnType<typeof useEditorStates>;
  helper: ReturnType<typeof useEditorHelper>;
  dispatch: ReturnType<typeof useDisplayMessage>;
}) => {
  const imageFileRef = useRef<HTMLInputElement>(null);

  const handleFetchImageUploads = (
    states: ReturnType<typeof useEditorStates>
  ) => {
    return (e: React.MouseEvent<HTMLButtonElement>) =>
      helper.fetchImageUploads(e, states);
  };

  const handleUploadFile = (
    imageFileRef: React.RefObject<HTMLInputElement>,
    states: ReturnType<typeof useEditorStates>
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      helper.uploadFile(e, imageFileRef, states);
  };

  const closeModalOnClick = () => dispatch.hideModal();

  return (
    <div className="relative justify-center items-center flex px-4">
      <div className="max-w-screen-lg w-full bg-primary-bg p-4 flex flex-col gap-2 ">
        <div className="flex justify-between items-center">
          <span className="text-lg">Insert Image</span>
          <Button className="group relative p-2" onClick={closeModalOnClick}>
            <X size={REGICONSIZE} />
            <div className="absolute w-full h-full bg-black top-0 left-0 opacity-0 group-hover:opacity-[0.2] transition-all rounded-full"></div>
          </Button>
        </div>
        <hr className="border-b-[1px] border-black w-full" />
        <Button
          onClick={handleFetchImageUploads(states)}
          className={`w-[100%] bg-[#ffb762] border-[1px] border-primary-text text-primary-text py-2 rounded-md text-sm font-semibold`}
        >
          <span>Uploaded Images</span>
        </Button>
        <Dropdown
          className="w-full"
          closeOnClick={false}
          openIcon={<FileButton />}
          closeIcon={<FileButton />}
        >
          <div className="p-2 flex gap-2 items-center">
            <Button aria-label="file" name="file">
              <label htmlFor="file">
                <input
                  disabled={states.imageUpload}
                  onChange={handleUploadFile(imageFileRef, states)}
                  ref={imageFileRef}
                  type="file"
                  hidden
                  name="file"
                  id="file"
                />
                <span
                  className={`w-[100%] cursor-pointer bg-[#ffb762] border-[1px] border-primary-text text-primary-text px-4 py-2 rounded-md text-sm font-semibold`}
                >
                  {states.fileName}
                </span>
              </label>
            </Button>

            <Button disabled className="p-2 relative group">
              {!states.imageUpload ? (
                <Plus size={REGICONSIZE} />
              ) : (
                <CircleNotch className="animate-spin" />
              )}
              <div className="w-full h-full bg-black absolute top-0 left-0 rounded-full opacity-0 group-hover:opacity-[0.2] transition-all"></div>
            </Button>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default ImageUploadSelection;
