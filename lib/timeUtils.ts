export function isWithinNightHours(): boolean {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const totalMinutes = hours * 60 + minutes

  // 22:00 = 1320 min, 7:30 = 450 min
  return totalMinutes >= 1320 || totalMinutes < 450
}

export function getTimeUntilMidnight(): string {
  const now = new Date()
  const target = new Date()
  target.setHours(22, 0, 0, 0)

  if (now >= target) {
    target.setDate(target.getDate() + 1)
  }

  const diff = target.getTime() - now.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return `${hours}h ${minutes}m`
}

export function isOlderThan14Days(dateStr: string): boolean {
  const date = new Date(dateStr)
  const now = new Date()
  const diffDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  return diffDays >= 14
}
