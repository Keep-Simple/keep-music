import {
    Arg,
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
import { Album } from '../entities/Album'
import { Song } from '../entities/Song'
import { isAuth } from '../middleware/isAuth'
import { Author } from './../entities/Author'
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
        return Album.createQueryBuilder('a')
            .loadRelationCountAndMap('a.tracksNumber', 'a.songs')
            .where('a."authorId" = :authorId', { authorId: author.id })
            .getMany()
    }

    @FieldResolver(() => [Song], { nullable: true })
    songs(@Root() author: Author) {
        return Song.find({ where: { authorId: author.id } })
    }

    @Query(() => Author, { nullable: true })
    author(@Arg('id', () => Int) id: number) {
        return Author.findOne(id)
    }

    @Mutation(() => Author)
    @UseMiddleware(isAuth)
    async createAuthor(@Arg('input') input: AuthorInput) {
        return Author.create({ ...input }).save()
    }
}
