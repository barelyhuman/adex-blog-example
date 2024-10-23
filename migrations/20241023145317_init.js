/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('id').unique().primary()
      table.boolean('isActive').defaultTo(true).notNullable()
      table.string('name').notNullable()
      table.timestamps(true, true)
    })
    .createTable('posts', table => {
      table.increments('id').unique().primary()
      table.boolean('isActive').defaultTo(true).notNullable()
      table.text('content').notNullable()
      table.string('title').notNullable()
      table.timestamps(true, true)

      table.integer('author_id').references('id').inTable('users')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists('posts').dropTableIfExists('users')
}
