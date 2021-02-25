import React, {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from 'react'
import { useAudio } from 'react-use'
import { DEFAULT_VOLUME } from '../../constants'
import { Actions, Msg, Player } from './actionTypes'
import {
    DraggingTimeContext,
    PlayerAudio,
    PlayerAudioPosition,
    PlayerContext,
    PlayerDispatchContext,
} from './context'
import { AudioContextValue, AudioPositionContetValue } from './entityTypes'
import { initialPlayerState, playerReducer } from './reducer'

export const PlayerProviders: FC = ({ children }) => {
    const draggingState = useState(0)
    const [loading, setLoading] = useState(false)
    const [playerState, dispatch] = useReducer(
        playerReducer,
        initialPlayerState
    )

    const currentSong = playerState.songs[playerState.selectedSongIdx] ?? {}

    const [audio, audioState, controls, ref] = useAudio({
        src: currentSong.link,
        autoPlay: true,
        loop: playerState.loop === 'one',
        onEnded: () => dispatch(Msg(Player.PlayNext)),
        onCanPlay: () => setLoading(false),
    })

    const audioValue: AudioContextValue = useMemo(
        () => ({
            loading,
            setVolume: controls.volume,
            volume: audioState.volume,
            muted: audioState.muted,
            paused: audioState.paused,
            togglePlay: (is) =>
                audioState.paused || is ? controls.play() : controls.pause(),
            toggleMute: (is) =>
                audioState.muted || is ? controls.unmute() : controls.mute(),
            audioRef: ref,
            seek: controls.seek,
        }),
        [audioState.volume, audioState.muted, audioState.paused, loading]
    )

    const audioPositionValue: AudioPositionContetValue = {
        loadProgress: !loading
            ? Math.floor(
                  (audioState.buffered[0]?.end / audioState.duration) * 100
              ) || 0
            : 0,
        progress: Math.floor((audioState.time / audioState.duration) * 100),
        position: Math.floor(audioState.time),
        seek: controls.seek,
        duration: audioState.duration,
    }

    const dispatchWithMID = useCallback((action: Actions) => {
        const audioRef = ref.current
        if (audioRef) {
            switch (action.type) {
                case Player.PlayPrev:
                    if (audioRef.currentTime > 10) {
                        controls.seek(0)
                        break
                    }
                default:
                    dispatch(action)
            }
        } else {
            dispatch(action)
        }
    }, [])

    useEffect(() => {
        setLoading(true)
    }, [currentSong.id])

    useEffect(() => controls.volume(DEFAULT_VOLUME), [])

    return (
        <PlayerContext.Provider value={playerState}>
            <PlayerAudio.Provider value={audioValue}>
                <PlayerAudioPosition.Provider value={audioPositionValue}>
                    <DraggingTimeContext.Provider value={draggingState}>
                        <PlayerDispatchContext.Provider value={dispatchWithMID}>
                            {audio}
                            {children}
                        </PlayerDispatchContext.Provider>
                    </DraggingTimeContext.Provider>
                </PlayerAudioPosition.Provider>
            </PlayerAudio.Provider>
        </PlayerContext.Provider>
    )
}
