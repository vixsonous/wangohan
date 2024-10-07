import { db } from "@/lib/database/db"
import { getUserId } from "./users"
import { padStartIds } from "./lib";
import { deleteFilesinFolder, uploadFile } from "./file-lib";
import { DogData } from "@/constants/interface";

export const postPet = async (petName: string, petBday: Date, petBreed: string, petPic: File) => {

    try {
        
        const dogData = await db.transaction().execute(async trx => {
            const user_id = await getUserId();
            const pet = await trx.insertInto("pets_table").values({
                pet_birthdate: petBday,
                pet_name: petName,
                pet_breed: petBreed,
                pet_image: '',
                user_id: user_id,
                created_at: new Date(),
                updated_at: new Date()
            }).returning(["pet_id"]).executeTakeFirstOrThrow();

            const folder = `${padStartIds(user_id)}/pets/${pet.pet_id}`;
            const uploadedPetPic = await uploadFile(petPic, folder);

            const updated_row = await trx.updateTable("pets_table").set({
                pet_image: uploadedPetPic
            }).where("pet_id","=", pet.pet_id)
            .returningAll()
            .executeTakeFirstOrThrow();

            return {
                pet_id: updated_row.pet_id,
                pet_name: updated_row.pet_name, 
                pet_breed: updated_row.pet_breed, 
                pet_birthdate: updated_row.pet_birthdate.toISOString(), 
                pet_image: updated_row.pet_image
            } as DogData;
        });

        console.log('Transaction is successful!');

        return dogData;
    } catch(e) {
        console.log("Transaction failed and rolled back. Error ", e);
        throw new Error((e as Error).message);
    }
}

export const updatePet = async (petName: string, petBday: Date, petBreed: string, petPic: File | null, petId: number) => {
    try {

        if(petPic) {
            const user_id = await getUserId();
            const folder = `${padStartIds(user_id)}/pets/${petId}`;
            
            await deleteFilesinFolder(folder);
            const update_petPic = await uploadFile(petPic, folder);

            await db.updateTable("pets_table").set({
                pet_image: update_petPic,
            })
            .where('pet_id','=',petId)
            .execute();
        }

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