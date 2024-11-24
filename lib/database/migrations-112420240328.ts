import { FileMigrationProvider, Kysely, Migrator, sql } from "kysely";
import path from "path";
import { promises as fs } from "fs";
import { db } from "./db";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("notifications_table")
    .addColumn("notification_id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "serial", (col) => col.references('users_table.user_id').onDelete('cascade').notNull())
    .addColumn("notification_content", "varchar(300)")
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("users_table").execute();
}