import { BasicResponse } from "@/constants/class";
import { db } from "@/lib/database/db";
import { Database, DatabaseTableName, UserTable } from "@/lib/database/types";
import {
  CompiledQuery,
  Insertable,
  ReferenceExpression,
  SelectExpression,
  sql,
  TableExpression,
} from "kysely";
import { NextResponse } from "next/server";

export const getNextId = async (
  tableName: TableExpression<Database, never>,
  columnName: ReferenceExpression<Database, keyof Database>
) => {
  const result = await db
    .selectFrom(tableName)
    .select(db.fn.max(columnName).as("maxId"))
    .executeTakeFirst();

  const nextId = result;

  if (!nextId) throw new Error("Error retrieving the last ID!");

  return nextId.maxId + 1;
};

export const padStartIds = (id: string) => {
  return String(id).padStart(8, "0");
};

export const logError = (error: string, fn?: string) => {
  console.error(
    `[${fn ? `Error - ${fn}` : "Error"}]: ` +
      error +
      " " +
      new Date().toISOString()
  );
};

export const logSuccess = (success: string, fn?: string) => {
  console.log(
    `[${fn ? `Success - ${fn}` : "Success"}]: ` +
      success +
      " " +
      new Date().toISOString()
  );
};

export const get = <T extends keyof Database, Data>(
  table_name: T,
  fields?: keyof Database[T]
) => {
  class Get {
    private table_name: T;
    private fields?: keyof Database[T];

    constructor(table_name: T, fields?: keyof Database[T]) {
      this.table_name = table_name;
      this.fields = fields;
    }

    public findAll = async (): Promise<Data[]> => {
      return (await db
        .selectFrom(this.table_name)
        .selectAll()
        .execute()) as Data[];
    };

    public findEqualOne = async (
      uniq_id: number | string,
      column: string
    ): Promise<Data> => {
      const { rows } = await db.executeQuery(
        CompiledQuery.raw(
          `SELECT * FROM ${this.table_name} WHERE ${column} = ${uniq_id} LIMIT 1;`
        )
      );

      return rows.length > 0 ? (rows[0] as Data) : (undefined as Data);
    };
  }

  return new Get(table_name, fields);
};

export const insert = <T extends keyof Database>(
  table_name: T,
  values: Object
) => {
  class Insert {
    private table_name;
    private values;

    constructor(table_name: T, values: Object) {
      this.table_name = table_name;
      this.values = values as Database[T];
    }

    public execute = async () => {
      await db
        .insertInto(this.table_name as keyof DatabaseTableName)
        .values(this.values as Database[T])
        .execute();
    };
  }

  return new Insert(table_name, values);
};

export function sendBasicResponse<T>(
  message: string,
  data: T,
  status: number
): NextResponse<BasicResponse<T>> {
  return NextResponse.json(
    {
      message,
      status,
      data,
    },
    { status }
  );
}
