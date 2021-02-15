export function loggerDecorator(func: Function, _this?: unknown) {
    return (...args: any) => {
        console.log('input args', args)
        const result = func.apply(_this, args)
        console.log('output result', result)
        return result
    }
}
