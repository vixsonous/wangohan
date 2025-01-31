import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { editorConfig } from "./editor-config";
import GeneralButton from "@/app/components/ElementComponents/GeneralButton";
import useEditorStates from "./editor-states";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { FontFamilyPlugin } from "../nodes/FontNode";
import { FontSizePlugin } from "../nodes/FontSizeNode";
import { FontColorPlugin } from "../nodes/FontColorNode";
import { FontBackgroundColorNodePlugin } from "../nodes/FontBackgroundColorNode";
import ImagesPlugin from "./plugins/ImagePlugin";
import YouTubePlugin from "./plugins/YoutubePlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import {
  AutoLinkPlugin,
  createLinkMatcherWithRegExp,
} from "@lexical/react/LexicalAutoLinkPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { memo, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { customGenerateHtmlFromNodes } from "../lib/GenerateHtml";
import { EMAIL_REGEX, URL_REGEX } from "@/constants/constants";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import useEditorHelper from "./editor-helper";

const placeholder = "Enter some rich text...";

const OnChangePlugin = memo(function OnChangePlugin({
  states,
}: {
  states: ReturnType<typeof useEditorStates>;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editor.read(() => {
        const jsonState = editorState.toJSON();
        states.setState(JSON.stringify(jsonState));
        const html = customGenerateHtmlFromNodes(editor);
        states.setHtmlString(html);
        sessionStorage.setItem("editor", JSON.stringify(jsonState));
      });
    });
  }, [editor]);
  return null;
});

export default function EditorLexicalComposer({
  states,
  helper,
  userId,
}: {
  states: ReturnType<typeof useEditorStates>;
  helper: ReturnType<typeof useEditorHelper>;
  userId: number;
}) {
  const handleCreateBlog = (
    states: ReturnType<typeof useEditorStates>,
    userId: number
  ) => {
    return (e: React.MouseEvent<HTMLButtonElement>) =>
      helper.createBlog(e, states, userId);
  };

  const MATCHERS = [
    createLinkMatcherWithRegExp(URL_REGEX, (text) => {
      return text;
    }),
    createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => {
      return `mailto:${text}`;
    }),
  ];

  return (
    <LexicalComposer
      initialConfig={{ ...editorConfig, editorState: states.editorState }}
    >
      <div
        className="editor-container"
        style={{ margin: "0", marginTop: "1em", maxWidth: "none" }}
      >
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="editor-placeholder">{placeholder}</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          {/* <AutoFocusPlugin /> */}
          <LinkPlugin />
          {!states.titleFocus && <AutoLinkPlugin matchers={MATCHERS} />}
          <ImagesPlugin />
          <OnChangePlugin states={states} />
          <YouTubePlugin />
          <FontSizePlugin />
          <FontColorPlugin />
          <FontBackgroundColorNodePlugin />
          <FontFamilyPlugin />
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-8">
        <GeneralButton
          onClick={handleCreateBlog(states, userId)}
          aria-label="create-recipe-button"
          disabled={states.submit}
          type="submit"
        >
          {!states.submit ? (
            "作成する"
          ) : (
            <span className="flex justify-center items-center">
              <CircleNotch size={20} className="animate-spin" /> 作成する
            </span>
          )}
        </GeneralButton>
      </div>
      <div
        className="mt-8"
        dangerouslySetInnerHTML={{ __html: states.htmlString }}
      ></div>
    </LexicalComposer>
  );
}
