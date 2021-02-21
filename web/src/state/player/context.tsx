import React, {
    createContext,
    Dispatch,
    FC,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react'
import { useAudio } from 'react-use'
import { Actions, Msg, Player } from './actionTypes'
import {
    AudioContextValue,
    AudioPositionContetValue,
    PlayerState,
} from './entityTypes'
import { initialPlayerState, playerReducer } from './reducer'

// -- Contexts -- //
const PlayerContext = createContext<PlayerState>({} as PlayerState)
const PlayerAudio = createContext<AudioContextValue>({} as AudioContextValue)
const PlayerAudioPosition = createContext<AudioPositionContetValue>(
    {} as AudioPositionContetValue
)

const PlayerDispatchContext = createContext<Dispatch<Actions>>(() => null)

const DraggingTimeContext = createContext([0, () => null] as [
    number,
    React.Dispatch<React.SetStateAction<number>>
])

const DEFAULT_VOLUME = 0.5

// -- Audio Providers all in one -- //
export const PlayerProviders: FC = ({ children }) => {
    const draggingState = useState(0)
    const [loading, setLoading] = useState(false)
    const [playerState, dispatch] = useReducer(
        playerReducer,
        initialPlayerState
    )

    const [audio, audioState, controls] = useAudio({
        src: playerState.songs?.[playerState.selectedSongIdx]?.link ?? '',
        autoPlay: true,
        onLoadStart: () => setLoading(true),
        onEnded: () => dispatch(Msg(Player.PlayNext)),
        onCanPlay: () => setLoading(false),
    })

    const audioContextValue: AudioContextValue = {
        loading,
        setVolume: controls.volume,
        volume: audioState.volume,
        muted: audioState.muted,
        paused: audioState.paused,
        togglePlay: (is) =>
            audioState.paused || is ? controls.play() : controls.pause(),
        toggleMute: (is) =>
            audioState.muted || is ? controls.unmute() : controls.mute(),
    }

    const audioPositionContextValue: AudioPositionContetValue = {
        loadProgress: Math.ceil(
            (audioState.buffered[0]?.end / audioState.duration) * 100
        ),
        progress: Math.ceil((audioState.time / audioState.duration) * 100),
        position: Math.ceil(audioState.time),
        seek: controls.seek,
        duration: audioState.duration,
    }

    useEffect(() => controls.volume(DEFAULT_VOLUME), [])

    return (
        <PlayerContext.Provider value={playerState}>
            <PlayerAudio.Provider value={audioContextValue}>
                <PlayerAudioPosition.Provider value={audioPositionContextValue}>
                    <DraggingTimeContext.Provider value={draggingState}>
                        <PlayerDispatchContext.Provider value={dispatch}>
                            {audio}
                            {children}
                        </PlayerDispatchContext.Provider>
                    </DraggingTimeContext.Provider>
                </PlayerAudioPosition.Provider>
            </PlayerAudio.Provider>
        </PlayerContext.Provider>
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
