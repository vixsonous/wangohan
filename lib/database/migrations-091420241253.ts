import { Kysely } from "kysely";

export async function up(db: Kysely<any>):Promise<void> {
    await db.schema.alterTable("recipes_table").addColumn("total_views","integer", col => col.notNull().defaultTo(0)).execute();

}

export async function down(db: Kysely<any>):Promise<void> {

}