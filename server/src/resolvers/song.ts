import {
    Arg,
    Field,
    InputType,
    Int,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from 'type-graphql'
import { Song } from '../entities/Song'
import { isAuth } from '../middleware/isAuth'

@InputType()
export class SongInputWithAuthorId {
    @Field()
    authorId: number

    @Field()
    name: string

    @Field()
    link: string

    @Field()
    duration: number

    @Field()
    order: number

    @Field({ nullable: true })
    cover?: string

    @Field({ nullable: true })
    quality?: string
}
@InputType()
export class SongInputBase {
    @Field()
    name: string

    @Field()
    link: string

    @Field()
    duration: number

    @Field()
    order: number

    @Field({ nullable: true })
    cover?: string

    @Field({ nullable: true })
    quality?: string
}
// @InputType()
// class SongInput extends SongInputBase {
//     @Field()
//     authorId: number

//     @Field()
//     albumId: number
// }

@Resolver(Song)
export class SongResolver {
    @Query(() => Song, { nullable: true })
    song(@Arg('id', () => Int) id: number) {
        return Song.findOne(id)
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
