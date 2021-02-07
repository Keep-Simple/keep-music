import { Field, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { DEFAULT_COVER } from '../constants'
import { Author } from './Author'
import { Song } from './Song'

@ObjectType()
@Entity()
export class Album extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field({ defaultValue: 0 })
    tracksNumber: number

    @Field()
    @Column({ default: DEFAULT_COVER })
    cover: string

    @Field()
    @Column()
    name: string

    @Field()
    @Column({ default: 'Album does not have description' })
    info: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    realeaseDate?: Date

    @Field()
    @Column()
    authorId: number

    @Field(() => Author)
    @ManyToOne(() => Author, (author) => author.albums)
    author: Author

    @Field(() => [Song], { nullable: true })
    @OneToMany(() => Song, (song) => song.album, {
        cascade: ['insert', 'update'],
    })
    songs?: Song[]
}
