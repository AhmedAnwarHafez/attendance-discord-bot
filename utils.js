const moment = require('moment')
const { AsciiTable3 } = require('ascii-table3')

const format = (attendances) => {
  return attendances.map((attendance) => ({
    ...attendance,
    attended: attendance.attended === 1 ? 'Yes' : 'No',
    attendedAt: moment(Number(attendance.attended_at)).fromNow(),
  }))
}

const toTable = (rows) => {
  const attendances = format(rows)
  const table = new AsciiTable3("Today's attendance")
  table.setHeading('', 'Nickname', 'Attended', 'Attended At')

  attendances.forEach(({ nickname, attended, attendedAt }, i) => {
    table.addRow(i + 1, nickname, attended, attendedAt)
  })

  return table
}

module.exports = {
  format,
  toTable,
}
