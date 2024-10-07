import { postPet, updatePet } from "@/action/pet";
import { ERR_MSG, SUCC_MSG } from "@/constants/constants";
import { NextRequest, NextResponse } from "next/server";

const processPetRequest = (form: FormData, isUpdate: boolean) => {
    const petName = form.get('petName') as string;
    const petBday = form.get('petBday') as string;
    const petBreed = form.get('petBreed') as string;
    const petPic = form.get('petPic') as File;

    if(petName === "") throw new Error(ERR_MSG.ERR28);
    if(petBreed === "") throw new Error(ERR_MSG.ERR29);
    if(!petBday) throw new Error(ERR_MSG.ERR30);
    if(!petPic && !isUpdate) throw new Error(ERR_MSG.ERR31);

    const birthdate = new Date(petBday);
    if(!birthdate || (birthdate as Date).valueOf() === 0) throw new Error(ERR_MSG.ERR30);

    return {petName: petName, petBday: birthdate, petBreed: petBreed, petPic: petPic};
}

export const POST = async (req: NextRequest) => {

    try {
        const body = await req.formData();
        
        const {petName, petBday, petBreed, petPic} = processPetRequest(body, false);

        const pet = await postPet(petName, petBday, petBreed, petPic);
        if(!pet) throw new Error(ERR_MSG.ERR32);

        return NextResponse.json({message: SUCC_MSG.SUCCESS1, body: pet}, {status: 200});
    } catch(e) {
        return NextResponse.json({message: (e as Error).message}, {status: 500});
    }
}

export const PATCH = async (req: NextRequest) => {
    try {
        const body = await req.formData();
        const {petName, petBday, petBreed, petPic} = processPetRequest(body,true);
        const petId = body.get('petId') as string;
        const petData = await updatePet(petName, petBday, petBreed, petPic, Number(petId));

        return NextResponse.json({message: SUCC_MSG.SUCCESS1, body: petData}, {status: 200});

    } catch(e) {
        return NextResponse.json({message: (e as Error).message}, {status: 500});
    }
}