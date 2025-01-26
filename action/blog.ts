import { db } from "@/lib/database/db";
import { insert, logError } from "./common";

export const uploadBlogImage = async (url: string, fileName: string) => {
  try {
    await db
      .insertInto("blog_images_upload")
      .values({
        blog_image_title: fileName,
        blog_image_url: url,
        updated_at: new Date(),
        created_at: new Date(),
      })
      .execute();

    return true;
  } catch (e) {
    logError((e as Error).message);
    return false;
  }
};

export const uploadBlogEditorState = async (
  editorState: JSON,
  user_id: number,
  blog_category: string,
  title: string,
  blog_image: string
): Promise<boolean> => {
  try {
    await insert("blog_columns_table", {
      user_id: user_id,
      title: title,
      blog_image: blog_image,
      blog_category: blog_category,
      editor_state: editorState,
      updated_at: new Date(),
      created_at: new Date(),
    }).execute();

    return true;
  } catch (e) {
    logError((e as Error).message);
    return false;
  }
};
