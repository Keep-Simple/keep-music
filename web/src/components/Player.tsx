import { useContext, useEffect, useRef } from 'react'
import ReactJkMusicPlayer, {
    ReactJkMusicPlayerInstance,
} from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import {
    onAudioListChange,
    onSongLoading,
    onSongPause,
    onSongPlay,
} from '../state/player/actions'
import { PlayerContext } from '../state/player/context'

const Player = () => {
    const { state, dispatch } = useContext(PlayerContext)

    const player = useRef<ReactJkMusicPlayerInstance | null>(null)

    useEffect(() => {
        const onSpacebar = (e: KeyboardEvent) => {
            if (
                e.code === 'Space' &&
                (e.target as any)?.tagName !== 'INPUT' &&
                state.showPlayer
            ) {
                e.preventDefault()
                player.current?.togglePlay?.()
            }
        }

        window.addEventListener('keydown', onSpacebar, false)
        return () => {
            window.removeEventListener('keydown', onSpacebar)
        }
    }, [state.showPlayer])

    useEffect(() => {
        if (
            player.current?.paused !== state.selectedSong?.isPaused &&
            state.songs.length
        ) {
            console.log(player.current)
            player.current?.togglePlay?.()
        }
    }, [state.selectedSong?.isPaused])

    if (!state.showPlayer) return null

    return (
        <ReactJkMusicPlayer
            remove
            showMediaSession
            glassBg
            clearPriorAudioLists
            quietUpdate
            showMiniProcessBar
            showThemeSwitch={false}
            showReload={false}
            showDownload={false}
            mode="full"
            getAudioInstance={(inst) => (player.current = inst)}
            audioLists={state.songs as any}
            onBeforeDestroy={() => {
                player.current = null
                return Promise.resolve()
            }}
            onAudioProgress={({ readyState, _id }) => {
                if (readyState === 0) {
                    dispatch(onSongLoading(_id))
                }
            }}
            onAudioPlay={(audioInfo) => dispatch(onSongPlay(audioInfo._id))}
            onAudioPause={() => dispatch(onSongPause())}
            onAudioListsChange={(_, audioLists, __) =>
                dispatch(onAudioListChange(audioLists))
            }
        />
    )
}

export default Player
