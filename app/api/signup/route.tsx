import { encrypt } from "@/action/lib";
import { checkIfUserNotExist, registerUser } from "@/action/users";
import { ERR_MSG } from "@/constants/constants";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {

    const {email, password} = await req.json();

    if(!email || !password) throw new Error(ERR_MSG['ERR7']);

    try{
        const isNotFound = await checkIfUserNotExist(email);

        if(isNotFound) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const user = await registerUser(email, hash);

            const response = NextResponse.redirect(new URL("/signup/personal-info", req.url), {status: 302});
            const expires = new Date(Date.now() + 10 * 1000);
            const session = await encrypt({user, expires});

            response.cookies.set('session', session, {
                path: '/',
                httpOnly: true,
                expires
            });
            
            return response;
        } else {
            throw new Error(ERR_MSG['ERR6']);
        }
        
    } catch(e) {
        return NextResponse.json({message: e},{status: 500});
    }
}