const { format } = require('./utils')

describe('utils', () => {
  it('format should return proper shape', () => {
    const rows = [
      { nickname: 'student', attended: 1, attendedAt: '1664738727531' },
    ]

    const formated = format(rows)
    expect(formated[0].attended).toBe(false)
    expect(formated[0].nickname).toBe('student')
    expect(formated[0].attendedAt).toBe('03/10 08:25')
  })
})
