import { storage } from "@/firebase.config";
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import {nanoid} from 'nanoid';
import sharp from 'sharp';

export async function uploadFile(file: File, folder: string) {
    try {
        const filename = nanoid();
        const tbRef = ref(storage,`${folder}/${filename}type_thumbnail.webp`);
        const xsRef = ref(storage,`${folder}/${filename}type_xs.webp`);
        const smRef = ref(storage,`${folder}/${filename}type_sm.webp`);
        const mdRef = ref(storage,`${folder}/${filename}type_md.webp`);
        const lgRef = ref(storage,`${folder}/${filename}type_lg.webp`);
        const origRef = ref(storage,`${folder}/${filename}type_or.webp`);

        
        const tb = await sharp(await file.arrayBuffer())
            .resize(150, null, { withoutEnlargement: true, fit: "inside"})
            .withMetadata()
            .toFormat('webp')
            .webp({quality: 80})
            .toBuffer();

        const xs = await sharp(await file.arrayBuffer())
            .resize(20, null, { withoutEnlargement: true, fit: "inside"})
            .withMetadata()
            .toFormat('webp')
            .webp({quality: 80})
            .toBuffer();

        const sm = await sharp(await file.arrayBuffer())
            .resize(480, null, { withoutEnlargement: true, fit: "inside"})
            .withMetadata()
            .toFormat('webp')
            .webp({quality: 80})
            .toBuffer();

        const md = await sharp(await file.arrayBuffer())
            .resize(640, null, { withoutEnlargement: true, fit: "inside"})
            .withMetadata()
            .toFormat('webp')
            .webp({quality: 80})
            .toBuffer();

        const lg = await sharp(await file.arrayBuffer())
            .resize(768, null, { withoutEnlargement: true, fit: "inside"})
            .withMetadata()
            .toFormat('webp')
            .webp({quality: 80})
            .toBuffer();

        const or = await sharp(await file.arrayBuffer())
            .resize(1024, null, { withoutEnlargement: true, fit: "inside"})
            .withMetadata()
            .toFormat('webp')
            .webp({quality: 80})
            .toBuffer();
        const metadata = {
            contentType: 'image/webp'
        }

        await uploadBytes(tbRef, tb, metadata);  
        await uploadBytes(xsRef, xs, metadata);
        await uploadBytes(smRef, sm, metadata);
        await uploadBytes(mdRef, md, metadata);
        await uploadBytes(lgRef, lg, metadata);
        const res = await uploadBytes(origRef, or, metadata);
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

export const deleteFile = async (downloadUrl: string) => {
    try {
        const fileRef = ref(
            storage,
            downloadUrl
        );

        await deleteObject(fileRef).catch(err => { throw new Error((err as Error).message) });
        
    } catch(e) {

    }
}