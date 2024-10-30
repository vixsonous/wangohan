import { storage } from "@/firebase.config";
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import {nanoid} from 'nanoid';
import sharp from 'sharp';
import {DeleteObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import { Upload } from "@aws-sdk/lib-storage";

const Bucket = process.env.AMPLIFY_BUCKET;
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
});

export async function s3UploadFile(file: File, folder: string) {
    try {
        const filename = nanoid();
        
        const tbPath = `${folder}/${filename}type_thumbnail.webp`
        const tb = await sharp(await file.arrayBuffer())
            .resize(150, null, { withoutEnlargement: true, fit: "inside"})
            .withMetadata()
            .toFormat('webp')
            .webp({quality: 80})
            .toBuffer();

        const xsPath = `${folder}/${filename}type_xs.webp`
        const xs = await sharp(await file.arrayBuffer())
            .resize(20, null, { withoutEnlargement: true, fit: "inside"})
            .withMetadata()
            .toFormat('webp')
            .webp({quality: 80})
            .toBuffer();

        const smPath = `${folder}/${filename}type_sm.webp`
        const sm = await sharp(await file.arrayBuffer())
            .resize(480, null, { withoutEnlargement: true, fit: "inside"})
            .withMetadata()
            .toFormat('webp')
            .webp({quality: 80})
            .toBuffer();

        const mdPath = `${folder}/${filename}type_md.webp`
        const md = await sharp(await file.arrayBuffer())
            .resize(640, null, { withoutEnlargement: true, fit: "inside"})
            .withMetadata()
            .toFormat('webp')
            .webp({quality: 80})
            .toBuffer();

        const lgPath = `${folder}/${filename}type_lg.webp`
        const lg = await sharp(await file.arrayBuffer())
            .resize(768, null, { withoutEnlargement: true, fit: "inside"})
            .withMetadata()
            .toFormat('webp')
            .webp({quality: 80})
            .toBuffer();

        const path = `${folder}/${filename}type_or.webp`
        const or = await sharp(await file.arrayBuffer())
            .resize(1024, null, { withoutEnlargement: true, fit: "inside"})
            .withMetadata()
            .toFormat('webp')
            .webp({quality: 80})
            .toBuffer();

        const metadata = {
            contentType: 'image/webp'
        }

        const parallelUploads = [
            new Upload({
                client: s3,
                params: {Bucket, Key: tbPath, Body: tb, ContentType: "image/webp"},
                leavePartsOnError: false
            }),
            new Upload({
                client: s3,
                params: {Bucket, Key: xsPath, Body: xs, ContentType: "image/webp"},
                leavePartsOnError: false
            }),
            new Upload({
                client: s3,
                params: {Bucket, Key: smPath, Body: sm, ContentType: "image/webp"},
                leavePartsOnError: false
            }),
            new Upload({
                client: s3,
                params: {Bucket, Key: mdPath, Body: md, ContentType: "image/webp"},
                leavePartsOnError: false
            }),
            new Upload({
                client: s3,
                params: {Bucket, Key: lgPath, Body: lg, ContentType: "image/webp"},
                leavePartsOnError: false
            }),
            new Upload({
                client: s3,
                params: {Bucket, Key: path, Body: or, ContentType: "image/webp"},
                leavePartsOnError: false
            }),
        ]
        
        const url = await Promise.all( [
            await parallelUploads[0].done(), 
            await parallelUploads[1].done(),
            await parallelUploads[2].done(), 
            await parallelUploads[3].done(),
            await parallelUploads[4].done(), 
            await parallelUploads[5].done(),
        ] ).then( res => {
            return res[5].Location;
        });

        return url || '';
        
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

export async function s3DeleteFilesInFolder(path: string) {
    
    try {
        const listParam = {
            Bucket: Bucket,
            Prefix: path
        }

        const listedObjects = await s3.send( new ListObjectsV2Command({
            Bucket,
            Prefix: path
        }));

        if(listedObjects.KeyCount && listedObjects.Contents && listedObjects.KeyCount > 0) {

            console.log(listedObjects.Contents);
            await Promise.all(listedObjects.Contents.map( async obj => {
                await s3.send(new DeleteObjectCommand({
                    Bucket: Bucket,
                    Key: obj.Key
                }));
            })).then( res => {
                console.log(res);
            });
        }
        
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