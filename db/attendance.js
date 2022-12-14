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

const getAttendanceByDate = async (cohort, date, db = connection) => {
  const endOf = moment(date).endOf('day').valueOf()
  const startOf = moment(date).startOf('day').valueOf()
  const res = await db.raw(
    `SELECT 
	a.nickname
	, CASE WHEN ? < max(a.created_at) and max(a.created_at) < ?  THEN 1 ELSE 0 END as attended
  , max(a.created_at) as attended_at
from attendances as a
where a.cohort = ?
group by a.nickname
order by max(a.created_at)`,
    [+startOf, +endOf, cohort]
  )

  return process.env.NODE_ENV ? res.rows : res
}

module.exports = {
  addAttendance,
  getAttendanceByDate,
}
