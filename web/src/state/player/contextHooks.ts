import { useContext } from 'react'
import {
    DraggingTimeContext,
    PlayerAudio,
    PlayerAudioPosition,
    PlayerContext,
    PlayerDispatchContext,
} from './context'

export const usePlayerState = () => useContext(PlayerContext)

export const usePlayerDispatch = () => useContext(PlayerDispatchContext)

export const usePlayer = () => [usePlayerDispatch(), usePlayerState()] as const

export const useSelectedSong = () => {
    const { selectedSongIdx, songs } = usePlayerState()
    return songs?.[selectedSongIdx] ?? {}
}

export const useDraggingTime = () => useContext(DraggingTimeContext)

export const useAudioPlayer = () => useContext(PlayerAudio)

export const useAudioPosition = () => useContext(PlayerAudioPosition)
