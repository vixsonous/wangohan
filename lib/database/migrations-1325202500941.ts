import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable("blog_columns_table")
    .addColumn("blog_image", "varchar(255)", col => col.notNull().defaultTo(''))
    .addColumn("blog_category", "varchar(100)", col => col.notNull().defaultTo(''))
    .execute();

}