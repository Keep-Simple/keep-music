import { Entity, BaseEntity, Column, ManyToOne, PrimaryColumn } from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@Entity()
export class Updoot extends BaseEntity {
    @Column({ type: 'int' })
    value: number

    @PrimaryColumn()
    userId: number

    @PrimaryColumn()
    postId: number

    @ManyToOne(() => User, (user) => user.updoots)
    user: User

    @ManyToOne(() => Post, (post) => post.updoots, { onDelete: 'CASCADE' })
    post: Post
}
