import { uploadBlogImage } from "@/action/blog";
import { logError } from "@/action/common";
import { s3UploadFile } from "@/action/file-lib";
import { db } from "@/lib/database/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const reqInput = await req.formData();
    const file = reqInput.get('file');

    if(file instanceof File) {
      const folderName = 'blog-uploads';
      const fileName = file.name.split(".")[0];
        const url = await s3UploadFile(file, folderName, fileName);
        uploadBlogImage(url, fileName);
        return NextResponse.json({message: '完了', body: {fileUrl: url}}, {status: 200});
    } else {
        reqInput.append('fileUrl', '');
        return NextResponse.json({message: 'There is no file!', body: {fileUrl: ''}}, {status: 200});
    }
  } catch(e) {
    console.error(e);
    return NextResponse.json({message: (e as Error).message, body: {fileUrl: 'url'}}, {status: 400});
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const p = req.nextUrl.searchParams;
    console.log(p);
    const files = await db.selectFrom("blog_images_upload")
      .select(["blog_image_title", "blog_image_url"])
      .execute();

    return NextResponse.json({message: '完了', body: files}, {status: 200});
  } catch(e) {
    logError((e as Error).message);
    return NextResponse.json({message: (e as Error).message, body: []}, {status: 400});
  }
}