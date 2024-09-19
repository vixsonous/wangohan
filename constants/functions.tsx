import { cookies } from "next/headers";

export async function getSessionCookie() {
    const cookieData = cookies();
    const session = cookieData.get('session')?.value;

    return new Promise( resolve => {
        resolve(session);
    });
}