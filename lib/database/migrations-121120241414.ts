import { Kysely } from "kysely";

export async function up(db: Kysely<any>):Promise<void> {
    await db.schema.alterTable("notifications_table")
      .addUniqueConstraint("unique_user_recipe_type", ['user_id', 'recipe_owner_id', 'type'])
      .execute();

}

export async function down(db: Kysely<any>):Promise<void> {

}