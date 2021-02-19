export function createMsg<Obj extends { [index: string]: any }>() {
    return function <Key extends keyof Obj>(
        name: Key,
        ...args: Obj[Key] extends undefined ? [] : [Obj[Key]]
    ) {
        if (args.length > 0) {
            return { type: name, payload: args[0]! }
        }
        return { type: name } as { type: Key; payload: never }
    }
}

export type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key
          }
        : {
              type: Key
              payload: M[Key]
          }
}
