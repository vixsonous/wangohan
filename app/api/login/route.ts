import { getUser } from "@/action/users";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async ( req: Request) => {

    try {
        const reqMessage = await req.json();
        const cookieStore = cookies()
        const token = cookieStore.get('token')

        const referer = headers().get('referer');
        const {email, password} = reqMessage;

        const user = await getUser(email, password)
                            .catch(error => {throw new Error(error)});

        if(!user) throw new Error("User not found!");

        const response = NextResponse.redirect(new URL("/", req.url), {status: 302});

        response.cookies.set('currentUser', JSON.stringify(user), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 10
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