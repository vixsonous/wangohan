import { getNextId } from "@/action/common";
import { s3DeleteFilesInFolder } from "@/action/file-lib";
import { padStartIds } from "@/action/common";
import { updatePetPic, uploadPetPic } from "@/action/pet";
import { getUserId } from "@/action/users";
import { ERR_MSG, SUCC_MSG } from "@/constants/constants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    try {

        const body = await req.formData();

        const petPic = body.get("petPic") as File;
        const petId = await getNextId("pets_table", "pet_id");

        if(!petId) throw new Error(ERR_MSG.ERR32);
        if(!petPic) throw new Error(ERR_MSG.ERR31);

        const id = Number(petId);
        
        const uploadedPetPic = await uploadPetPic(petPic, Number(id));

        return NextResponse.json({message: SUCC_MSG.SUCCESS1, body: {uploadedPetPic: uploadedPetPic}}, {status: 200});
    } catch(e) {

        return NextResponse.json({message: (e as Error).message, body: undefined}, {status: 500});
    }
}

export const PATCH = async (req: NextRequest) => {
    try {

        const body = await req.formData();

        const petPic = body.get("petPic") as File;
        const petId = body.get("petId") as string;

        if(!petPic) throw new Error(ERR_MSG.ERR31);
        
        const user_id = await getUserId();
        const folder = `${padStartIds(user_id)}/pets/${petId}`;

        await s3DeleteFilesInFolder(folder);
        const uploadedPetPic = await uploadPetPic(petPic, Number(petId));

        const updated_pet = await updatePetPic(uploadedPetPic, Number(petId));

        return NextResponse.json({message: SUCC_MSG.SUCCESS1, body: updated_pet}, {status: 200});
    } catch(e) {

        return NextResponse.json({message: (e as Error).message, body: undefined}, {status: 500});
    }
}