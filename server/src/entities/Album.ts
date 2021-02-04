import { Field, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
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
    @Column()
    cover: string

    @Field()
    @Column()
    name: string

    @Field(() => String)
    @Column()
    realeaseDate: Date

    @Field()
    @Column()
    authorId: number

    @Field(() => Author)
    @ManyToOne(() => Author, (author) => author.albums)
    author: Author

    @OneToMany(() => Song, (song) => song.album)
    songs: Song[]
}
