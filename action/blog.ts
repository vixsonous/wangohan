import { db } from "@/lib/database/db";
import { get, insert, logError } from "./common";
import { BlogData, userDetails } from "@/constants/interface";

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

export const ADMIN_BLOG_NUMBER_PER_PAGE = 5;

export const getAdminBlogs = async (page: number): Promise<(BlogData & userDetails)[]> => {
  // console.log(ADMIN_BLOG_NUMBER_PER_PAGE * (page - 1));
  try {
    const data = await db.selectFrom("blog_columns_table")
      .innerJoin("user_details_table","blog_columns_table.user_id","user_details_table.user_id")
      .select(["blog_columns_table.blog_category", "blog_columns_table.blog_id","blog_columns_table.blog_image","blog_columns_table.title","blog_columns_table.created_at"
        ,"user_details_table.user_codename","user_details_table.user_first_name","user_details_table.user_last_name","user_image","user_details_table.user_detail_id",
        "blog_columns_table.editor_state","user_details_table.user_id"
      ])
      .offset(ADMIN_BLOG_NUMBER_PER_PAGE * (page - 1))
      .limit(ADMIN_BLOG_NUMBER_PER_PAGE)
      .orderBy("blog_columns_table.created_at desc")
      .execute()
    return data || [];
  } catch (e) {
    console.error(e);
    return [];
  }
};