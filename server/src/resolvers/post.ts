import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    InputType,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
    UseMiddleware,
} from 'type-graphql'
import { getConnection } from 'typeorm'
import { Post } from '../entities/Post'
import { isAuth } from './../middleware/isAuth'
import { MyContext } from '../types'
import { Updoot } from '../entities/Updoot'
import { User } from '../entities/User'

@InputType()
class PostInput {
    @Field()
    title: string
    @Field()
    text: string
}

@Resolver(Post)
export class PostResolver {
    @FieldResolver(() => String)
    textSnippet(@Root() root: Post) {
        return root.text.slice(0, 65) + '...'
    }

    @FieldResolver(() => User)
    creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
        return userLoader.load(post.creatorId)
    }

    @FieldResolver(() => Int, { nullable: true })
    async voteStatus(
        @Root() post: Post,
        @Ctx() { updootLoader, req }: MyContext
    ) {
        if (!req.session.userId) return null

        const updoot = await updootLoader.load({
            postId: post.id,
            userId: req.session.userId,
        })

        return updoot?.value
    }

    @Query(() => [Post])
    async posts(
        @Arg('limit', () => Int)
        limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor?: string
    ) {
        const realLimit = Math.min(50, limit)

        const posts = await getConnection().query(
            `
        select p.*
        from post p
        ${
            cursor
                ? `where p."createdAt" < '${new Date(
                      parseInt(cursor)
                  ).toISOString()}'`
                : ''
        }
        order by p."createdAt" DESC
        limit ${realLimit}
        `
        )

        return posts
    }

    @Query(() => Post, { nullable: true })
    post(@Arg('id', () => Int) id: number) {
        return Post.findOne(id)
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Post)
    async createPost(
        @Arg('input') input: PostInput,
        @Ctx() { req }: MyContext
    ) {
        return Post.create({ ...input, creatorId: req.session.userId }).save()
    }

    @Mutation(() => Post, { nullable: true })
    @UseMiddleware(isAuth)
    async updatePost(
        @Arg('id', () => Int) id: number,
        @Arg('title') title: string,
        @Arg('text') text: string,
        @Ctx() { req }: MyContext
    ): Promise<Post | null> {
        // return Post.update(
        //     { id, creatorId: req.session.userId },
        //     { title, text }
        // )
        const result = await getConnection()
            .createQueryBuilder()
            .update(Post)
            .set({ text, title })
            .where('id = :id and "creatorId" = :creatorId', {
                id,
                creatorId: req.session.userId,
            })
            .returning('*')
            .execute()

        return result.raw[0]
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deletePost(
        @Arg('id', () => Int) id: number,
        @Ctx() { req }: MyContext
    ) {
        // updoots will be deleted by cascade
        await Post.delete({ id, creatorId: req.session.userId })
        return true
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async vote(
        @Arg('postId', () => Int) postId: number,
        @Arg('value', () => Int) value: number,
        @Ctx()
        {
            req: {
                session: { userId },
            },
        }: MyContext
    ) {
        if (Number.isNaN(value) || value === 0) return false

        const updoot = await Updoot.findOne({ where: { postId, userId } })

        const updootValue = value > 0 ? 1 : -1

        // change vote
        if (updoot && updoot.value !== updootValue) {
            await getConnection().transaction(async (tm) => {
                await tm.query(
                    `
                    update updoot
                    set value = ${updootValue}
                    where "postId" = ${postId} and "userId" = ${userId};

                    update post
                    set points = points + ${updootValue * 2}
                    where id = ${postId};
                    `
                )
            })
            return true
            // create vote
        } else if (!updoot) {
            await getConnection().transaction(async (tm) => {
                await tm.query(`
                    insert into updoot ("userId", "postId", "value")
                    values (${userId}, ${postId}, ${updootValue});

                    update post
                    set points = points + ${updootValue}
                    where id = ${postId};
        `)
            })

            return true
        }

        return false
    }
}
