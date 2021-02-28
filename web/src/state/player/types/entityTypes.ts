import { HTMLMediaControls } from 'react-use/lib/factory/createHTMLMediaHook'
import { Song } from '../../../generated/graphql'

export type PlayerSong = Pick<
    Song,
    | 'name'
    | 'id'
    | 'albumId'
    | 'duration'
    | 'link'
    | 'views'
    | 'authorId'
    | 'order'
> & { albumName: string; author: string; cover: string }

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
    muted: boolean
    paused: boolean
    setVolume: (num: number) => void
    togglePlay: (is?: boolean) => void
    toggleMute: (is?: boolean) => void
    seek: HTMLMediaControls['seek']
}

export type AudioPositionContetValue = {
    loadProgress: number
    progress: number
    seek: (n: number) => void
    setVolume: (num: number) => void
    volume: number
    duration: number
    position: number
}
