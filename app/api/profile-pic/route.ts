import { uploadFile } from "@/action/file-lib";
import { getDecryptedSession } from "@/action/lib";
import { padStartIds } from "@/action/common";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const reqInput = await req.formData();
        const decryptedSession = await getDecryptedSession();
        const folderName = `${padStartIds(decryptedSession.user.user_id)}/profile`;
        const file = reqInput.get('file');

        if(file instanceof File) {
            const url = await uploadFile(file, folderName);
            reqInput.append('fileUrl', url);
            return NextResponse.json({message: '完了', body: {fileUrl: url}}, {status: 200});

        } else {
            reqInput.append('fileUrl', '');
            return NextResponse.json({message: 'There is no file!', body: {fileUrl: ''}}, {status: 200});
        }
        
    } catch(e) {
        let _e = (e as Error).message;
        return NextResponse.json({message: _e, body: {}}, {status: 500});
    }
}