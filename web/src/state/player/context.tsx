import React, {
    createContext,
    Dispatch,
    FC,
    useContext,
    useReducer,
} from 'react'
import { AudioPlayerProvider } from 'react-use-audio-player'
import { Actions } from './actionTypes'
import { PlayerState } from './entityTypes'
import { initialPlayerState, playerReducer } from './reducer'

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

export const PlayerProviders: FC = ({ children }) => {
    const [state, dispatch] = useReducer(playerReducer, initialPlayerState)

    return (
        <PlayerContext.Provider value={state}>
            <PlayerDispatchContext.Provider value={dispatch}>
                <AudioPlayerProvider>{children}</AudioPlayerProvider>
            </PlayerDispatchContext.Provider>
        </PlayerContext.Provider>
    )
}
