export const getNumber = (str: any, orElse = -1) => {
    if (isNaN(str)) return orElse

    return parseInt(str)
}
