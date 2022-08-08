import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
dayjs.extend(weekday)
dayjs.extend(localeData)
// dayjs.updateLocale('en', {
//   weekdays: [
//     "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
//   ]
// })
/**
 * 生成 uuid
 * https://developer.mozilla.org/en-US/docs/Web/API/crypto_property
 */
export const uuid = (): string => {
  return (crypto && crypto.randomUUID) ? crypto.randomUUID() : uuidv4()
}

export const deadlineFormat = (deadline: string): string => {
  const date1 = dayjs(Date.now())
  const date2 = dayjs(parseInt(deadline))
  const status = `${date1.diff(date2, 'day')} ${true ? 'left' : 'ago'}`  
  console.log(status)
  const day = date2.format('DD')
  const week = date2.weekday()
  const month = date2.localeData().monthsShort(date2)
  const year = date2.format('YYYY')
  const overYear = `${month} ${day}, ${year} ${status}`
  const thisYear = `${week} ${month}, ${day} ${status}`
  const otherYear = true
  return otherYear ? overYear : thisYear
}