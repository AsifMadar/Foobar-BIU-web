import { timestampToStr } from './timestampToStr.js'

test('Correctly builds the string', () => {
    expect(timestampToStr(0)).toMatch(/1\/1\/1970 \d\d?:00/) // Not necessarily 0:00 due to timezones
    expect(timestampToStr(1707126738000)).toMatch(/5\/2\/2024 \d\d?:52/)
    expect(timestampToStr(1502106488920)).toMatch(/7\/8\/2017 \d\d?:48/)
})
