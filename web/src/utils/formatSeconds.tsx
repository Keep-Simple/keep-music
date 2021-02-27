import { formatDuration, intervalToDuration } from 'date-fns'

export function formatSeconds(sec = 0) {
    const { hours, minutes, seconds } = intervalToDuration({
        start: 0,
        end: sec * 1000,
    })

    const addZero = (time = 0) => (time / 10 < 1 ? `0${time}` : time)

    if (hours) {
        return `${hours}:${addZero(minutes)}:${addZero(seconds)}`
    }

    return `${minutes}:${addZero(seconds)}`
}

export function secondToMinutesAndHours(sec: number) {
    const hours = Math.floor(sec / 3600)
    const minutes = Math.floor(sec / 60)
    return formatDuration({ hours, minutes }, { format: ['hours', 'minutes'] })
}
