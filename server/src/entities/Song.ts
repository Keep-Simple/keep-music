import { Field, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
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
    @Column()
    cover?: string

    @Field()
    @Column()
    duration: number

    @Field()
    @Column({ default: 0 })
    views: number

    @Field()
    @Column()
    order: number

    @Field()
    @Column({ length: 10 })
    quality?: string

    @Field()
    @Column()
    albumId: number

    @Field()
    @Column()
    authorId: number

    @Field(() => Author)
    @ManyToOne(() => Author, (author) => author.songs)
    author: Author

    @Field(() => Album)
    @ManyToOne(() => Album, (album) => album.songs)
    album: Album
}
