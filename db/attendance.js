const { default: knex } = require('knex')
const moment = require('moment')
const connection = require('./connection')

const addAttendance = (attendance, db = connection) => {
  const { cohort, nickname, userId } = attendance
  const row = {
    user_id: userId,
    cohort,
    nickname,
    created_at: +new Date(),
  }
  return db('attendances').insert(row)
}

const listAttendance = async (cohort, date, db = connection) => {
  const endOf = moment(date).endOf('day').valueOf()
  const startOf = moment(date).startOf('day').valueOf()
  return db
    .raw(
      `SELECT 
	a.nickname
	, CASE WHEN ${+startOf} < max(a.created_at) < ${+endOf} THEN 1 ELSE 0 END as attended
  , max(a.created_at) as attendedAt
from attendances as a
where a.cohort = '${cohort}'
group by a.nickname`
    )
    .then((res) => console.log(res))
    .catch((error) => console.error(error))
}

// listAttendance('kahikatea 2022', new Date())

module.exports = {
  addAttendance,
  listAttendance,
}
