import React, {
    createContext,
    Dispatch,
    FC,
    useContext,
    useReducer,
    useState,
} from 'react'
import { AudioPlayerProvider } from 'react-use-audio-player'
import { Actions } from './actionTypes'
import { PlayerState } from './entityTypes'
import { initialPlayerState, playerReducer } from './reducer'

// -- Contexts -- //
const PlayerContext = createContext<PlayerState>({} as PlayerState)

const PlayerDispatchContext = createContext<Dispatch<Actions>>(() => null)

const DraggingTimeContext = createContext([0, () => null] as [
    number,
    React.Dispatch<React.SetStateAction<number>>
])

// -- Providers all in one -- //
export const PlayerProviders: FC = ({ children }) => {
    const [state, dispatch] = useReducer(playerReducer, initialPlayerState)
    const draggingState = useState(0)

    return (
        <DraggingTimeContext.Provider value={draggingState}>
            <PlayerContext.Provider value={state}>
                <PlayerDispatchContext.Provider value={dispatch}>
                    <AudioPlayerProvider>{children}</AudioPlayerProvider>
                </PlayerDispatchContext.Provider>
            </PlayerContext.Provider>
        </DraggingTimeContext.Provider>
    )
}

// -- Context hooks -- //
export const usePlayerState = () => useContext(PlayerContext)
export const usePlayerDispatch = () => useContext(PlayerDispatchContext)
export const usePlayer = () => [usePlayerDispatch(), usePlayerState()] as const
export const useDraggingTime = () => useContext(DraggingTimeContext)
export const useSelectedSong = () => {
    const { selectedSongIdx, songs } = usePlayerState()
    return songs?.[selectedSongIdx] ?? {}
}
