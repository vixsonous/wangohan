import { storage } from "@/firebase.config";
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import {nanoid} from 'nanoid';

export async function uploadFile(file: File, folder: string) {
    try {
        const filename = nanoid();
        const storageRef = ref(
            storage,
            `${folder}/${filename}.${file.name.split(".").pop()}`
        );
        
        const res = await uploadBytes(storageRef, file);
        const downloadUrl = await getFile(res.metadata.fullPath);

        return downloadUrl;
        
    } catch(e) {
        let _e = (e as Error).message;
        throw _e;
    }
}

export async function getFile(path: string) {
    try {
        const fileRef = ref(
            storage,
            path
        );

        return await getDownloadURL(fileRef);
    } catch(e) {
        let _e = (e as Error).message;
        throw _e;
    }
}

export async function deleteFilesinFolder(path: string) {
    
    try {
        const fileRef = ref(
            storage,
            path
        );
    
        const allFiles = await listAll(fileRef);
    
        allFiles.items.forEach(async item => {
            const itemRef = ref(storage, item.fullPath);
            
            await deleteObject(itemRef).catch(err => { throw new Error((err as Error).message) });
        });
    } catch(e) {
        let _e = (e as Error).message;
        throw _e;
    }
}