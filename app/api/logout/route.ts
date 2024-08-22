import { NextRequest, NextResponse } from "next/server";

export const  GET = async (req: NextRequest) => {

    if(req.cookies.get('session')) req.cookies.delete('session');
    if(req.cookies.get('registrationInfo')) req.cookies.delete('registrationInfo');

    const response = NextResponse.redirect(new URL("/login", req.url), {status: 302});

    response.cookies.set('session', '', {expires: new Date(0)});
    
    return response;
}