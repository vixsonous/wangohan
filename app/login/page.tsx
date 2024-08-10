import { Metadata } from "next"
import Image from "next/image"
import { Inter } from 'next/font/google'
import Link from "next/link"
import { SyntheticEvent } from "react"
import LoginForm from "./LoginForm"

export const metadata:Metadata = {
    title: "Login"
}

const inter = Inter({ subsets: ['latin'] })

export default function Login() {

    
    return (
        <div className={`flex flex-col px-[50px] py-[30px] gap-[10px] justify-center items-center ${inter.className}`}>
            <h1 className="font-bold text-[20px] sm:text-[24px]">ログイン</h1>
            <LoginForm />
            <div className="w-[100%] max-w-[100%] sm:max-w-[460px] mt-[30px] gap-[10px] flex flex-col justify-center">
                <button className={` flex justify-center items-center bg-[white] border-[2px] rounded-md border-[#ffcd92] text-[12px] sm:text-[16px] px-[10px] py-[10px] font-bold`}>
                    <svg width="15" height="15" viewBox="0 0 98 87" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <rect width="98" height="87" fill="url(#pattern0_50_454)"/>
                    <defs>
                    <pattern id="pattern0_50_454" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_50_454" transform="matrix(0.025641 0 0 0.028883 0 -0.135426)"/>
                    </pattern>
                    <image id="image0_50_454" width="39" height="44" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAsCAYAAADmZKH2AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJ6ADAAQAAAABAAAALAAAAABJ5PO5AAACpklEQVRYCe2Xv2oyQRDARzGgiIKg4h/sxIBBIT6AFooWBmzsLAQ7KyEvkFewCOQBApEUIikULEQQCwttLCVBEYyVgqAoKuy3K1zgLqe3u+cHKW6bdXb+/Zybm7vTIbzgjy79H+U6YWlwvFdHq5xWOZYKbDYbaDQaMBqNWNxEtv+l515eXsBut0M6nYbxeCxKyCSQIXzN1e12kU6nI4Md3dzcoOVyyR0euD1lHPf7PfL7/ScwApfL5WSs6I+uCvf+/v4D5nA40HQ6pSeRsbxqzw2HQ9Dr9ZBIJABfXvD5fEwtJjXWEWDpoZK83W7h9fUVvr+/IRgMQjQaBZfLBbi/wGAwgNFohH6/D4PB4HRGbB4eHsBkMimFFutlqnnxqFwuI5vN9nP5cLTT70wmg56enlCpVEIWi+WX3ul0omq1ejG2VMnUc4+Pj7+SCnC0+8fHh5ThrEwN12q1VIPhXkSHw+EsjFRBDRePx1XBeTwetFqtpPkvylRw6/Ua4UZXBff8/HwRRE5JNUo+Pz/heDyK7yRGKRKJMHoAUMGR0aF2eb1e5hBUcHh0MAeWOkwmE+mRokwF53a7FQMpGby9vSmZ/NbLNaLc2e3traobAmdG7XZbLvTZM6rKkb9EnpdqF36KQKVSoQ9zFlui6PV6qiuHqU4x8AuoJLq8SDXnBNdwOKwaMBaLCeEUdya4er2uGg5/VyhCCQZMcMQplUpxA+bzeSEv1c4MN5vNZF+ZhH46t9/f36PdbkcFJRgxwxHHTqeDrFarqIKhUAgVi0VUKBRQIBAQ6e7u7tB8PhdyUu9cb8JkFiwWC6jVaoC/sCCZTIJ0UH99fUGz2QSz2QzZbPa0Ez+WxQ3HkoTXlnoI8yZQ46fB8VZPq5xWOd4K8PppPadVjrcCvH7/AOROGv3hito5AAAAAElFTkSuQmCC"/>
                    </defs>
                    </svg>
                    Appleで続ける
                </button>
                <button className={`flex  justify-center items-center gap-[5px] bg-[white] border-[2px] rounded-md border-[#ffcd92] text-[12px] sm:text-[16px] px-[10px] py-[10px] font-bold`}>
                    <svg width="15" height="15" viewBox="0 0 67 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_50_449)">
                        <path d="M66.9643 32.2042C66.9643 29.6139 66.7364 27.7237 66.2431 25.7634H34.167V37.4548H52.9949C52.6155 40.3603 50.5656 44.7359 46.0104 47.6761L45.9465 48.0675L56.0884 55.3126L56.791 55.3773C63.2441 49.8815 66.9643 41.7954 66.9643 32.2042Z" fill="#4285F4"/>
                        <path d="M34.1673 63.0084C43.3914 63.0084 51.1351 60.2079 56.7913 55.3774L46.0106 47.6762C43.1258 49.5315 39.2538 50.8266 34.1673 50.8266C25.1329 50.8266 17.465 45.3311 14.7317 37.7351L14.331 37.7665L3.78537 45.2925L3.64746 45.646C9.26546 55.9373 20.8053 63.0084 34.1673 63.0084Z" fill="#34A853"/>
                        <path d="M14.7322 37.7353C14.011 35.775 13.5936 33.6746 13.5936 31.5044C13.5936 29.334 14.011 27.2338 14.6942 25.2736L14.6751 24.8561L3.99732 17.2092L3.64796 17.3625C1.33252 21.6331 0.00390625 26.4288 0.00390625 31.5044C0.00390625 36.5801 1.33252 41.3755 3.64796 45.6462L14.7322 37.7353Z" fill="#FBBC05"/>
                        <path d="M34.1673 12.1815C40.5824 12.1815 44.9097 14.7368 47.3772 16.8722L57.019 8.19106C51.0974 3.11542 43.3914 0 34.1673 0C20.8053 0 9.26546 7.07086 3.64746 17.3621L14.6937 25.2733C17.465 17.6773 25.1329 12.1815 34.1673 12.1815Z" fill="#EB4335"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_50_449">
                        <rect width="67" height="63.2254" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                    Googleで続ける
                </button>
                <h1 className="text-[8px] sm:text-[12px] font-bold text-right">新規登録（無料）は<Link className="text-[#007BFF]" href={'signup'}>こちら</Link></h1>
            </div>
        </div>
    )
}