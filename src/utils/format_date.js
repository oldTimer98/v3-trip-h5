import dayjs from "dayjs"

export function formatMonthDay(date, formatStr = "MM月DD日") {
  return dayjs(date).format(formatStr)
}

export function getDiffDay(startDate, endDate) {
  const days =  dayjs(endDate).diff(startDate, "day")
  return Math.abs(days)
}
