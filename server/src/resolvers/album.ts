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
import { SongInputWithAuthorId } from './song'

@InputType()
class AlbumInput {
    @Field()
    name: string

    @Field()
    authorId: number

    @Field(() => [SongInputWithAuthorId], { nullable: true })
    songs?: SongInputWithAuthorId[]

    @Field({ nullable: true })
    cover?: string

    @Field(() => String, { nullable: true })
    realeaseDate?: Date

    @Field({ nullable: true })
    info?: string
}

@Resolver(Album)
export class AlbumResolver {
    @FieldResolver(() => [Song], { nullable: true })
    songs(@Root() album: Album) {
        return Song.find({
            where: { albumId: album.id },
            order: { order: 'ASC' },
        })
    }

    @Query(() => Album, { nullable: true })
    album(@Arg('id', () => Int) id: number) {
        return Album.createQueryBuilder('a')
            .loadRelationCountAndMap('a.tracksNumber', 'a.songs')
            .where('a.id = :id', { id })
            .getOne()
    }

    @Mutation(() => Album)
    @UseMiddleware(isAuth)
    async createAlbum(@Arg('input') input: AlbumInput) {
        const album = await Album.create({ ...input }).save()

        return this.album(album.id)
    }
}
