import { Kysely } from "kysely";

export async function up(db: Kysely<any>):Promise<void> {
    await db.schema.alterTable("recipe_comments_table").alterColumn("recipe_comment_rating", col => col.setDataType("integer")).execute();

}

export async function down(db: Kysely<any>):Promise<void> {

}