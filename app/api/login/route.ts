import { encrypt } from "@/action/lib";
import { getUser } from "@/action/users";
import { getExpireDate } from "@/constants/constants";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async ( req: Request) => {

    try {
        const reqMessage = await req.json();
        const {email, password} = reqMessage;

        const user = await getUser(email, password)
                            .catch(error => {throw new Error(error)});

        if(!user) throw new Error("User not found!");

        const response = NextResponse.redirect(new URL("/", req.url), {status: 302});

        const expires = getExpireDate();
        const session = await encrypt({user, expires});

        response.cookies.set('session', session, {
            path: '/',
            httpOnly: true, 
            expires
        })

        return response;
    } catch(_e) {

        let message = (_e as Error).message;
        return NextResponse.json({
            message: message,
        }, {
            status: 500
        })
    }
}