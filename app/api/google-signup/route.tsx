import { encrypt } from "@/action/lib";
import { findGoogleUser, registerGoogleUser } from "@/action/users";
import { ERR_MSG, getExpireDate } from "@/constants/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST( req: NextRequest) {

    try {

        const reqJson = await req.json();
        const user_id = await findGoogleUser(reqJson.id);

        if(user_id !== -1) throw new Error(ERR_MSG["ERR6"]);

        const user = await registerGoogleUser(reqJson.email, reqJson.id);

        const response = NextResponse.redirect(new URL("/signup/personal-info", req.url), {status: 302});
        
        const expires = getExpireDate();
        const session = await encrypt({user, expires});

        response.cookies.set('session', session, {
            path: '/',
            httpOnly: true,
            expires
        });

        response.cookies.set('registrationInfo', JSON.stringify({fname: reqJson.given_name, lname: reqJson.family_name, user_image: reqJson.picture, codename: reqJson.name}), {
            path: '/',
            httpOnly: true,
            expires
        });

        return response;
    } catch(e) {
        let _e = (e as Error).message;
        return NextResponse.json({message: _e},{status: 500});
    }
    
}