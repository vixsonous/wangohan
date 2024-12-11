import { Kysely } from "kysely";

export async function up(db: Kysely<any>):Promise<void> {
    await db.schema.alterTable("notifications_table")
      .addColumn("type","varchar(50)", col => col.notNull().defaultTo(''))
      .addColumn("recipe_owner_id", "serial", (col) => col.references('users_table.user_id').onDelete('cascade').notNull())
      .addColumn("liked","boolean", col => col.notNull().defaultTo(false))
      .addColumn("recipe_id", "serial", (col) => col.references('recipes_table.recipe_id').onDelete('cascade').notNull())
      .addColumn("recipe_image","varchar(100)", col => col.notNull().defaultTo(''))
      .execute();

}

export async function down(db: Kysely<any>):Promise<void> {

}