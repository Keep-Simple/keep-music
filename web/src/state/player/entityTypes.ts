import { Song } from '../../generated/graphql'

export type PlayerSong = Pick<
    Song,
    'name' | 'id' | 'albumId' | 'duration' | 'link' | 'views' | 'authorId'
>

export type PlayerState = {
    songs: PlayerSong[]
    showPlayer: boolean
    showPanel: boolean
    selectedSongIdx: number
    albumLoading: {
        state: boolean
        id?: number
    }
    loop: 'one' | 'list' | null
}

export type AudioContextValue = {
    loading: boolean
    volume: number
    muted: boolean
    paused: boolean
    setVolume: (num: number) => void
    togglePlay: (is?: boolean) => void
    toggleMute: (is?: boolean) => void
}

export type AudioPositionContetValue = {
    loadProgress: number
    progress: number
    seek: (n: number) => void
    duration: number
    position: number
}
