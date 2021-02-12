import DataLoader from 'dataloader'
import { groupBy } from 'rambda'
import { In } from 'typeorm'
import { Song } from '../../entities/Song'

export const createSongLoader = () =>
    new DataLoader<number, Song>(async (songIds) => {
        const songs = await Song.findByIds(songIds as number[])

        const songIdToSong = songs.reduce((acc: Record<number, Song>, v) => {
            acc[v.id] = v
            return acc
        }, {})

        return songIds.map((songId) => songIdToSong[songId])
    })

export const createSongsByAuthorLoader = () =>
    new DataLoader<number, readonly Song[]>(async (authorIds) => {
        const songs = await Song.find({
            where: { authorId: In(authorIds as number[]) },
            order: { views: 'DESC' },
        })
        const songsByAuthorId = groupBy((s) => s.albumId.toString(), songs)
        return authorIds.map((id) => songsByAuthorId[id] ?? [])
    })

export const createSongOnAlbumLoader = (orderBy: 'track' | 'views' = 'track') =>
    new DataLoader<number, Song[]>(async (albumIds) => {
        const albumIdsStr = albumIds.join(',')

        const orderedSongs = (await Song.query(`
        select s.*
        from song s
        join unnest('{${albumIdsStr}}'::int[]) WITH ORDINALITY t("albumId", ord) USING ("albumId")
        where s."albumId" in (${albumIdsStr})
        order by t.ord, ${orderBy === 'views' ? 's.views DESC' : 's.order ASC'}
        `)) as Song[]

        return orderedSongs.reduce(
            (acc: Song[][], s) => {
                const lastEntry = acc[acc.length - 1]
                if (lastEntry[0] && lastEntry[0].albumId !== s.albumId) {
                    acc.push([s])
                } else {
                    lastEntry.push(s)
                }
                return acc
            },
            [[]]
        )
    })
