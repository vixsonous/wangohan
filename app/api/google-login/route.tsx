import { encrypt } from "@/action/lib";
import { registerSocketUser } from "@/action/socket";
import { findGoogleUser, getUserDetails } from "@/action/users";
import { ERR_MSG, getExpireDate } from "@/constants/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();

        const { google_id } = reqBody;
        const user_id = await findGoogleUser(google_id);

        if(user_id === -1) throw new Error(ERR_MSG["ERR13"]);

        const user = {user_id: user_id};
        const expires = getExpireDate();
        const session = await encrypt({user, expires});

        const response = NextResponse.redirect(new URL("/", process.env.BASE_URL), {status: 302});
        registerSocketUser(user_id);
        response.cookies.set('session', session, {
            path: '/',
            httpOnly: true, 
            expires
        })

        return response;
    } catch(e) {
        let _e = (e as Error).message;
        
        return NextResponse.json({message: _e, body: {}}, {status: 500});
    }
}