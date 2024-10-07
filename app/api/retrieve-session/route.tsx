import { SUCC_MSG } from "@/constants/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const session = req.cookies.get("session");

    return NextResponse.json({
        message: SUCC_MSG.SUCCESS1,
        body: session ? session : ''
    }, {status: 200});
}