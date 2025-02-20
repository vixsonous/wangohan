import { cookies } from "next/headers";
import { decrypt } from "./lib";
import { logError, padStartIds } from "./common";
import { ERR_MSG } from "@/constants/constants";
import { db } from "@/lib/database/db";
import { deleteFile, s3DeleteFilesInFolder, s3UploadFile } from "./file-lib";

export const updateProfilePic = async (file: File) => {
  try {
    const docCookies = cookies();
    const session = docCookies.get("session");

    if (!session) throw new Error(ERR_MSG["ERR10"]);

    const decryptedCookies = await decrypt(session.value);
    const user_id = decryptedCookies.user.user_id;

    const folder = `${padStartIds(user_id)}/profile`;

    await s3DeleteFilesInFolder(folder);
    const uploadedProfilePicUrl = await s3UploadFile(file, folder);

    const res = await db
      .updateTable("user_details_table")
      .set({ user_image: uploadedProfilePicUrl })
      .where("user_details_table.user_id", "=", user_id)
      .returning(["user_image"])
      .executeTakeFirst();

    return res?.user_image;
  } catch (e) {
    let _e = (e as Error).message;
    console.log(_e);
    throw _e;
  }
};

export const uploadRecipeFiles = async (
  file: File,
  recipe_id: number,
  folder: string
) => {
  try {
    const docCookies = cookies();
    const session = docCookies.get("session");

    if (!session) throw new Error(ERR_MSG["ERR10"]);

    const uploadedRecipe = await s3UploadFile(file, folder);
    const image_id = await db
      .insertInto("recipe_images_table")
      .values({
        recipe_id: recipe_id,
        recipe_image: uploadedRecipe,
        recipe_image_subtext: "",
        recipe_image_title: file.name,
        updated_at: new Date(),
        created_at: new Date(),
      })
      .returning("recipe_image_id")
      .execute();

    if (!image_id) throw new Error(ERR_MSG["ERR33"]);

    console.log("[Success]:");
    return true;
  } catch (e) {
    let _e = (e as Error).message;
    logError("[Error]: " + _e);
    return false;
  }
};

export const deleteRecipeFiles = async (img_ids: Array<number>) => {
  try {
    const urls = await db
      .selectFrom("recipe_images_table")
      .select("recipe_image")
      .where("recipe_image_id", "in", img_ids)
      .execute();

    for (let i = 0; i < urls.length; i++) {
      await deleteFile(urls[i].recipe_image);
    }

    if (img_ids.length > 0) {
      await db
        .deleteFrom("recipe_images_table")
        .where("recipe_image_id", "in", img_ids)
        .execute();
    }
  } catch (e) {
    let _e = (e as Error).message;
    throw _e;
  }
};
