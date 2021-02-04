import DataLoader from 'dataloader'
import { Song } from '../entities/Song'

export const createSongLoader = () =>
    new DataLoader<number, Song>(async (songIds) => {
        const songs = await Song.findByIds(songIds as number[])

        const songIdToSong = songs.reduce((acc: Record<number, Song>, v) => {
            acc[v.id] = v
            return acc
        }, {})

        return songIds.map((songId) => songIdToSong[songId])
    })
