import DataLoader from 'dataloader'
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
