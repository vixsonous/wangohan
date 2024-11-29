import { getExpireDate } from "@/constants/constants";
import { db } from "@/lib/database/db";
import { jwtVerify, SignJWT } from "jose";
import { sql } from "kysely";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.ACCESS_TOKEN_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('30 min from now')
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

export async function getDecryptedSession() {
    try {
        const docCookies = cookies();
        const session = docCookies.get('session')?.value;
        if(!session) throw new Error();
        const decryptedSession = await decrypt(session as string);

        return decryptedSession;
    } catch(e) {
        return undefined;
    }
}

export function logStart(action: string) {
    const start = performance.now();
    console.info("Action: " +action + " logging Start " + start);

    return start;
}

export function logEnd(start: number) {
    const end = performance.now();
    console.info("Logging End " + end);
    console.info(`Action took ${end - start} ms`);
    console.info("\n");
}