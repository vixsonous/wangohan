import { Kysely } from "kysely";

export async function up(db: Kysely<any>):Promise<void> {
    await db.schema.alterTable("likes_table").addColumn("is_liked","boolean", col => col.notNull().defaultTo(false)).execute();

}

export async function down(db: Kysely<any>):Promise<void> {

}