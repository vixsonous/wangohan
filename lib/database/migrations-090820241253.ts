import { Kysely } from "kysely";

export async function up(db: Kysely<any>):Promise<void> {
    await db.schema.alterTable("recipes_table").addColumn("recipe_description","varchar(200)", col => col.notNull().defaultTo("")).execute();

}

export async function down(db: Kysely<any>):Promise<void> {

}