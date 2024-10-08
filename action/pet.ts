import { db } from "@/lib/database/db"
import { getUser, getUserId } from "./users"
import { padStartIds } from "./common";
import { deleteFilesinFolder, uploadFile } from "./file-lib";
import { DogData } from "@/constants/interface";
import { ERR_MSG } from "@/constants/constants";

export const postPet = async (petName: string, petBday: Date, petBreed: string, uploadedPetPic: string) => {

    try {
        
        const dogData = await db.transaction().execute(async trx => {
            const user_id = await getUserId();
            const pet = await trx.insertInto("pets_table").values({
                pet_birthdate: petBday,
                pet_name: petName,
                pet_breed: petBreed,
                pet_image: uploadedPetPic,
                user_id: user_id,
                created_at: new Date(),
                updated_at: new Date()
            })
            .returningAll()
            .executeTakeFirstOrThrow();

            return {
                pet_id: pet.pet_id,
                pet_name: pet.pet_name, 
                pet_breed: pet.pet_breed, 
                pet_birthdate: pet.pet_birthdate.toISOString(), 
                pet_image: pet.pet_image
            } as DogData;
        });

        console.log('Transaction is successful!');

        return dogData;
    } catch(e) {
        console.log("Transaction failed and rolled back. Error ", e);
        throw new Error((e as Error).message);
    }
}

export const updatePet = async (petName: string, petBday: Date, petBreed: string, petId: number) => {
    try {

        const petData = await db.transaction().execute( async trx => {
            const pet = await trx.updateTable("pets_table").set({
                pet_name: petName,
                pet_breed: petBreed,
                pet_birthdate: petBday
            })
            .where('pet_id','=',petId)
            .returningAll()
            .executeTakeFirstOrThrow();

            return pet;
        });

        console.log('Transaction is successful!');
        
        return petData;

    } catch(e) {
        console.log("Transaction failed and rolled back. Error ", e);
        throw new Error((e as Error).message);
    }
}

export const uploadPetPic = async (petPic: File | null, petId: number) => {

    try {

        const user_id = await getUserId();

        if(!petPic) throw new Error(ERR_MSG.ERR31);

        const folder = `${padStartIds(user_id)}/pets/${petId}`;
        const uploadedPetPic = await uploadFile(petPic, folder);

        return uploadedPetPic;
        
    } catch(e) {
        
        throw new Error((e as Error).message);
    }
}

export const updatePetPic = async (uploadedPetPic: string, petId: number) => {
    try {
        
        const updated_pet = await db.transaction().execute( async trx => {

            const pet = await trx.updateTable("pets_table").set({
                pet_image: uploadedPetPic
            })
            .where("pet_id", "=", petId)
            .returningAll()
            .executeTakeFirstOrThrow();

            return pet;
        });

        return updated_pet;
    } catch(e) {

    }
}