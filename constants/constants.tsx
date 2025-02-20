import Button from "@/app/components/Button";
import { memo } from "react";

export const ERR_MSG = {
  ERR1: "ユーザーが見つかりません。", // User not found!
  ERR2: "メールアドレスまたはパスワードを入力してください。", //Please input email or password!
  ERR3: "ユーザーIDが未定義です。", // User id is undefined!
  ERR4: "ユーザーの詳細が見つかりません。", // User details not found!
  ERR5: "電子メールは空です。", // Email is empty!
  ERR6: "ユーザーはすでに存在します!ログインしてください。", // User already exist! Please log in
  ERR7: "メールアドレスとパスワードを入力してください。", // please input email and password
  ERR8: "メールアドレスまたはパスワードが空です。", // email or password is empty
  ERR9: "パスワードが間違っています。", // Password is incorrect
  ERR10: "ログインしてください。", // Please log in
  ERR11: "フォームデータが存在しません。", // form data does not exist
  ERR12: "Google ID が未定義です。", // google id is not defined
  ERR13: "Google ユーザーが見つかりません。 Googleに登録してください。", // Google User not found! Please sign up with google
  ERR14: "タイトルを入力してください。", // Please input title
  ERR15: "内容を入力してください。", //Please input description
  ERR16: "画像を挿入してください。", //Please input picture
  ERR17: "作り方を記入してください。", //Please input instruction
  ERR18: "分量を記入してください。", //Please input ingredient amount
  ERR19: "材料を記入してください。", //Please input ingredient material
  ERR20: "パスワードを入力してください。", //Please input password
  ERR21: "特殊文字は使用できません。", // Special Characters are not allowed
  ERR22: "パスワードは8文字以上である必要があります。", // Password must have at least 8 characters
  ERR23: "レシピを評価してください！", // Please rate the recipe!
  ERR24: "コメントを入力してください！", // Please input a comment!
  ERR25: "レシピIDを入力してください。", // Please input recipe id
  ERR26: "ページ番号を入力してください。", // Please input page number
  ERR27: "評価データの取得に失敗しました。", // Failed to retrieve rating data!
  ERR28: "名前を入力してください", // Please input pet name!
  ERR29: "犬種を入力してください", // Please input pet breed!
  ERR30: "誕生日を入力してください", // Please input pet birthdate
  ERR31: "画像を選択してください", // Please input pet picture
  ERR32: "登録に失敗しました。もう一度やり直してください。", //Registration failed.Please try again.
  ERR33: "画像のアップロードに失敗しました", // Failed Image Upload!
};

export const SUCC_MSG = {
  SUCCESS1: "完了しました", // Completed
};

export const fontSize = {
  l0: "0.25em", // 1/4 16px
  l1: "0.5em", // 1/2 16px
  l2: "0.75em", // 3/4 16px
  l3: "1em", // 1 16px
  l4: "1.25em", // 1.25 16px
  l5: "1.5em", // 1.5 16px
  l6: "1.75em", // 1.75 16px
  l7: "2em", // 2 16px
  l8: "2.25em", // 2.25 16px
  l9: "2.5em", // 2.5 16px
  l10: "2.75em", // 2.75 16px
  l11: "3em", // 3 16px
};

export const lgScreen = "768px";

export const textColor = {
  error: "#E53935",
  success: "#8dc225",
  warning: "#fecb37",
};

export const getExpireDate = () => {
  // 10 minutes (last number is minutes)
  return new Date(Date.now() + 60 * 1000 * 10);
};

export const validateEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const withSpecialCharacters = (string: string) => {
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return format.test(string);
};

export const withSpecialCharactersAndNumbers = (string: string) => {
  const fo = /[!@#$%^&*()\-_=+{};:,<.>'"0-9\[\]\/~`?_-]/;
  return fo.test(string);
};

export const withAlphabetical = (string: string) => {
  const fo = /[a-zA-Z]/;
  return fo.test(string);
};

export const sm = (size: number) => size <= 640;
export const md = (size: number) => size <= 768 && size > 640;
export const lg = (size: number) => size <= 1024 && size > 768;
export const xl = (size: number) => size <= 1280 && size > 1024;
export const xl2 = (size: number) => size <= 1536 && size > 1280;

export const defineScreenMode = () => {
  return sm(window.innerWidth)
    ? 0
    : md(window.innerWidth)
    ? 1
    : lg(window.innerWidth)
    ? 2
    : xl(window.innerWidth)
    ? 3
    : xl2(window.innerWidth)
    ? 4
    : -1;
};

export const imageFileTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "heic",
  "heif",
];

export const POPUPTIME = 5000;

export const modalIds = {
  toolbarpluginModal: "toolbar-plugin-modal",
  editorModal: "editor-modal",
  recipeoptionsModal: "recipe-options-modal",
};

export const content =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

export const URL_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

export const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

export const FileButton = memo(() => (
  <Button
    className={`w-[100%] bg-[#ffb762] border-[1px] border-primary-text text-primary-text px-32 py-2 rounded-md text-sm font-semibold`}
  >
    <span>File</span>
  </Button>
));

export const REGICONSIZE = 20;
