const moment = require('moment')
const { AsciiTable3 } = require('ascii-table3')

const toYesNo = (attendance) => ({
  ...attendance,
  attended: attendance.attended === 1 ? '✓' : '⨯',
})

const fromNow = (attendance) => ({
  ...attendance,
  attendedAt: attendance.attended
    ? moment(Number(attendance.attended_at)).format('hh:mm')
    : '-',
  fromNow: attendance.attended
    ? moment(Number(attendance.attended_at)).fromNow()
    : '-',
})

const isOnTime = (attendance, date) => {
  const fiveInTheMorning = moment(date).set('hour', 7).set('minute', 0)
  const nineInTheMorning = moment(date).set('hour', 9).set('minute', 0)
  const timeDiff = moment(attendance.attended_at).from(nineInTheMorning, true)
  const isOnTime = moment(+attendance.attended_at).isBetween(
    fiveInTheMorning,
    nineInTheMorning
  )
    ? `early by ${timeDiff}`
    : `late by ${timeDiff}`

  return {
    ...attendance,
    isOnTime: attendance.attended ? isOnTime : '-',
  }
}

const format = (attendances, date) => {
  return attendances
    .map(fromNow)
    .map((attendance) => isOnTime(attendance, date))
    .map(toYesNo)
}

const toTable = (rows) => {
  if (rows.length === 0) {
    return 'No records found for this cohort'
  }

  const attendances = format(rows)
  const table = new AsciiTable3("Today's attendance")
  table.setHeading(
    '',
    'Student',
    'Attended',
    'On Time',
    'from Now',
    'Attended At'
  )

  attendances.forEach(
    ({ nickname, attended, isOnTime, fromNow, attendedAt }, i) => {
      table.addRow(i + 1, nickname, attended, isOnTime, fromNow, attendedAt)
    }
  )

  return table.toString()
}

module.exports = {
  format,
  toTable,
}
