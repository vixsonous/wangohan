import { db } from "@/lib/database/db";
import { Database } from "@/lib/database/types";
import { ReferenceExpression, sql, TableExpression } from "kysely";

export const getNextId = async (tableName: TableExpression<Database, never>, columnName: ReferenceExpression<Database, keyof Database>) => {

    const result = await db.selectFrom(tableName)
        .select(db.fn.max(columnName).as('maxId'))
        .executeTakeFirst();

    const nextId = result;

    return nextId;
}

export const padStartIds = (id: string) => {
    return String(id).padStart(8, '0');
}