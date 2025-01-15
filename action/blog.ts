import { db } from "@/lib/database/db"
import { logError } from "./common";

export const uploadBlogImage = async (url:string, fileName:string) => {
  try {
    await db.insertInto("blog_images_upload").values({
      blog_image_title: fileName,
      blog_image_url: url,
      updated_at: new Date(),
      created_at: new Date()
    }).execute();

    return true;
  } catch(e) {
    logError((e as Error).message);
    return false;
  }
} 