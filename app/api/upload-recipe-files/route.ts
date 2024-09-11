import { uploadRecipeFiles } from "@/action/files";
import { getDecryptedSession, padStartIds } from "@/action/lib";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const reqMsg = await req.formData();
        const recipe_id = reqMsg.get('recipe_id') as string;
        const decryptedSession = await getDecryptedSession();
        const folderName = `${padStartIds(decryptedSession.user.user_id)}/recipes/${padStartIds(recipe_id)}`;
        const fileArr = reqMsg.getAll('files[]') as FormDataEntryValue[] | null;
        if(fileArr === null) throw new Error("No files!");

        if(fileArr != undefined) {
            let arr2Send = Array.isArray(fileArr) ? [...fileArr] : [fileArr];
            const newarr = arr2Send.filter(file => file instanceof File);
            const status = await uploadRecipeFiles(newarr as File[], Number(recipe_id), folderName);
            
            if(status !== true) throw new Error("Error uploading files!");
        }

        return NextResponse.json({message: 'Success!', body: {}}, {status: 200});
    } catch(e) {
        let _e = (e as Error).message;
        return NextResponse.json({message: _e, body: {}}, {status: 500});
    }
}