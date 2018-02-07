const tenParse = (number) => {
  return number < 10 ? '0' + number : number
}

export const parseDate = (date) => {
  let dateObj = new Date(date)
  let year = dateObj.getFullYear()
  let month = dateObj.getMonth() + 1
  let day = dateObj.getDate()
  let hour = dateObj.getHours()
  let minute = dateObj.getMinutes()
  let second = dateObj.getSeconds()
  return year + '-' + tenParse(month) + '-' + tenParse(day) + ' ' + tenParse(hour) + ':' + tenParse(minute) + ':' + tenParse(second)
}
