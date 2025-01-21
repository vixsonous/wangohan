"use client";
import Dropdown from '@/app/admin/components/Dropdown';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$getNearestNodeOfType, mergeRegister} from '@lexical/utils';
import { ArrowClockwise, ArrowCounterClockwise, BracketsAngle, CaretDown, CircleNotch, Image, PaintBrush, PaintBucket, Paragraph, Plus, TextAa, TextAlignCenter, TextAlignJustify, TextAlignLeft, TextAlignRight, TextBolder, TextHOne, TextHThree, TextHTwo, TextIndent, TextItalic, TextOutdent, TextStrikethrough, TextSubscript, TextSuperscript, TextUnderline, X, YoutubeLogo } from '@phosphor-icons/react/dist/ssr';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_EDITOR,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  KEY_TAB_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  RangeSelection,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { $isLinkNode } from "@lexical/link";
import {
  $createHeadingNode,
  $isHeadingNode,
  HeadingTagType
} from "@lexical/rich-text";
import {
  $isListNode,
  ListNode
} from "@lexical/list";
import {
  $isCodeNode,
  getDefaultCodeLanguage,
} from "@lexical/code";
import { $wrapNodes, $isAtNodeEnd } from "@lexical/selection";
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import Button from '@/app/components/Button';
import { INSERT_IMAGE_COMMAND } from './ImagePlugin';
import { useDispatch } from 'react-redux';
import { hideError, hideModal, showError, showModal } from '@/lib/redux/states/messageSlice';
import Modal from '@/app/components/ElementComponents/Modal';
import { imageFileTypes, POPUPTIME } from '@/constants/constants';
import { INSERT_YOUTUBE_COMMAND } from './YoutubePlugin';
import { FORMAT_FONTFAMILY_COMMAND } from '@/lib/nodes/FontNode';
import { FORMAT_FONTSIZE_COMMAND } from '@/lib/nodes/FontSizeNode';
import { FORMAT_FONTCOLOR_COMMAND } from '@/lib/nodes/FontColorNode';
import { FORMAT_FONTBACKGROUNDCOLOR_COMMAND } from '@/lib/nodes/FontBackgroundColorNode';
import LoadingCircle from '@/app/components/IconComponents/LoadingCircle';
import OptImage from '@/app/components/ElementComponents/Image';
import heic2any from 'heic2any';

const LowPriority = 1;
const IconSize=20;

const LeftAlign = memo(() => <ButtonIcon><TextAlignLeft size={IconSize} /><ButtonText>Left Align</ButtonText><CaretDown size={IconSize}/></ButtonIcon>);
const RightAlign = memo(() => <ButtonIcon><TextAlignRight size={IconSize} /><ButtonText>Right Align</ButtonText><CaretDown size={IconSize}/></ButtonIcon>);
const CenterAlign = memo(() => <ButtonIcon><TextAlignCenter size={IconSize} /><ButtonText>Center Align</ButtonText><CaretDown size={IconSize}/></ButtonIcon>);
const JustifyAlign = memo(() => <ButtonIcon><TextAlignJustify size={IconSize} /><ButtonText>Justify Align</ButtonText><CaretDown size={IconSize}/></ButtonIcon>);

const UrlButton = memo(() => <Button className={`w-[100%] bg-[#ffb762] border-[1px] border-primary-text text-primary-text px-32 py-2 rounded-md text-sm font-semibold`}><span>URL</span></Button>);
const FileButton = memo(() => <Button className={`w-[100%] bg-[#ffb762] border-[1px] border-primary-text text-primary-text px-32 py-2 rounded-md text-sm font-semibold`}><span>File</span></Button>);

const ParagraphButton = memo(() => <ButtonIcon><Paragraph size={IconSize}/><ButtonText>Paragraph</ButtonText></ButtonIcon>);
const H1Button = memo(() => <ButtonIcon><TextHOne size={IconSize}/><ButtonText>H1</ButtonText></ButtonIcon>);
const H2Button = memo(() => <ButtonIcon><TextHTwo size={IconSize}/><ButtonText>H2</ButtonText></ButtonIcon>);
const H3Button = memo(() => <ButtonIcon><TextHThree size={IconSize}/><ButtonText>H3</ButtonText></ButtonIcon>);

const SansSerif = memo(() => <ButtonIcon><ButtonText>Sans Serif</ButtonText><CaretDown size={IconSize}/></ButtonIcon>);
const Sans = memo(() => <ButtonIcon><ButtonText>Sans</ButtonText><CaretDown size={IconSize}/></ButtonIcon>);
const Mitimasu = memo(() => <ButtonIcon><ButtonText>Mitimasu</ButtonText><CaretDown size={IconSize}/></ButtonIcon>);

const FontSize = memo(({size}:{size: string}) => <ButtonIcon><ButtonText>{size}</ButtonText><CaretDown size={IconSize}/></ButtonIcon>);

const ButtonText = memo(function ButtonText({children}:{children: React.ReactNode}) {
  return <span className='text-sm tracking-tighter'>{children}</span>
});

const ButtonIcon = memo(function ButtonIcon({children}:{children: React.ReactNode}) {
  return <Button className='toolbar-item flex gap-4'>{children}</Button>
});

const Divider = memo(function Divider() {
  return <div className="divider" />;
});

type ImageMetadata = {
  blog_image_title: string;
  blog_image_url: string;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubScript] = useState(false);
  const [isSuperscript, setIsSuperScript] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [fontColor, setFontColor] = useState("#523636");
  const [fontBackgroundColor, setFontBackgroundColor] = useState("#FFE9C9");
  const [modalMode, setModalMode] = useState('image-upload');
  const [imageListPage, setImageListPage] = useState(0);
  const [imageList, setImageList] = useState<Array<ImageMetadata>>([]);
  const [imageFetch, setImageFetch] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);

  const [blockType, setBlockType] = useState("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState<string>('');
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(
    false
  );
  const [codeLanguage, setCodeLanguage] = useState("");
  const [isLink, setIsLink] = useState(false);
  // icons
  const [icons, setIcons] = useState({
    justifyOpen: false,
    justify: <LeftAlign />,
    justifyIdx: 0,

    fontFamily: <SansSerif />,
    fontFamilyIdx: 0,

    textType: <ParagraphButton />,
    textTypeIdx: 0,

    fontSize: <FontSize size={'15'}/>,
    fontSizeVal: 15,
  })

  function rgbToHex(rgb: string): string {
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) return rgb; // Return as is if conversion is not possible
    return `#${match
      .slice(0, 3)
      .map((x) => parseInt(x, 10).toString(16).padStart(2, '0'))
      .join('')}`;
  }

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsSubScript(selection.hasFormat('subscript'));
      setIsSuperScript(selection.hasFormat('superscript'));
      setIsCode(selection.hasFormat('code'));

      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
          const computedStyle = window.getComputedStyle(elementDOM);
          const fontSize = computedStyle.fontSize;

          setFontColor(selection.style.includes("color:") ? selection.style.split("color: ")[1].split(";")[0] || "#523636": 
          "#523636")
          setFontBackgroundColor(selection.style.includes("background:") ? selection.style.split("background: ")[1].split(";")[0] || "#FFE9C9": 
          "#FFE9C9")
          setIcons(prev => ({...prev, 
            textType: type === "paragraph" ? <ParagraphButton /> : 
              type === "h1" ? <H1Button /> :
              type === "h2" ? <H2Button /> :
              type === "h3" ? <H3Button /> : <ParagraphButton />,
            textTypeIdx: type === "paragraph" ? 0 : 
              type === "h1" ? 1 :
              type === "h2" ? 2 :
              type === "h3" ? 3 : 0,
            fontFamily: selection.style.includes("sans-serif") ? <SansSerif /> : 
              selection.style.includes("mitimasu") ? <Mitimasu /> :
              <Sans />,
            fontFamilyIdx: selection.style.includes("sans-serif") ? 0 : 
              selection.style.includes("mitimasu") ? 2 :
              1,
            fontSize: <FontSize size={
              selection.style.includes("font-size:") ? selection.style.split("font-size: ")[1].replace("px;","") : 
              fontSize.replace("px","")
            }/>,
            fontSizeVal: selection.style.includes("font-size:") ? Number(selection.style.split("font-size: ")[1].replace("px;","")) : 
              Number(String(fontSize).replace("px;",""))
          }))
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          }
        }
      }
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }

  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        KEY_TAB_COMMAND,
        (payload) => {
          const event: KeyboardEvent = payload;
          event.preventDefault();
          return editor.dispatchCommand(
            event.shiftKey ? OUTDENT_CONTENT_COMMAND : INDENT_CONTENT_COMMAND, undefined
          );
        },
        COMMAND_PRIORITY_EDITOR,
      )
    );
  }, [editor, $updateToolbar]);

  const urlRef = useRef<HTMLInputElement>(null);
  const imageAltRef = useRef<HTMLInputElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState('No image uploaded!');

  const dispatch = useDispatch();
  const closeModalOnClick = useCallback(() => dispatch(hideModal()),[]);
  const uploadFileUrl = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const t = e.currentTarget;
    
    if(urlRef.current && imageAltRef.current) {
      const val = urlRef.current.value;
      const alt = imageAltRef.current.value;

      editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        altText: alt,
        src: val
      });
      dispatch(hideModal());
    }
  },[]);

  function fillUrl(url:string) {
    const match = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url || "");
  
    const id = match ? (match?.[2].length === 11 ? match[2] : null) : null;
  
    if (id != null) {
      return id;
    }
  
    return '';
  }

  const uploadPreviewFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(imageFileRef.current) {
      const t = imageFileRef.current;
      if(!t.files || !t.files[0]) return;
      if(!imageFileTypes.includes(t.files[0].type) && t.files[0].type !== "") {
        return;
      }
      if(t.files[0].type === "" && !imageFileTypes.includes(t.files[0].name.split(".")[1].toLowerCase())) {
        return
      }

      setFileName(t.files[0].name);
    }
  },[]);

  const uploadFile = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    if(imageFileRef.current) {
      const t = imageFileRef.current;
      if(!t.files || !t.files[0]) return;

      const fileName = t.files[0].name;
      const fileNameExt = fileName.substring(fileName.lastIndexOf('.') + 1);

      const fd = new FormData();

      if(typeof window !== 'undefined' && (fileNameExt.toLowerCase() === "heic" || fileNameExt.toLowerCase() === "heif")) {
        const image = await heic2any({
          blob: t.files[0],
          toType: 'image/webp',
          quality: 0.8
        });

        const img = !Array.isArray(image) ? [image] : image;
        const f = new File(img, fileName);

        fd.append('file', f);
      } else {
        fd.append('file',t.files[0]);
      }

      setImageUpload(true);
      const res = await fetch("/api/blog-images", {
        method: 'POST',
        body: fd
      });
      setImageUpload(false);

      const body = await res.json();

      if(!res.ok) {
        showError(body.message);
        setTimeout(() => hideError(),5000);
      }

      editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        altText: t.files[0].name,
        src: body.body.fileUrl,
        width: 500
      });
      
      dispatch(hideModal());
      setFileName('No image uploaded');
    }
  },[]);

  const insertImageFromList = (e:React.MouseEvent<HTMLButtonElement>) => {
    const t = e.currentTarget;
    
    const src = t.id;
    const name = t.name;

    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      altText: name,
      src: src,
      width: 500
    });

    hideModal();
  }

  const formatHeading = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nameDetail = e.currentTarget.name;
    const idx = nameDetail.split("-")[1];
    const name = nameDetail.split("-")[0];
    setIcons(prev => ({...prev, textTypeIdx: Number(idx)}));

    if (blockType !== "paragraph" || blockType !== name) {
      
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            $wrapNodes(selection, () => $createHeadingNode(name as HeadingTagType));
            setBlockType(name);
          }
        }
      });
    } else{
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            $wrapNodes(selection, () => $createParagraphNode());
            setBlockType("paragraph");
          }
        }
      });
    }
  };

  function getSelectedNode(selection: RangeSelection) {
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
  }

  const fontColorOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const t = e.currentTarget;
    editor.dispatchCommand(FORMAT_FONTCOLOR_COMMAND, String(t.value));
    setFontColor(t.value);
  }

  const fontBackgroundColorOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const t = e.currentTarget;
    editor.dispatchCommand(FORMAT_FONTBACKGROUNDCOLOR_COMMAND, String(t.value));
    setFontBackgroundColor(t.value);
  }

  const resetFontBackgroundColor = (e:React.MouseEvent<HTMLButtonElement>) => {
    editor.dispatchCommand(FORMAT_FONTBACKGROUNDCOLOR_COMMAND, String(""));
    setFontBackgroundColor("#FFE9C9");
  }

  const resetFontColor = (e:React.MouseEvent<HTMLButtonElement>) => {
    editor.dispatchCommand(FORMAT_FONTCOLOR_COMMAND, String("#523636"));
    setFontBackgroundColor("#523636");
  }

  return (
    <div className="toolbar flex flex-wrap" ref={toolbarRef}>
      <Button disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo">
        <ArrowClockwise size={IconSize} />
      </Button>
      <Button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo">
        <ArrowCounterClockwise size={IconSize} />
      </Button>
      <Divider />
      <Dropdown openIcon={icons.textType} closeIcon={icons.textType}>
        <ul className=" flex flex-col gap-2 bg-secondary-bg items-center rounded-md border border-primary-text">
          <li className={`flex items-center justify-between w-full px-2 ${icons.textTypeIdx === 0 ? 'bg-primary-bg' : ''} rounded-t-md`}>
            <Button
              onClick={formatHeading}
              name="paragraph-0"
              className="toolbar-item spaced flex gap-4"
              aria-label="Image Insert">
              <Paragraph size={IconSize}/>
              <ButtonText>Paragraph</ButtonText>
            </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2 ${icons.textTypeIdx === 1 ? 'bg-primary-bg' : ''} rounded-t-md`}>
            <Button
              onClick={formatHeading}
              name="h1-1"
              className="toolbar-item spaced flex gap-4"
              aria-label="Image Insert">
              <TextHOne size={IconSize}/>
              <ButtonText>H1 Heading</ButtonText>
            </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2 ${icons.textTypeIdx === 2 ? 'bg-primary-bg' : ''} rounded-t-md`}>
            <Button
              onClick={formatHeading}
              name="h2-2"
              className="toolbar-item spaced flex gap-4"
              aria-label="Image Insert">
              <TextHTwo size={IconSize}/>
              <ButtonText>H2 Heading</ButtonText>
            </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2 ${icons.textTypeIdx === 3 ? 'bg-primary-bg' : ''} rounded-t-md`}>
            <Button
              onClick={formatHeading}
              name="h3-3"
              className="toolbar-item spaced flex gap-4"
              aria-label="Image Insert">
              <TextHThree size={IconSize}/>
              <ButtonText>H3 Heading</ButtonText>
            </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2`}>
              <Button
                onClick={() => {
                  const url = prompt("Enter the URL of the YouTube video:", "");
                  
                  editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, fillUrl(url || ''));
                  setIcons(prev => ({...prev, justify: <CenterAlign />, justifyIdx: 1}))
                }}
                className="toolbar-item spaced flex gap-4"
                aria-label="Youtube Video">
                <YoutubeLogo size={IconSize}/>
                <ButtonText>Youtube Video</ButtonText>
              </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2 ${icons.justifyIdx === 2 ? 'bg-primary-bg' : ''}`}>
              <Button
                onClick={() => {
                  editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
                  setIcons(prev => ({...prev, justify: <RightAlign />, justifyIdx: 2}))
                }}
                className="toolbar-item spaced flex gap-4"
                aria-label="Right Align">
                <TextAlignRight size={IconSize}/>
                <ButtonText>Right Align</ButtonText>
              </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2 ${icons.justifyIdx === 3 ? 'bg-primary-bg' : ''} rounded-b-md`}>
            <Button
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
                setIcons(prev => ({...prev, justify: <JustifyAlign />, justifyIdx: 3}))
              }}
              className="toolbar-item flex gap-4"
              aria-label="Justify Align">
              <TextAlignJustify size={IconSize}/>
              <ButtonText>Justify Align</ButtonText>
            </Button>
          </li>
        </ul>
      </Dropdown>
      <Divider />
      <Dropdown openIcon={icons.fontFamily} closeIcon={icons.fontFamily}>
        <ul className=" flex flex-col gap-2 bg-secondary-bg items-center rounded-md border border-primary-text">
          <li className={`flex items-center justify-between w-full px-2 ${icons.fontFamilyIdx === 0 ? 'bg-primary-bg' : ''} rounded-t-md`}>
            <Button
              onClick={() => {
                editor.dispatchCommand(FORMAT_FONTFAMILY_COMMAND, 'sans-serif');
                setIcons(prev => ({...prev, fontFamily: <SansSerif />, fontFamilyIdx: 0}))
              }}
              name="paragraph"
              className="toolbar-item spaced flex gap-4"
              aria-label="Image Insert">
              <ButtonText>Sans Serif</ButtonText>
            </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2 ${icons.fontFamilyIdx === 1 ? 'bg-primary-bg' : ''} rounded-t-md`}>
            <Button
              onClick={() => {
                editor.dispatchCommand(FORMAT_FONTFAMILY_COMMAND, 'sans');
                setIcons(prev => ({...prev, fontFamily: <Sans />, fontFamilyIdx: 1}))
              }}
              name="paragraph"
              className="toolbar-item spaced flex gap-4"
              aria-label="Image Insert">
              <ButtonText>Sans</ButtonText>
            </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2 ${icons.fontFamilyIdx === 2 ? 'bg-primary-bg' : ''} rounded-t-md`}>
            <Button
              onClick={() => {
                editor.dispatchCommand(FORMAT_FONTFAMILY_COMMAND, 'mitimasu');
                setIcons(prev => ({...prev, fontFamily: <Mitimasu />, fontFamilyIdx: 2}))
              }}
              name="paragraph"
              className="toolbar-item spaced flex gap-4"
              aria-label="Image Insert">
              <ButtonText>Mitimasu</ButtonText>
            </Button>
          </li>
        </ul>
      </Dropdown>
      <Divider />
      <Dropdown openIcon={icons.fontSize} closeIcon={icons.fontSize}>
        <ul className=" flex flex-col gap-1 bg-secondary-bg items-center rounded-md border border-primary-text">
          {
            [8,9,10,11,12,14,16,18,20,22,24,26,28,36,48,72].map( (s, i) => {
              return (
                <li key={i} className={`flex items-center justify-between w-full px-2 ${icons.fontSizeVal === s ? 'bg-primary-bg' : ''} rounded-md`}>
                  <Button
                    onClick={() => {
                      editor.dispatchCommand(FORMAT_FONTSIZE_COMMAND, String(s));
                      setIcons(prev => ({...prev, fontSize: <FontSize size={String(s)}/>, fontSizeVal: s}))
                    }}
                    name="paragraph"
                    className="flex px-2 rounded-md"
                    aria-label="Image Insert">
                    <ButtonText>{s}</ButtonText>
                  </Button>
                </li>
              )
            })
          }
        </ul>
      </Dropdown>
      <Divider />
      <Button
        // onClick={() => alert(5)}
        className={'toolbar-item spaced cursor-pointer ' + (isBold ? 'active' : '')}
        aria-label="Format Bold">
        <label htmlFor="text-color" className='flex gap-1 items-center cursor-pointer'>
          <TextAa size={IconSize} className='cursor-pointer'/>
          <input onChange={fontColorOnChange} type="color" id="text-color" value={fontColor} className='bg-none p-0 cursor-pointer w-2'/>
        </label>
      </Button>
      <Button 
        className={'toolbar-item flex justify-center items-center spaced cursor-pointer ' + (isBold ? 'active' : '')}
        aria-label="Format Bold"
        onClick={resetFontColor}
      >
          <ArrowClockwise size={IconSize - 4}/>
      </Button>
      <Divider />
      <Button
        // onClick={() => alert(5)}
        className={'toolbar-item spaced cursor-pointer ' + (isBold ? 'active' : '')}
        aria-label="Format Bold">
        <label htmlFor="text-background-color" className='flex gap-1 items-center cursor-pointer'>
          <PaintBucket size={IconSize} className='cursor-pointer'/>
          <input onChange={fontBackgroundColorOnChange} type="color" id="text-background-color" value={fontBackgroundColor} className='bg-none p-0 cursor-pointer w-2'/>
        </label>
      </Button>
      <Button 
        className={'toolbar-item flex justify-center items-center spaced cursor-pointer ' + (isBold ? 'active' : '')}
        aria-label="Format Bold"
        onClick={resetFontBackgroundColor}
      >
          <ArrowClockwise size={IconSize - 4}/>
      </Button>
      <Divider />
      <Button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
        aria-label="Format Bold">
        <TextBolder size={IconSize}/>
      </Button>
      <Button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
        aria-label="Format Italics">
        <TextItalic size={IconSize} />
      </Button>
      <Button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
        aria-label="Format Underline">
        <TextUnderline size={IconSize} />
      </Button>
      <Button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
        }}
        className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
        aria-label="Format Code">
        <BracketsAngle size={IconSize} />
      </Button>
      <Dropdown openIcon={<ButtonIcon>Aa <CaretDown size={IconSize}/></ButtonIcon>} closeIcon={<ButtonIcon>Aa <CaretDown size={IconSize}/></ButtonIcon>}>
        <ul className=" flex flex-col gap-2 bg-secondary-bg items-center rounded-md border border-primary-text">
          <li className={`flex items-center justify-between w-full px-2 ${isStrikethrough ? 'bg-primary-bg' : ''} rounded-t-md`}>
            <Button
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
              }}
              className={'toolbar-item spaced flex gap-4 '}
              aria-label="Format Strikethrough">
              <TextStrikethrough size={IconSize}/>
              <ButtonText>Strikethrough</ButtonText>
            </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2 ${isSubscript ? 'bg-primary-bg' : ''} rounded-t-md`}>
            <Button
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
              }}
              className={'toolbar-item spaced flex gap-4 '}
              aria-label="Format Subscript">
              <TextSubscript size={IconSize}/>
              <ButtonText>Subscript</ButtonText>
            </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2 ${isSuperscript ? 'bg-primary-bg' : ''} rounded-t-md`}>
            <Button
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
              }}
              className={'toolbar-item spaced flex gap-4'}
              aria-label="Format Superscript">
              <TextSuperscript size={IconSize}/>
              <ButtonText>Superscript</ButtonText>
            </Button>
          </li>
        </ul>
      </Dropdown>
      <Divider />
      <Dropdown openIcon={<ButtonIcon><Plus /><ButtonText>Insert</ButtonText><CaretDown size={IconSize}/></ButtonIcon>} closeIcon={<ButtonIcon><Plus /><ButtonText>Insert</ButtonText><CaretDown size={IconSize}/></ButtonIcon>}>
        <ul className=" flex flex-col gap-2 bg-secondary-bg items-center rounded-md border border-primary-text">
          <li className={`flex items-center justify-between w-full px-2 ${icons.justifyIdx === 0 ? 'bg-primary-bg' : ''} rounded-t-md`}>
            <Button
              onClick={() => {
                dispatch(showModal());
                setModalMode('image-upload');
                setImageListPage(0);
              }}
              className="toolbar-item spaced flex gap-4"
              aria-label="Image Insert">
              <Image size={IconSize}/>
              <ButtonText>Image</ButtonText>
            </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2`}>
              <Button
                onClick={() => {
                  const url = prompt("Enter the URL of the YouTube video:", "");
                  editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, fillUrl(url || ''));
                  setIcons(prev => ({...prev, justify: <CenterAlign />, justifyIdx: 1}))
                }}
                className="toolbar-item spaced flex gap-4"
                aria-label="Youtube Video">
                <YoutubeLogo size={IconSize}/>
                <ButtonText>Youtube Video</ButtonText>
              </Button>
          </li>
        </ul>
      </Dropdown>
      <Divider />
      <Dropdown openIcon={icons.justify} closeIcon={icons.justify}>
        <ul className=" flex flex-col gap-2 bg-secondary-bg items-center rounded-md border border-primary-text">
          <li className={`flex items-center justify-between w-full px-2 ${icons.justifyIdx === 0 ? 'bg-primary-bg' : ''} rounded-t-md`}>
            <Button
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
                setIcons(prev => ({...prev, justify: <LeftAlign />, justifyIdx: 0}))
              }}
              className="toolbar-item spaced flex gap-4"
              aria-label="Left Align">
              <TextAlignLeft size={IconSize}/>
              <ButtonText>Left Align</ButtonText>
            </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2 ${icons.justifyIdx === 1 ? 'bg-primary-bg' : ''}`}>
              <Button
                onClick={() => {
                  editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
                  setIcons(prev => ({...prev, justify: <CenterAlign />, justifyIdx: 1}))
                }}
                className="toolbar-item spaced flex gap-4"
                aria-label="Center Align">
                <TextAlignCenter size={IconSize}/>
                <ButtonText>Center Align</ButtonText>
              </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2 ${icons.justifyIdx === 2 ? 'bg-primary-bg' : ''}`}>
              <Button
                onClick={() => {
                  editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
                  setIcons(prev => ({...prev, justify: <RightAlign />, justifyIdx: 2}))
                }}
                className="toolbar-item spaced flex gap-4"
                aria-label="Right Align">
                <TextAlignRight size={IconSize}/>
                <ButtonText>Right Align</ButtonText>
              </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2 ${icons.justifyIdx === 3 ? 'bg-primary-bg' : ''} rounded-b-md`}>
            <Button
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
                setIcons(prev => ({...prev, justify: <JustifyAlign />, justifyIdx: 3}))
              }}
              className="toolbar-item flex gap-4"
              aria-label="Justify Align">
              <TextAlignJustify size={IconSize}/>
              <ButtonText>Justify Align</ButtonText>
            </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2 ${icons.justifyIdx === 4 ? 'bg-primary-bg' : ''} rounded-b-md`}>
            <Button
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'start');
                setIcons(prev => ({...prev, justify: <JustifyAlign />, justifyIdx: 4}))
              }}
              className="toolbar-item flex gap-4"
              aria-label="Justify Align">
              <TextAlignJustify size={IconSize}/>
              <ButtonText>Start Align</ButtonText>
            </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2 ${icons.justifyIdx === 5 ? 'bg-primary-bg' : ''} rounded-b-md`}>
            <Button
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'end');
                setIcons(prev => ({...prev, justify: <JustifyAlign />, justifyIdx: 5}))
              }}
              className="toolbar-item flex gap-4"
              aria-label="Justify Align">
              <TextAlignJustify size={IconSize}/>
              <ButtonText>End Align</ButtonText>
            </Button>
          </li>
          <hr className='border-b-[1px] border-black w-[90%]'/>
          <li className={`flex items-center justify-between w-full px-2 rounded-b-md`}>
            <Button
              onClick={() => {
                editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
              }}
              className="toolbar-item flex gap-4"
              aria-label="Justify Align">
              <TextOutdent size={IconSize}/>
              <ButtonText>Outdent</ButtonText>
            </Button>
          </li>
          <li className={`flex items-center justify-between w-full px-2 rounded-b-md`}>
            <Button
              onClick={() => {
                editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
              }}
              className="toolbar-item flex gap-4"
              aria-label="Justify Align">
              <TextIndent size={IconSize}/>
              <ButtonText>Indent</ButtonText>
            </Button>
          </li>
        </ul>
      </Dropdown>
      <Modal>
        {
          modalMode === 'image-upload' ? (
            <div className='fixed top-0 left-0 justify-center items-center flex w-screen h-screen px-4'>
              <div className='max-w-screen-lg w-full bg-primary-bg p-4 flex flex-col gap-2 '>
                <div className='flex justify-between items-center'>
                  <span className='text-lg'>Insert Image</span>
                  <Button className='group relative p-2' onClick={closeModalOnClick}>
                    <X size={IconSize}/>
                    <div className='absolute w-full h-full bg-black top-0 left-0 opacity-0 group-hover:opacity-[0.2] transition-all rounded-full'></div>
                  </Button>
                </div>
                <hr className='border-b-[1px] border-black w-full'/>
                <Button onClick={async () => {
                  setModalMode('image-list');
                  setImageListPage(0);

                  setImageFetch(true);
                  const res = await fetch("/api/blog-images");
                  setImageFetch(false);

                  const parsed = await res.json();

                  if(!res.ok) {
                    hideModal();
                    showError("Error loading files!");
                    setTimeout(() => hideError(), POPUPTIME);
                    return;
                  }

                  setImageList(parsed.body);
                }} className={`w-[100%] bg-[#ffb762] border-[1px] border-primary-text text-primary-text py-2 rounded-md text-sm font-semibold`}>
                  <span>Uploaded Images</span>
                </Button>
                <Dropdown className='w-full' closeOnClick={false} openIcon={<UrlButton />} closeIcon={<UrlButton />}>
                  <div className='p-2 flex flex-col gap-2 items-center'>
                    <input ref={urlRef} className="w-[100%] text-sm px-4 py-2 border-[2px] rounded-md border-[#ffcd92]" type="text" name="url" placeholder="URLを入力" id="url" />
                    <div className='flex gap-2'>
                      <input ref={imageAltRef} className="w-[100%] text-sm px-4 py-2 border-[2px] rounded-md border-[#ffcd92]" type="text" name="url" placeholder="Image Altを入力" id="url" />
                      <Button onClick={uploadFileUrl} className='p-2 relative group'>
                        {!imageUpload ? <Plus size={IconSize}/> : <CircleNotch rotate={0}/>}
                        <div className='w-full h-full bg-black absolute top-0 left-0 rounded-full opacity-0 group-hover:opacity-[0.2] transition-all'></div>
                      </Button>
                    </div>
                  </div>
                </Dropdown>
                <Dropdown className='w-full' closeOnClick={false} openIcon={<FileButton />} closeIcon={<FileButton />}>
                  <div className='p-2 flex gap-2 items-center'>
                    <Button aria-label='file' name="file" >
                      <label htmlFor="file">
                        <input onChange={uploadPreviewFile} ref={imageFileRef} type="file" hidden name="file" id="file" />
                        <span className={`w-[100%] bg-[#ffb762] border-[1px] border-primary-text text-primary-text px-4 py-2 rounded-md text-sm font-semibold`}>{fileName}</span>
                      </label>
                    </Button>
                    
                    <Button onClick={uploadFile} className='p-2 relative group'>
                      {!imageUpload ? <Plus size={IconSize}/> : <CircleNotch rotate={0}/>}
                      <div className='w-full h-full bg-black absolute top-0 left-0 rounded-full opacity-0 group-hover:opacity-[0.2] transition-all'></div>
                    </Button>
                  </div>
                </Dropdown>
              </div>
            </div>
          ) : (
            <div className='fixed top-0 left-0 justify-center items-center flex w-full h-full'>
              <div className='bg-primary-bg p-4 max-w-screen-lg w-full flex flex-col gap-2'>
                <div className='flex justify-between items-center'>
                  <span className='text-lg'>Uploaded Images</span>
                  <Button className='group relative p-2' onClick={closeModalOnClick}>
                    <X size={IconSize}/>
                    <div className='absolute w-full h-full bg-black top-0 left-0 opacity-0 group-hover:opacity-[0.2] transition-all rounded-full'></div>
                  </Button>
                </div>
                <hr className='border-b-[1px] border-black w-full'/>
                <div>
                  {
                    imageFetch ? (
                      <div className='w-full mx-auto'>
                        <CircleNotch className='animate-spin'/>
                      </div>
                    ) : 
                    <div>
                      {
                        imageList.length > 0 ? (
                          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                            {
                              imageList.map( (i, idx) => {
                                return <Button onClick={insertImageFromList} name={i.blog_image_title} id={i.blog_image_url} className=''>
                                  <OptImage className='w-full' fit='cover' width={250} height={250} centered resize square src={i.blog_image_url}/>
                                </Button>
                              })
                            }
                          </div>
                        ) : (
                          <span>Empty Files</span>
                        )
                      }
                    </div>
                  }
                </div>
              </div>
            </div>
          )
        }
      </Modal>
    </div>
  );
}
