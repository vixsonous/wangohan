import { db } from "@/lib/database/db";
import { get, insert, logError } from "./common";
import { BlogData } from "@/constants/interface";

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

export const updateBlogEditorState = async (
  editorState: JSON,
  blog_category: string,
  title: string,
  blog_id: number,
  blog_image?: string
): Promise<boolean> => {
  try {
    await db.updateTable("blog_columns_table")
      .set(eb => {
        const updateData: any = {
          editor_state: editorState,
          blog_category,
          title,
        }

        if(blog_image !== undefined && blog_image !== "") {
          updateData.blog_image = blog_image;
        }

        return updateData;
      })
      .where("blog_id","=", blog_id)
      .execute();

    return true;
  } catch (e) {
    logError((e as Error).message);
    return false;
  }
};

export const getBlogs = async (): Promise<BlogData[]> => {
  try {
    const data: BlogData[] = await get<"blog_columns_table", BlogData[]>(
      "blog_columns_table"
    ).findAll();
    return data || [];
  } catch (e) {
    return [];
  }
};
