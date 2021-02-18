import { Song } from '../../generated/graphql'
import { PlayerSong } from './context'

export const addSongsAction = (
    songs: Partial<Song>[],
    singer: string,
    cover: string
) => {
    return {
        type: 'ADD_SONGS',
        payload: songs.map((s) => convertToPlayerSong(s, singer, cover)) ?? [],
    }
}

export const onAlbumLoading = (isLoading: boolean) => ({
    type: 'SET_ALBUM_LOADING',
    payload: isLoading,
})

export const onSongLoading = (id: number) => ({
    type: 'SET_SONG_LOADING',
    payload: id,
})

export const onSongPlay = (id: number) => ({
    type: 'SET_CURRENT_PLAYING_SONG',
    payload: id,
})

export const onSongPause = () => ({
    type: 'SET_CURRENT_PAUSED_SONG',
})

export const onAudioListChange = (songs: PlayerSong[]) => ({
    type: 'AUDIO_LIST_CHANGED',
    payload: songs,
})

export const convertToPlayerSong = (
    s: Partial<Song>,
    singer: string,
    cover: string
) =>
    ({
        singer,
        cover,
        musicSrc: s.link,
        _id: s.id,
        name: s.name,
        duration: s.duration,
        albumId: s.albumId,
    } as PlayerSong)
