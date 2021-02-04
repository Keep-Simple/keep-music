import { Field, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { DEFAULT_COVER } from '../constants'
import { Album } from './Album'
import { Author } from './Author'

@ObjectType()
@Entity()
export class Song extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    name: string

    @Field()
    @Column()
    link: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    byteSize?: number

    @Field()
    @Column({ default: DEFAULT_COVER })
    cover: string

    @Field()
    @Column()
    duration: number

    @Field()
    @Column({ default: 0 })
    views: number

    @Field()
    @Column()
    order: number

    @Field({ nullable: true })
    @Column({ length: 10, nullable: true })
    quality?: string

    @Field()
    @Column()
    albumId: number

    @Field()
    @Column()
    authorId: number

    @ManyToOne(() => Author, (author) => author.songs)
    author: Author

    @ManyToOne(() => Album, (album) => album.songs, { onDelete: 'CASCADE' })
    album: Album
}
