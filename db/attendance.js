const { createClient } = require('@supabase/supabase-js')
const _ = require('lodash')

const dotenv = require('dotenv')
const moment = require('moment')
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const addAttendance = (attendance) => {
  const { cohort, nickname, userId } = attendance
  const row = {
    user_id: userId,
    cohort,
    nickname,
  }
  return supabase.from('attendances').insert(row)
}

const listAttendance = async (cohort, date) => {
  const endOf = moment(date).endOf('day').toISOString()
  const startOf = moment(date).startOf('day').toISOString()

  const attended = await supabase
    .from('attendances')
    .select('nickname, created_at')
    .eq('cohort', cohort)
    .gt('created_at', startOf)
    .lt('created_at', endOf)
    .then((res) => res.data)

  const notAttended = await supabase
    .from('v_attendances')
    .select('nickname')
    .eq('cohort', cohort)
    .not('created_at', 'gt', startOf)
    .not('created_at', 'lt', endOf)
    .then((res) => res.data)

  const all = [...attended, ...notAttended]
  const unique = _.uniqBy(all, (row) => row.nickname).map((row) => ({
    name: row.nickname,
    since: row.created_at ? moment(row).fromNow() : null,
  }))
  console.log(unique)
  return unique
}

listAttendance('kahikatea 2022', new Date())

module.exports = {
  addAttendance,
  listAttendance,
}
