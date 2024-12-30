import { useAppDispatch } from "@/lib/redux/hooks";
import { hideSuccess, showSuccess } from "@/lib/redux/states/messageSlice";
import { POPUPTIME } from "./constants";
import { RefObject, useCallback, useEffect } from "react";

export const compressImage = async ( file:File, { quality = 1, type = file.type}:{quality:number, type: string}) => {
    try {
        const imageBitmap = await createImageBitmap(file);

        const canvas = document.createElement("canvas");
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        
        const ctx = canvas.getContext("2d");
        
        if(ctx) {
            ctx.drawImage(imageBitmap, 0, 0);
            const blob = await new Promise(resolve => canvas.toBlob(resolve, type, quality));

            if(blob) {
                return {message: 'Successful compression!', file: new File([blob as BlobPart], file.name, {type: type}), status: 200};
            } else {
                throw new Error("Blob creation failed!");
            }
        } else {
            throw new Error("Blob creation failed!");
        }
    } catch(e) {
        return {message: 'Unsuccessful compression!', file: file, status: 500};
    }
}

export const initOutsideClose = (settings: RefObject<HTMLDivElement>, btn: RefObject<HTMLButtonElement>, openFunc: Function) => {
  function outsideClick(e:MouseEvent) {
    if(settings.current && btn.current && !btn.current.contains(e.target as Node)  && !settings.current.contains(e.target as Node)) 
      openFunc();
  }

  document.addEventListener("click", outsideClick);
}

export const fileToArrayBuffer = async (file: File):Promise<ArrayBuffer> => {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = (err) => reject(err);

    reader.readAsArrayBuffer(file);
  })
}

export function doScrolling(id: string, duration: number) { 
  const el = document.querySelector(id);
  if(!el) return;
  const elementY = (el.getBoundingClientRect().top - document.body.getBoundingClientRect().top) - 65;
  let startingY = window.scrollY;
  let diff = elementY - startingY;
  let start = 0;

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (start === 0) start = timestamp;
    // Elapsed milliseconds since start of scrolling.
    var time = timestamp - start;
    
    // Get percent of completion in range [0, 1].
    var percent = Math.min(time / duration, 1);

    window.scrollTo(0, startingY + diff * percent);

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  })
}