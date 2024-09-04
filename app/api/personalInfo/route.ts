import { deleteFilesinFolder, getFile, uploadFile } from "@/action/file-lib";
import { decrypt, getDecryptedSession, padStartIds } from "@/action/lib";
import { registerUserDetails } from "@/action/users";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async ( req:NextRequest) => {
    
    try {
        const reqInput = await req.formData();
        const decryptedSession = await getDecryptedSession();
        const folderName = `${padStartIds(decryptedSession.user.user_id)}/profile`;
        const file = reqInput.get('file');

        if(file instanceof File) {
            // await deleteFilesinFolder(folderName);
            const url = await uploadFile(file, folderName);
            reqInput.append('fileUrl', url);

        } else {
            reqInput.append('fileUrl', '');
        }

        await registerUserDetails(reqInput);

        const response = NextResponse.redirect(new URL("/signup/finish", req.url), {status: 302});
        return response;
    } catch(e) {

        let _e = (e as Error).message;
        throw _e;
    }
}