/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = knex => 
  knex.schema
    .createTable("users", tbl => {
      tbl.increments('id')
      tbl.binary("name", 128).notNullable()
      tbl.jsonb("info")
    })
    .raw('CREATE EXTENSION IF NOT EXISTS pgcrypto')


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = knex => knex.schema.dropTableIfExists("users")