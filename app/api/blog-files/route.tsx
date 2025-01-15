import { uploadBlogImage } from "@/action/blog";
import { s3UploadFile } from "@/action/file-lib";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const reqInput = await req.formData();
    const file = reqInput.get('file');
    console.log(file);
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
    return NextResponse.json({message: '完了', body: {fileUrl: 'url'}}, {status: 400});
  }
}