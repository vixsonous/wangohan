import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
  console.log( await req.json());

  return NextResponse.json({message: 'Message Recieved'}, {status: 200});
}