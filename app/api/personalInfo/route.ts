import { registerUserDetails } from "@/action/users";
import { NextRequest, NextResponse } from "next/server";

export const POST = async ( req:NextRequest, res: NextResponse) => {
    
    try {
        const reqInput = await req.formData();

        const isOk = await registerUserDetails(reqInput);

        if(!isOk) throw new Error();
        
        const response = NextResponse.redirect(process.env.BASE_URL + "/signup/finish", {status: 302});
        return response;
    } catch(e) {

        return NextResponse.json({message: 'Failed to register user details!'}, {status: 500});
    }
}