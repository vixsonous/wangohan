import { Kysely } from "kysely";

export async function up(db: Kysely<any>):Promise<void> {
    await db.schema.alterTable("recipe_instructions_table").renameColumn("recipe_instruction_text","recipe_instructions_text").execute();
    await db.schema.alterTable("recipe_instructions_table").renameColumn("recipe_instruction_id","recipe_instructions_id").execute();
}

export async function down(db: Kysely<any>):Promise<void> {

}