import { getExpireDate } from "@/constants/constants";
import { jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.ACCESS_TOKEN_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('10 min from now')
        .sign(key)
}

export async function decrypt(input: string): Promise<any> {
    const {payload} = await jwtVerify(input, key, {algorithms: ['HS256']});

    return payload;
}

export async function updateSession(req: NextRequest) {
    const session = req.cookies.get('session')?.value;

    if(!session) return;

    const parsed = await decrypt(session);

    parsed.expires = getExpireDate();

    const res = NextResponse.next();

    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly:true,
        expires: parsed.expires
    });

    return res;
}