import { Kysely } from "kysely";

export async function up(db: Kysely<any>):Promise<void> {
    await db.schema.alterTable("pets_table").alterColumn("pet_image", col => col.setDataType("varchar(255)")).execute();
}

export async function down(db: Kysely<any>):Promise<void> {

}