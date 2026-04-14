import { useState, useEffect } from 'react'

export function useClock(): string {
  const format = () =>
    new Date().toLocaleTimeString('en-AE', {
      timeZone: 'Asia/Dubai',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }) + ' · Abu Dhabi'

  const [time, setTime] = useState(format)

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 60_000)
    return () => clearInterval(id)
  }, [])

  return time
}
