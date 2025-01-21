import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // create tables, columns, etc...
  await knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable().unique();
      table.text("password").notNullable();
      table.timestamps(true, true); // includes created_at and updated_at
    })
    .createTable("urls", (table) => {
      table
        .string("id")
        .defaultTo(knex.raw("substring(md5(random()::text) from 0 for 7)"))
        .primary();
      table.text("url").notNullable();
      table
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE") // jika record dengan id tertentu di tabel users dihapus, maka semua record yang memiliki user_id yang sesuai di tabel ini juga akan dihapus secara otomatis.
        .notNullable();
      table.timestamps(true, true);
    })
    .createTable("visits", (table) => {
      table.increments("id").primary();
      table
        .string("url_id")
        .references("id")
        .inTable("urls")
        .onDelete("CASCADE")
        .notNullable();
      table.string("ip").notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  // drop tables, columns, etc...
  await knex.schema.dropTable("visits").dropTable("urls").dropTable("users");
}
