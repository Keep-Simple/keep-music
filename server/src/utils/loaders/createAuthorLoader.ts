import DataLoader from 'dataloader'
import { Author } from '../../entities/Author'

export const createAuthorLoader = () =>
    new DataLoader<number, Author>(async (authorIds) => {
        const authors = await Author.findByIds(authorIds as number[])

        const authorIdToAuthor = authors.reduce(
            (acc: Record<number, Author>, v) => {
                acc[v.id] = v
                return acc
            },
            {}
        )

        return authorIds.map((songId) => authorIdToAuthor[songId])
    })
