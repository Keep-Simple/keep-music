import { Field, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Album } from './Album'
import { Song } from './Song'

@ObjectType()
@Entity()
export class Author extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    name: string

    @Field()
    @Column()
    info: string

    @Field({ nullable: true })
    @Column()
    avatar?: string

    @Field(() => [String], { nullable: true })
    @Column(() => String)
    photos?: string[]

    @Field(() => [Album])
    @OneToMany(() => Album, (album) => album.author)
    albums: Album[]

    @Field(() => [Song])
    @OneToMany(() => Song, (song) => song.album)
    songs: Song[]
}
