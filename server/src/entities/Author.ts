import { Field, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { DEFAULT_AVATAR_URL } from '../constants'
import { Album } from './Album'
import { Song } from './Song'

@ObjectType()
@Entity()
export class Author extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ unique: true })
    name: string

    @Field()
    @Column({ default: 'No info about this author' })
    info: string

    @Field()
    @Column({ default: DEFAULT_AVATAR_URL })
    avatar: string

    @Field(() => [String])
    @Column('text', { array: true, default: {} })
    photos: string[]

    @Field(() => [Album], { nullable: true })
    @OneToMany(() => Album, (album) => album.author)
    albums?: Album[]

    @Field(() => [Song], { nullable: true })
    @OneToMany(() => Song, (song) => song.album)
    songs?: Song[]
}
