export function shuffle<T>(arr: T[]) {
    let j, x, i
    const a = [...arr]
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = a[i]
        a[i] = a[j]
        a[j] = x
    }
    return a
}
