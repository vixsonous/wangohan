import { Kysely } from "kysely";

export async function up(db: Kysely<any>):Promise<void> {
    await db.schema.alterTable("user_details_table")
      .alterColumn("user_gender", col => col.setDataType("varchar(20)"))
      .execute();

}

export async function down(db: Kysely<any>):Promise<void> {

}