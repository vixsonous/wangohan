import { FileMigrationProvider, Kysely, Migrator, sql } from "kysely";
import path from "path";
import { promises as fs } from "fs";
import { db } from "./db";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("blog_columns_table")
    .addColumn("blog_id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "serial", (col) => col.references('users_table.user_id').onDelete('cascade').notNull())
    .addColumn("title", "varchar(255)")
    .addColumn("editor_state", "jsonb")
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