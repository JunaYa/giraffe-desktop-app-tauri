import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
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
  const date1 = dayjs('2019-01-25')
  const date2 = dayjs('2018-06-05')
  const date = dayjs(parseInt(deadline)).format('YYYY-MM-DD')
  const status = `${date1.diff(date2, 'day')} ${true ? 'left' : 'ago'}`  
  console.log(status)
  const day = 28
  const week = 'Fri'
  const month = 'Jan'
  const year = 2021
  const overYear = `${month} ${day}, ${year} ${status}`
  const thisYear = `${month} ${day}, ${year} ${status}`
  const otherYear = true
  return otherYear ? overYear : thisYear
}