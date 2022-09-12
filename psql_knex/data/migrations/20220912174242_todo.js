/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = knex =>
 knex.schema.createTable("users", tbl => {
   tbl.increments('id');
   tbl.text("name", 128).notNullable();
 })

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = knex => knex.schema.dropTableIfExists("users")