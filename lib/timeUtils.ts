export function isWithinNightHours(): boolean {
  const now = new Date()
  const total = now.getHours() * 60 + now.getMinutes()
  return total >= 1320 || total < 450
}

export function getTimeUntilMidnight(): string {
  const now = new Date()
  const target = new Date()
  target.setHours(22, 0, 0, 0)
  if (now >= target) target.setDate(target.getDate() + 1)
  const diff = target.getTime() - now.getTime()
  const h = Math.floor(diff / (1000 * 60 * 60))
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return `${h}h ${m}m`
}

export function isOlderThan14Days(dateStr: string): boolean {
  const diff = Date.now() - new Date(dateStr).getTime()
  return diff / (1000 * 60 * 60 * 24) >= 14
}
