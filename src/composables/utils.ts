import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import isTodayPlugin from 'dayjs/plugin/isToday'
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(isTodayPlugin)
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
  const date1 = dayjs()
  const date2 = dayjs(parseInt(deadline))
  const diff = date1.diff(date2, 'day')
  const status = `${diff === 0 ? '' : Math.abs(diff)} ${diff === 0 ? 'today' : diff < 0 ? 'left' : 'ago'}`  
  const day = date2.format('DD')
  const week = date2.weekday()
  const month = date2.localeData().monthsShort(date2)
  const year = date2.format('YYYY')
  const overYear = `${month} ${day}, ${year} ${status}`
  const thisYear = `${week} ${month}, ${day} ${status}`
  const otherYear = date1.year === date2.year
  return otherYear ? overYear : thisYear
}

export const whenFormat = (deadline: string): string => {
  const date1 = dayjs()
  const date2 = dayjs(parseInt(deadline))
  const diff = date1.diff(date2, 'day')
  const status = `${diff === 0 ? '' : Math.abs(diff)} ${diff === 0 ? 'today' : diff < 0 ? 'left' : 'ago'}`  
  const day = date2.format('DD')
  const week = date2.weekday()
  const month = date2.localeData().monthsShort(date2)
  const year = date2.format('YYYY')
  const overYear = `${month} ${day}, ${year} ${status}`
  const thisYear = `${week} ${month}, ${day} ${status}`
  const otherYear = date1.year === date2.year
  return otherYear ? overYear : thisYear
}

export const isToday = (deadline: string): boolean => {
  const date2 = dayjs(parseInt(deadline))
  return dayjs(date2).isToday()
}