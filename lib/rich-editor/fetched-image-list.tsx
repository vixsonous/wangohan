import Button from "@/app/components/Button";
import CenteredLoading from "@/app/components/ElementComponents/CenteredLoading";
import { REGICONSIZE } from "@/constants/constants";
import useEditorStates from "./editor-states";
import useEditorHelper from "./editor-helper";
import useDisplayMessage from "../hooks/dispatch-hooks";
import { X } from "@phosphor-icons/react/dist/ssr";
import OptImage from "@/app/components/ElementComponents/Image";
import { LexicalEditor } from "lexical";
import { INSERT_IMAGE_COMMAND } from "./plugins/ImagePlugin";
import useToolbarStates from "./plugins/toolbar-states";

const FetchedImageList = ({
  states,
  dispatch,
  helper,
  editor,
}: {
  states: ReturnType<typeof useEditorStates | typeof useToolbarStates>;
  dispatch: ReturnType<typeof useDisplayMessage>;
  helper: ReturnType<typeof useEditorHelper>;
  editor?: LexicalEditor | undefined;
}) => {
  const closeModalOnClick = () => dispatch.hideModal();

  const handleInsertImageFromList = (
    src: string,
    filename: string,
    states: ReturnType<typeof useEditorStates | typeof useToolbarStates>,
    editor?: LexicalEditor | undefined
  ) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      if ("form" in states)
        helper.insertImageFromList(e, src, filename, states);

      if (!editor) return;
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        altText: filename,
        src: src,
        width: 500,
      });

      dispatch.hideModal();
    };
  };

  return (
    <div className="relative top-0 left-0 justify-center items-center flex w-full h-full">
      <div className="bg-primary-bg p-4 max-w-screen-lg w-full flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-lg">Uploaded Images</span>
          <Button className="group relative p-2" onClick={closeModalOnClick}>
            <X size={REGICONSIZE} />
            <div className="absolute w-full h-full bg-black top-0 left-0 opacity-0 group-hover:opacity-20 transition-all rounded-full"></div>
          </Button>
        </div>
        <hr className="border-b-[1px] border-black w-full" />
        <div
          className={`${
            !states.imageFetch && "overflow-y-scroll"
          } max-h-96 min-w-96`}
        >
          {states.imageFetch ? (
            <CenteredLoading size={REGICONSIZE} />
          ) : (
            <div>
              {states.imageList.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {states.imageList.map((i, idx) => {
                    return (
                      <Button
                        onClick={handleInsertImageFromList(
                          i.blog_image_url,
                          i.blog_image_title,
                          states,
                          editor
                        )}
                        name={i.blog_image_title}
                        id={i.blog_image_url}
                        key={idx}
                        className=""
                      >
                        <OptImage
                          className="w-full"
                          fit="cover"
                          width={250}
                          height={250}
                          centered
                          resize
                          square
                          src={i.blog_image_url}
                        />
                      </Button>
                    );
                  })}
                </div>
              ) : (
                <span>Empty Files</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FetchedImageList;
