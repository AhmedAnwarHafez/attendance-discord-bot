const moment = require('moment')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const before9AM = moment('08:15:00', 'hh:mm:ss')
  const after9AM = moment('10:15:00', 'hh:mm:ss')
  await knex('attendances').del()
  await knex('attendances').insert([
    {
      user_id: 1,
      nickname: 'on-time student',
      cohort: 'matai 2021',
      created_at: +before9AM.valueOf(),
    },
    {
      user_id: 1,
      nickname: 'on-time student',
      cohort: 'matai 2021',
      created_at: +before9AM.subtract(1, 'd').valueOf(),
    },
    {
      user_id: 2,
      nickname: 'late student',
      cohort: 'matai 2021',
      created_at: +after9AM.valueOf(),
    },
    {
      user_id: 2,
      nickname: 'late student',
      cohort: 'matai 2021',
      created_at: +after9AM.subtract(1, 'day').valueOf(),
    },
  ])
}
