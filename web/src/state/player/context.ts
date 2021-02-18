import { createContext, Dispatch } from 'react'
import { ReactJkMusicPlayerAudioListProps } from '../../player'
import { initialPlayerState } from './reducer'

export type PlayerContextType = {
    state: PlayerState
    dispatch: Dispatch<any>
}

export const PlayerContext = createContext({
    state: initialPlayerState,
    dispatch: () => null,
} as PlayerContextType)

export type PlayerState = {
    songs: readonly PlayerSong[]
    showPlayer: boolean
    selectedSong?: PlayerSong & {
        isPaused?: boolean
        isLoading?: boolean
    }
    albumLoading: boolean
}

export type PlayerSong = ReactJkMusicPlayerAudioListProps & {
    _id?: number
    albumId?: number
}
