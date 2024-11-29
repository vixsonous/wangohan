import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export const POST = async (req:NextRequest, res: NextResponse) => {
  try {
    const username = "cjvicro@gmail.com";
    const password = "x0X09292535038X0x";
    const x = "cjvicro@gmail.com";

    const body = await req.json();

    console.log(body);

    return NextResponse.json({message: "Successful!", body: {}}, {status: 200});
  } catch(e) {
    return NextResponse.json({message: (e as Error).message, body: {}}, {status: 500});
  }
}