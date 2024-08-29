import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const session = req.cookies.get("session");

    return NextResponse.json({
        message: 'Success!',
        body: session ? session : ''
    }, {status: 200});
}