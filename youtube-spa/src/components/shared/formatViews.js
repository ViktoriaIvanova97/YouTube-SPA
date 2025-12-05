export const formatViews = (num) => {
  if (!num) return '—'

  const views = Number(num)

  if (views >= 1_000_000) {
    return `${Math.round(views / 1_000_000)} млн просмотров`
  } else if (views >= 1_000) {
    return `${Math.round(views / 1_000)} тыс просмотров`
  } else {
    return `${views} просмотров`
  }
}
