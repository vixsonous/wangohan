import { db } from "@/lib/database/db";
import { Database } from "@/lib/database/types";
import { ReferenceExpression, sql, TableExpression } from "kysely";

export const getNextId = async (tableName: TableExpression<Database, never>, columnName: ReferenceExpression<Database, keyof Database>) => {

    const result = await db.selectFrom(tableName)
        .select(db.fn.max(columnName).as('maxId'))
        .executeTakeFirst();

    const nextId = result;

    if(!nextId) throw new Error("Error retrieving the last ID!");

    return nextId.maxId + 1;
}

export const padStartIds = (id: string) => {
    return String(id).padStart(8, '0');
}

export const logError = (error: string) => {
  console.error('[Error]: ' + error + ' ' + new Date().toISOString());
}

export const logSuccess = (error: string) => {
  console.log('[Success]: ' + error + ' ' + new Date().toISOString());
}