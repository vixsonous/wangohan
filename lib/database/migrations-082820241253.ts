import { Kysely } from "kysely";

export async function up(db: Kysely<any>):Promise<void> {
    await db.schema.alterTable("recipe_ingredients_table").addColumn("recipe_ingredients_amount","varchar(100)", col => col.notNull()).execute();
    await db.schema.alterTable("recipe_ingredients_table").renameColumn("recipe_ingredient_name","recipe_ingredients_name").execute();

}

export async function down(db: Kysely<any>):Promise<void> {

}