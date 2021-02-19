import { Song } from '../../generated/graphql'

export type SongType = Pick<
    Song,
    'name' | 'id' | 'albumId' | 'duration' | 'link' | 'views'
>

export type PlayerSong = SongType & { cover: string; singer: string }

export type PlayerState = {
    songs: PlayerSong[]
    showPlayer: boolean
    selectedSongIdx: number
    albumLoading: boolean
}
