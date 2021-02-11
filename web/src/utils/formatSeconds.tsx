import { intervalToDuration } from 'date-fns'

export function formatSeconds(sec: number) {
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
