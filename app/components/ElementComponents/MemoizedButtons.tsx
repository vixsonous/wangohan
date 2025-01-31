import { memo } from "react";
import Button from "../Button";
import {
  CaretDown,
  Paragraph,
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
  TextHOne,
  TextHThree,
  TextHTwo,
} from "@phosphor-icons/react/dist/ssr";
import { REGICONSIZE } from "@/constants/constants";

export const ButtonText = memo(function ButtonText({
  children,
}: {
  children: React.ReactNode;
}) {
  return <span className="text-sm tracking-tighter">{children}</span>;
});

export const ButtonIcon = memo(function ButtonIcon({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Button className="toolbar-item flex gap-4">{children}</Button>;
});

export const LeftAlign = memo(() => (
  <ButtonIcon>
    <TextAlignLeft size={REGICONSIZE} />
    <ButtonText>Left Align</ButtonText>
    <CaretDown size={REGICONSIZE} />
  </ButtonIcon>
));
export const RightAlign = memo(() => (
  <ButtonIcon>
    <TextAlignRight size={REGICONSIZE} />
    <ButtonText>Right Align</ButtonText>
    <CaretDown size={REGICONSIZE} />
  </ButtonIcon>
));
export const CenterAlign = memo(() => (
  <ButtonIcon>
    <TextAlignCenter size={REGICONSIZE} />
    <ButtonText>Center Align</ButtonText>
    <CaretDown size={REGICONSIZE} />
  </ButtonIcon>
));
export const JustifyAlign = memo(() => (
  <ButtonIcon>
    <TextAlignJustify size={REGICONSIZE} />
    <ButtonText>Justify Align</ButtonText>
    <CaretDown size={REGICONSIZE} />
  </ButtonIcon>
));

export const UrlButton = memo(() => (
  <Button
    className={`w-[100%] bg-[#ffb762] border-[1px] border-primary-text text-primary-text px-32 py-2 rounded-md text-sm font-semibold`}
  >
    <span>URL</span>
  </Button>
));
export const FileButton = memo(() => (
  <Button
    className={`w-[100%] bg-[#ffb762] border-[1px] border-primary-text text-primary-text px-32 py-2 rounded-md text-sm font-semibold`}
  >
    <span>File</span>
  </Button>
));

export const ParagraphButton = memo(() => (
  <ButtonIcon>
    <Paragraph size={REGICONSIZE} />
    <ButtonText>Paragraph</ButtonText>
  </ButtonIcon>
));
export const H1Button = memo(() => (
  <ButtonIcon>
    <TextHOne size={REGICONSIZE} />
    <ButtonText>H1</ButtonText>
  </ButtonIcon>
));
export const H2Button = memo(() => (
  <ButtonIcon>
    <TextHTwo size={REGICONSIZE} />
    <ButtonText>H2</ButtonText>
  </ButtonIcon>
));
export const H3Button = memo(() => (
  <ButtonIcon>
    <TextHThree size={REGICONSIZE} />
    <ButtonText>H3</ButtonText>
  </ButtonIcon>
));

export const SansSerif = memo(() => (
  <ButtonIcon>
    <ButtonText>Sans Serif</ButtonText>
    <CaretDown size={REGICONSIZE} />
  </ButtonIcon>
));
export const Sans = memo(() => (
  <ButtonIcon>
    <ButtonText>Sans</ButtonText>
    <CaretDown size={REGICONSIZE} />
  </ButtonIcon>
));
export const Mitimasu = memo(() => (
  <ButtonIcon>
    <ButtonText>Mitimasu</ButtonText>
    <CaretDown size={REGICONSIZE} />
  </ButtonIcon>
));

export const FontSize = memo(({ size }: { size: string }) => (
  <ButtonIcon>
    <ButtonText>{size}</ButtonText>
    <CaretDown size={REGICONSIZE} />
  </ButtonIcon>
));
