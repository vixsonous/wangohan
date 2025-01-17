import { encrypt } from "@/action/lib";
import { registerSocketUser } from "@/action/socket";
import { getUser } from "@/action/users";
import { getExpireDate } from "@/constants/constants";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async ( req: NextRequest) => {

    try {
        const reqMessage = await req.json();
        const {email, password} = reqMessage;
        const user = await getUser(email, password)
                            .catch(error => {throw new Error(error)});
        if(!user) throw new Error("User not found!");

        const response = NextResponse.redirect(process.env.BASE_URL + "/", {status: 302});
        const expires = getExpireDate();
        const session = await encrypt({user, expires});
        registerSocketUser(user.user_id);
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