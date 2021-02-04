import {
    Arg,
    Int,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from 'type-graphql'
import { Song } from '../entities/Song'
import { isAuth } from '../middleware/isAuth'

@Resolver(Song)
export class SongResolver {
    @Query(() => Song, { nullable: true })
    song(@Arg('id', () => Int) id: number) {
        return Song.findOne(id)
    }

    @Query(() => [Song], { nullable: true })
    songsInAlbum(@Arg('albumId', () => Int) albumId: number) {
        return Song.find({ where: { albumId }, order: { order: 'ASC' } })
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async viewSong(@Arg('id', () => Int) id: number) {
        const song = await Song.findOne(id)
        if (!song) {
            return false
        }
        song.views += 1
        Song.save(song)
        return true
    }
}
