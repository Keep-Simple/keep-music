import { createContext, Dispatch, useContext } from 'react'
import { Actions } from './actionTypes'
import { PlayerState } from './entityTypes'

export const PlayerContext = createContext<PlayerState>({} as PlayerState)

export const PlayerDispatchContext = createContext<Dispatch<Actions>>(
    () => null
)

export const usePlayerState = () => useContext(PlayerContext)
export const usePlayerDispatch = () => useContext(PlayerDispatchContext)
export const usePlayer = () => [usePlayerDispatch(), usePlayerState()] as const

export const useSelectedSong = () => {
    const { selectedSongIdx, songs } = usePlayerState()
    return songs?.[selectedSongIdx] ?? {}
}
