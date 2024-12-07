import { uploadRecipeFiles } from "@/action/files";
import { getDecryptedSession } from "@/action/lib";
import { padStartIds } from "@/action/common";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const reqMsg = await req.formData();
        const recipe_id = reqMsg.get('recipe_id') as string;
        const decryptedSession = await getDecryptedSession();
        const folderName = `${padStartIds(decryptedSession.user.user_id)}/recipes/${padStartIds(recipe_id)}`;
        const file = reqMsg.get('file');

        if(file === null) throw new Error("No file!");

        if(file != undefined && file instanceof File) {
            const status = await uploadRecipeFiles(file, Number(recipe_id), folderName);
            
            if(status !== true) throw new Error("Error uploading files!");
        }

        console.log("[Success]: Uploaded");
        return NextResponse.json({message: '完了', body: {}}, {status: 200});
    } catch(e) {
      console.error("[Error]:" + e);
        let _e = (e as Error).message;
        return NextResponse.json({message: _e, body: {}}, {status: 500});
    }
}