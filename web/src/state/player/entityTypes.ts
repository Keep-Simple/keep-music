import { Song } from '../../generated/graphql'

export type PlayerSong = Pick<
    Song,
    'name' | 'id' | 'albumId' | 'duration' | 'link' | 'views' | 'authorId'
>

export type PlayerState = {
    songs: PlayerSong[]
    showPlayer: boolean
    selectedSongIdx: number
    albumLoading: boolean
}
