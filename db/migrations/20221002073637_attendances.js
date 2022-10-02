/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('attendances', (table) => {
    table.increments('id').primary()
    table.bigint('user_id')
    table.string('nickname')
    table.string('cohort')
    table.bigint('created_at')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('attendances')
}
