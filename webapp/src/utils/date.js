const formatMonth = (m) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  return months[m - 1]
}

const formatDay = (d) => {
  let suffix
  switch (d) {
    case 2:
      suffix = "nd"
      break
    case 3:
      suffix = "rd"
      break
    default:
      suffix = "th"
      break
  }
  return `${d}${suffix}`
}

export { formatMonth, formatDay }
