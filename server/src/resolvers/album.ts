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
import { Album } from '../entities/Album'
import { Author } from '../entities/Author'
import { Song } from '../entities/Song'
import { isAuth } from '../middleware/isAuth'
import { MyContext } from '../types'
import { SongInputBase } from './song'

@InputType()
class AlbumInput {
    @Field()
    name: string

    @Field()
    authorId: number

    @Field(() => [SongInputBase], { nullable: true })
    songs?: SongInputBase[]

    @Field({ nullable: true })
    cover?: string

    @Field()
    releaseYear: number
}

export type SongsOrdering = 'track' | 'views'

@Resolver(Album)
export class AlbumResolver {
    @FieldResolver(() => [Song], { nullable: true })
    songs(
        @Root() album: Album,
        @Ctx() { loaders }: MyContext,
        @Arg('orderBy', { nullable: true }) orderBy?: SongsOrdering
    ) {
        if (album.songs) return album.songs

        return loaders.songsByAlbum.load({ id: album.id, orderBy })
    }

    @FieldResolver(() => Author)
    author(@Root() album: Album, @Ctx() { loaders }: MyContext) {
        if (album.author) return album.author

        return loaders.authors.load(album.authorId)
    }

    @Query(() => Album, { nullable: true })
    album(@Arg('id', () => Int) id: number) {
        return Album.createQueryBuilder('a')
            .loadRelationCountAndMap('a.tracksNumber', 'a.songs')
            .where('a.id = :id', { id })
            .getOne()
    }

    @Query(() => [Album], { nullable: true })
    albums(): Promise<Album[]> {
        return Album.createQueryBuilder('a')
            .loadRelationCountAndMap('a.tracksNumber', 'a.songs')
            .getMany()
    }

    @Mutation(() => Album)
    @UseMiddleware(isAuth)
    async createAlbum(@Arg('input') input: AlbumInput): Promise<Album> {
        const { authorId, songs } = input

        if (songs) {
            input.songs = songs.map((s) => ({ ...s, authorId }))
        }

        const album = await Album.create({ ...input }).save({})

        album.tracksNumber = album.songs?.length ?? 0

        return album
    }
}
