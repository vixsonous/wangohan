import { updateNotifications, uploadNotifications } from "@/action/users";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const fd = await req.json();
    const user_id = Number(fd.user_id);
    const recipe_owner_id = Number(fd.recipe_owner_id);
    const notification_content = fd.notification_content;
    const is_read = fd.is_read;
    const liked = fd.liked;
    const recipe_id = Number(fd.recipe_id);
    const recipe_image = fd.recipe_image;
    const type = fd.type;
    const inserted = fd.inserted;

    console.log(fd);
    
    if(inserted) {
      const result = await updateNotifications(
        user_id,
        recipe_owner_id,
        notification_content,
        is_read,
        liked,
        recipe_id,
        recipe_image,
        type
      );
    } else {
      console.log("asdasdsad");
      const result = await uploadNotifications(
        user_id,
        recipe_owner_id,
        notification_content,
        is_read,
        liked,
        recipe_id,
        recipe_image,
        type
      );
    }

    return NextResponse.json({message: 'Success!'}, {status: 200});
  } catch(e) {
    console.error("[Error]: " + (e as Error).message);
    return NextResponse.json({message: (e as Error).message}, {status: 500});
  }
}