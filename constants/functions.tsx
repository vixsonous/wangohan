import { useAppDispatch } from "@/lib/redux/hooks";
import { hideSuccess, showSuccess } from "@/lib/redux/states/messageSlice";
import { POPUPTIME } from "./constants";

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