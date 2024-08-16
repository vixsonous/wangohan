import { encrypt } from "@/action/lib";
import { checkIfUserNotExist } from "@/action/users";
import { ERR_MSG } from "@/constants/constants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    const {email, password} = await req.json();

    if(!email || !password) throw new Error(ERR_MSG['ERR7']);

    try{
        const isNotFound = await checkIfUserNotExist(email);

        if(isNotFound) {

        }

        const response = NextResponse.redirect(new URL("/signup/personal-info", req.url), {status: 302});
        const expires = new Date(Date.now() + 10 * 1000);
        const session = await encrypt({email, expires});

        response.cookies.set('session', session, {
            path: '/',
            httpOnly: true,
            expires
        });
        
        return response;
    } catch(e) {
        let _e = (e as Error).message;
        throw _e;
    }
}