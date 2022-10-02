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

const getAttendanceByDate = (cohort, date, db = connection) => {
  const endOf = moment(date).endOf('day').valueOf()
  const startOf = moment(date).startOf('day').valueOf()
  return db.raw(
    `SELECT 
	a.nickname
	, CASE WHEN ? < max(a.created_at) and max(a.created_at) < ?  THEN 1 ELSE 0 END as attended
  , max(a.created_at) as attendedAt
from attendances as a
where a.cohort = ?
group by a.nickname`,
    [+startOf, +endOf, cohort]
  )
}

module.exports = {
  addAttendance,
  getAttendanceByDate,
}
