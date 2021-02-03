import { Request, Response } from 'express'
import { Session } from 'express-session'
import { Redis } from 'ioredis'
import { createUpdootLoader } from './utils/createUpdootLoader'
import { createUserLoader } from './utils/createUserLoader'

export type MyContext = {
    req: Request & { session: Session & { userId?: number } }
    res: Response
    redis: Redis
    userLoader: ReturnType<typeof createUserLoader>
    updootLoader: ReturnType<typeof createUpdootLoader>
}
