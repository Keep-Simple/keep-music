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
    new DataLoader<{ id: number; limit?: number }, readonly Song[], number>(
        async (authorIds) => {
            const limit = authorIds[0].limit || 10
            const ids = authorIds.map((a) => a.id)

            const songs = await Song.find({
                where: { authorId: In(ids) },
                order: { views: 'DESC' },
                take: limit,
            })

            const songsByAuthorId = groupBy((s) => s.authorId.toString(), songs)
            return ids.map((id) => songsByAuthorId[id] ?? [])
        },
        { cacheKeyFn: (key) => key.id }
    )

export const createSongOnAlbumLoader = () =>
    new DataLoader<{ id: number; orderBy?: 'track' | 'views' }, Song[], number>(
        async (albumIds) => {
            const orderBy = albumIds[0].orderBy || 'track'

            const albumIdsStr = albumIds.map((a) => a.id).join(',')

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
        },
        {
            cacheKeyFn: (key) => key.id,
        }
    )
