import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest) => {
  try {
    const b = await req.json();
    console.log(b);

    return NextResponse.json({message: 'Successful'}, {status: 200});
  } catch(e) {
    return NextResponse.json({message: 'Unsuccessful'}, {status: 500});
  }
}