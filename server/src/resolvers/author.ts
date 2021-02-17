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
import { ILike } from 'typeorm'
import { Album } from '../entities/Album'
import { Song } from '../entities/Song'
import { isAuth } from '../middleware/isAuth'
import { Author } from './../entities/Author'
import { MyContext } from './../types'
@InputType()
class AuthorInput {
    @Field()
    name: string

    @Field({ nullable: true })
    info?: string

    @Field({ nullable: true })
    avatar?: string

    @Field(() => [String], { nullable: true })
    photos?: string[]
}

@Resolver(Author)
export class AuthorResolver {
    @FieldResolver(() => [Album], { nullable: true })
    albums(@Root() author: Author) {
        if (author.albums) return author.albums

        return Album.createQueryBuilder('a')
            .loadRelationCountAndMap('a.tracksNumber', 'a.songs')
            .where('a.authorId = :authorId', { authorId: author.id })
            .getMany()
    }

    @FieldResolver(() => [Song], { nullable: true })
    songs(
        @Root() author: Author,
        @Ctx() { loaders }: MyContext,
        @Arg('limit', () => Int, { nullable: true }) limit?: number
    ) {
        if (author.songs) return author.songs

        return loaders.songsByAuthor.load({ id: author.id, limit })
    }

    @Query(() => Author, { nullable: true })
    author(@Arg('id', () => Int) id: number) {
        return Author.findOne(id)
    }

    @Query(() => [Author], { nullable: true })
    authors(@Arg('searchQuery', { nullable: true }) query: string = '') {
        return Author.find({ where: { name: ILike(`%${query}%`) } })
    }

    @Mutation(() => Author)
    @UseMiddleware(isAuth)
    async createAuthor(@Arg('input') input: AuthorInput) {
        return Author.create({ ...input, songs: [], albums: [] }).save()
    }
}
