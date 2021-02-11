import { v2 as cloudinary } from 'cloudinary'
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
    songs(@Root() author: Author) {
        if (author.songs) return author.songs

        return Song.find({ where: { authorId: author.id } })
    }

    @Query(() => Author, { nullable: true })
    author(@Arg('id', () => Int) id: number) {
        return Author.findOne(id)
    }

    @Mutation(() => Author)
    @UseMiddleware(isAuth)
    async createAuthor(@Arg('input') input: AuthorInput) {
        return Author.create({ ...input, songs: [], albums: [] }).save()
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
}
