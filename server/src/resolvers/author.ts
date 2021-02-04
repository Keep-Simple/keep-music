import { Author } from './../entities/Author'
import {
    Arg,
    Ctx,
    FieldResolver,
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
import { MyContext } from '../types'

@Resolver(Author)
export class AuthorResolver {
    @Query(() => Author, { nullable: true })
    author(@Arg('id', () => Int) id: number) {
        return Author.findOne(id)
    }

    @Query(() => [Album], { nullable: true })
    authorAlbums(@Arg('authorId', () => Int) authorId: number) {
        return Album.createQueryBuilder('a')
            .loadRelationCountAndMap('a."tracksNumber"', 'a.songs')
            .where('a."authorId" = :authorId', { authorId })
            .getMany()
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
