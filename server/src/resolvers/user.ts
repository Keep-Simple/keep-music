import argoHash from 'argon2'
import { v2 as cloudinary } from 'cloudinary'
import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    InputType,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    Root,
    UseMiddleware,
} from 'type-graphql'
import { v4 } from 'uuid'
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../constants'
import { User } from '../entities/User'
import { isAuth } from '../middleware/isAuth'
import { MyContext } from '../types'
import { sendEmail } from '../utils/sendEmail'
import { validateEmail, validateRegistration } from '../utils/validateRegister'

@InputType()
class SignTokenInput {
    @Field()
    source: string

    @Field()
    timestamp: number

    @Field({ nullable: true })
    folder?: string

    @Field({ nullable: true })
    upload_preset: string
}

@InputType()
export class AuthInput {
    @Field()
    username: string
    @Field()
    password: string
    @Field()
    email: string
}

@ObjectType()
class FieldError {
    @Field()
    field: string
    @Field()
    message: string
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]
    @Field(() => User, { nullable: true })
    user?: User
}

@Resolver(User)
export class UserResolver {
    @FieldResolver(() => String)
    email(@Root() user: User, @Ctx() { req }: MyContext) {
        if (req.session.userId === user.id) {
            return user.email
        }
        return ''
    }

    @Query(() => User, { nullable: true })
    me(@Ctx() { req }: MyContext) {
        if (!req.session.userId) {
            return null
        }
        return User.findOne(req.session.userId)
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() { redis }: MyContext
    ) {
        if (!validateEmail(email)) return false

        const user = await User.findOne({ where: { email } })

        if (!user) {
            // to prevent fishing
            return true
        }

        const token = v4()

        await redis.set(
            FORGET_PASSWORD_PREFIX + token,
            user.id,
            'ex',
            1000 * 3600 * 72 // 3 days
        )

        const host = process.env.CORS_ORIGIN

        await sendEmail(
            email,
            `<a href="${host}/change-password/${token}">reset password</a>`
        )

        return true
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    signUpload(
        @Arg('input')
        { folder, source, upload_preset, timestamp }: SignTokenInput
    ) {
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp,
                folder,
                source,
                upload_preset,
            },
            process.env.CLOUDINARY_SECRET
        )

        return signature
    }

    @Mutation(() => UserResponse)
    async changePassword(
        @Arg('token') token: string,
        @Arg('newPassword') newPassword: string,
        @Ctx() { redis, req }: MyContext
    ): Promise<UserResponse> {
        if (newPassword.length <= 2) {
            return {
                errors: [
                    {
                        field: 'newPassword',
                        message: 'length must be greater than 2',
                    },
                ],
            }
        }

        const redisKey = FORGET_PASSWORD_PREFIX + token
        const userId = await redis.get(redisKey)

        const tokenError = [
            {
                field: 'tokenError',
                message: 'Token expired | User not found',
            },
        ]

        if (!userId) return { errors: tokenError }

        const userIdNum = parseInt(userId, 10)

        const user = await User.findOne(userIdNum)

        if (!user) return { errors: tokenError }

        await User.update(
            { id: userIdNum },
            { password: await argoHash.hash(newPassword) }
        )

        await redis.del(redisKey)

        req.session.userId = user.id

        return { user }
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: AuthInput,
        @Ctx() { req }: MyContext
    ) {
        const errors = validateRegistration(options)

        const { username, password, email } = options

        if (errors.length > 0) return { errors }

        if (await User.findOne({ where: { username } })) {
            return { errors: [{ field: 'username', message: 'already taken' }] }
        }

        const user = await User.create({
            username,
            email,
            password: await argoHash.hash(password),
        }).save()

        req.session.userId = user.id

        return { user }
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('usernameOrEmail') usernameOrEmail: string,
        @Arg('password') password: string,
        @Ctx() { req }: MyContext
    ) {
        const user = await User.findOne(
            usernameOrEmail.includes('@')
                ? { where: { email: usernameOrEmail } }
                : { where: { username: usernameOrEmail } }
        )

        if (!user) {
            return {
                errors: [
                    {
                        field: 'usernameOrEmail',
                        message: "that user doesn't exist",
                    },
                ],
            }
        }
        const valid = await argoHash.verify(user.password, password)
        if (!valid) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'incorrect password',
                    },
                ],
            }
        }

        req.session.userId = user.id

        return { user }
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: MyContext) {
        res.clearCookie(COOKIE_NAME)

        return new Promise((resolve) =>
            req.session.destroy((e) => (e ? resolve(false) : resolve(true)))
        )
    }
}
