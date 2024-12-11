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

    if(!result) throw new Error('There was an error uploading notifications!');

    return NextResponse.json({message: 'Success!'}, {status: 200});
  } catch(e) {
    console.error("[Error]: " + (e as Error).message);
    return NextResponse.json({message: (e as Error).message}, {status: 500});
  }
}

export const PATCH = async (req: NextRequest) => {
  try {
    const dt:Array<string> = await req.json();

    const res = await Promise.all(dt.map(async d => {
      const {
        user_id,
        notification_content,
        updated_at,
        created_at,
        is_read,
        type,
        recipe_owner_id,
        liked,
        recipe_id,
        recipe_image,
      } = JSON.parse(d);

      const res = await uploadNotifications(
        user_id,
        recipe_owner_id,
        notification_content,
        is_read,
        liked,
        recipe_id,
        recipe_image,
        type
      )

      return res;
    }));

    console.log(res);

    return NextResponse.json({message: 'Success!'}, {status: 200});
  } catch(e) {

    return NextResponse.json({message: 'There was an error updating the notification!'});
  }
}