import { s3UploadFile } from "@/action/file-lib";
import { decrypt, getDecryptedSession } from "@/action/lib";
import { padStartIds } from "@/action/common";
import { NextRequest, NextResponse } from "next/server";
import { ERR_MSG, SUCC_MSG } from "@/constants/constants";
import { db } from "@/lib/database/db";
import { cookies } from "next/headers";
import { updateProfilePic } from "@/action/files";

export async function POST(req: NextRequest) {
    try {
        const reqInput = await req.formData();
        const decryptedSession = await getDecryptedSession();
        const folderName = `${padStartIds(decryptedSession.user.user_id)}/profile`;
        const file = reqInput.get('file');

        if(file instanceof File) {
            const url = await s3UploadFile(file, folderName);
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

export const PATCH = async (req: NextRequest) => {

    try {
        const body = await req.formData();

        const codenm = body.get('codenm') as string;
        const profPic = body.get('profPic') as File;

        const docCookies = cookies();
        const session = docCookies.get('session');

        if(!session) throw new Error(ERR_MSG['ERR10']);

        if(profPic) {
            const prof = await updateProfilePic(profPic)
                .then( res => res).catch(err => {
                    throw new Error( (err as Error).message);
                });

            if(!prof) throw new Error("There was an error retrieving the ID!");
        }

        const decryptedCookies = await decrypt(session.value);
        const user_id = decryptedCookies.user.user_id;

        await db.updateTable("user_details_table").set({user_codename: codenm}).where("user_id","=",user_id).executeTakeFirstOrThrow();

        return NextResponse.json({message: SUCC_MSG.SUCCESS1}, {status: 200});
    } catch(e) {
        return NextResponse.json({message: (e as Error).message}, {status: 500});
    }
}