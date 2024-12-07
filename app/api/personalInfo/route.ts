import { registerUserDetails } from "@/action/users";
import { NextRequest, NextResponse } from "next/server";

export const POST = async ( req:NextRequest) => {
    
    try {
        const reqInput = await req.formData();

        await registerUserDetails(reqInput);

        const response = NextResponse.redirect(process.env.BASE_URL + "/signup/finish", {status: 302});
        return response;
    } catch(e) {

        let _e = (e as Error).message;
        throw _e;
    }
}