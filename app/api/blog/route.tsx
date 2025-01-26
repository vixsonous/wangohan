import { uploadBlogEditorState } from "@/action/blog";
import { get, logError, logSuccess, sendBasicResponse } from "@/action/common";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams;
    const blog_id: number = Number(params.get("blog_id"));

    const res = await get("blog_columns_table").findEqualOne(
      blog_id,
      "blog_id"
    );

    if (!res) throw new Error("No blog found!");

    logSuccess("Success getting blog!");
    return sendBasicResponse("Success!", res, 200);
  } catch (e) {
    const msg = (e as Error).message;
    logError(msg);
    return sendBasicResponse(msg, undefined, 500);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { user_id, blog_image, blog_category, editorState, title } =
      await req.json();

    const res = await uploadBlogEditorState(
      editorState,
      user_id,
      blog_category,
      title,
      blog_image
    );

    if (!res) throw new Error();

    logSuccess("Successfully uploaded blog!", "uploadBlogEditorState");
    return sendBasicResponse("Successfully uploaded blog!", undefined, 200);
  } catch (e) {
    logError("Unsuccessful uploading of blog!");
    return sendBasicResponse("Unsuccessful!", undefined, 200);
  }
};
