import { updateProfilePic } from "@/action/files";
import { decrypt } from "@/action/lib";
import { ERR_MSG, SUCC_MSG } from "@/constants/constants";
import { db } from "@/lib/database/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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