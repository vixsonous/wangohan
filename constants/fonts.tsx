import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({ subsets: ["latin"], display: 'swap', adjustFontFallback: false });
export const mitimasu = localFont({
  src: "../public/fonts/mitimasu.ttf",
  variable: '--mitimasu'
});