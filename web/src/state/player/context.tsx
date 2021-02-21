import React, {
    createContext,
    Dispatch,
    FC,
    useContext,
    useReducer,
    useState,
} from 'react'
import { useAudio } from 'react-use'
import { Actions, Msg, Player } from './actionTypes'
import { PlayerState } from './entityTypes'
import { initialPlayerState, playerReducer } from './reducer'

export type AudioContextValue = {
    loading: boolean
    volume: number
    muted: boolean
    paused: boolean
    togglePlay: (is?: boolean) => void
    toggleMute: (is?: boolean) => void
}

export type AudioPositionContetValue = {
    percentComplete: number
    seek: (n: number) => void
    duration: number
    position: number
}

// -- Contexts -- //
const PlayerContext = createContext<PlayerState>({} as PlayerState)
const PlayerAudio = createContext<AudioContextValue>({} as AudioContextValue)
const PlayerAudioPosition = createContext<AudioPositionContetValue>(
    {} as AudioPositionContetValue
)

const PlayerDispatchContext = createContext<Dispatch<Actions>>(() => null)
const [playerState, dispatch] = useReducer(playerReducer, initialPlayerState)

const DraggingTimeContext = createContext([0, () => null] as [
    number,
    React.Dispatch<React.SetStateAction<number>>
])

// -- Providers all in one -- //
export const PlayerProviders: FC = ({ children }) => {
    const draggingState = useState(0)
    const selectedSong = useSelectedSong()
    const [loading, setLoading] = useState(false)

    const [audio, audioState, controls, ref] = useAudio({
        src: selectedSong.link,
        autoPlay: true,
        onLoadStart: () => setLoading(true),
        onEnded: () => dispatch(Msg(Player.PlayNext)),
        onCanPlay: () => setLoading(false),
    })

    const audioContextValue: AudioContextValue = {
        loading,
        volume: audioState.volume,
        muted: audioState.muted,
        paused: audioState.paused,
        togglePlay: (is) =>
            audioState.paused || is ? controls.play() : controls.pause(),
        toggleMute: (is) =>
            audioState.muted || is ? controls.unmute() : controls.mute(),
    }

    const audioPositionContextValue: AudioPositionContetValue = {
        percentComplete: Math.ceil(
            (audioState.buffered[0].end / audioState.duration) * 100
        ),
        position: audioState.time,
        seek: controls.seek,
        duration: audioState.duration,
    }

    return (
        <DraggingTimeContext.Provider value={draggingState}>
            <PlayerContext.Provider value={playerState}>
                <PlayerAudio.Provider value={audioContextValue}>
                    <PlayerAudioPosition.Provider
                        value={audioPositionContextValue}
                    >
                        <PlayerDispatchContext.Provider value={dispatch}>
                            {audio}
                            {children}
                        </PlayerDispatchContext.Provider>
                    </PlayerAudioPosition.Provider>
                </PlayerAudio.Provider>
            </PlayerContext.Provider>
        </DraggingTimeContext.Provider>
    )
}

// -- Context hooks -- //
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
