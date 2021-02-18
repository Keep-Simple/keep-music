import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import ReactJkMusicPlayer, {
    ReactJkMusicPlayerInstance,
} from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import {
    ViewSongDocument,
    ViewSongMutation,
    ViewSongMutationVariables,
} from '../generated/graphql'
import {
    onAudioListChange,
    onSongLoading,
    onSongPause,
    onSongPlay,
} from '../state/player/actions'
import { PlayerContext } from '../state/player/context'
import { createClient } from '../utils/withApollo'

const defaultPlayProgress = {
    progress: 0,
    currentTime: 0,
    duration: 0,
    viewSent: false,
}

const PROGRESS_WHEN_SEND_VIEW = 0.25

const Player = () => {
    const router = useRouter()
    const { state, dispatch } = useContext(PlayerContext)
    const [sendView, setView] = useState(false)
    const player = useRef<ReactJkMusicPlayerInstance | null>(null)
    const apolloClient = useRef(createClient())
    const playProgress = useRef(defaultPlayProgress)

    useEffect(() => {
        if (sendView && state.selectedSong?._id) {
            apolloClient.current
                .mutate<ViewSongMutation, ViewSongMutationVariables>({
                    mutation: ViewSongDocument,
                    variables: { id: state.selectedSong?._id },
                })
                .then(() => {
                    setView(false)
                    playProgress.current = {
                        ...defaultPlayProgress,
                        viewSent: true,
                    }
                })
        }
    }, [sendView])

    useEffect(() => {
        const onSpacebar = (e: KeyboardEvent) => {
            if (
                e.code === 'Space' &&
                (e.target as any)?.tagName !== 'INPUT' &&
                (e.target as any)?.tagName !== 'TEXTAREA' &&
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
            loadAudioErrorPlayNext={false}
            toggleMode={false}
            defaultVolume={0.6}
            mode="full"
            getAudioInstance={(inst) => (player.current = inst)}
            audioLists={state.songs as any}
            onAudioReload={() => {
                playProgress.current = defaultPlayProgress
            }}
            onAudioPlayTrackChange={() => {
                playProgress.current = defaultPlayProgress
            }}
            onCoverClick={() =>
                router.push(`/album/${state.selectedSong?.albumId}`)
            }
            onBeforeDestroy={() => {
                player.current = null
                return Promise.resolve()
            }}
            onAudioProgress={({ readyState, _id, duration, currentTime }) => {
                if (readyState === 0) {
                    dispatch(onSongLoading(_id))
                } else {
                    const {
                        currentTime: prevTime,
                        progress: prevProgress,
                        viewSent,
                    } = playProgress.current

                    const timeDiff = currentTime - prevTime

                    // user changed slider position
                    if (Math.abs(timeDiff) > 0.3) {
                        playProgress.current = {
                            currentTime,
                            duration,
                            viewSent,
                            progress: prevProgress,
                        }
                    } else {
                        const progress = prevProgress + timeDiff / duration

                        // send view mutation
                        if (progress > PROGRESS_WHEN_SEND_VIEW && !viewSent) {
                            setView(true)
                        }

                        playProgress.current = {
                            currentTime,
                            duration,
                            progress,
                            viewSent,
                        }
                    }
                }
            }}
            onAudioPlay={(audioInfo) => dispatch(onSongPlay(audioInfo._id))}
            onAudioPause={() => dispatch(onSongPause())}
            onAudioListsChange={(_, audioLists, audioInfo) => {
                if (state.selectedSong?._id !== audioInfo._id) {
                    playProgress.current = defaultPlayProgress
                }
                dispatch(onAudioListChange(audioLists))
            }}
        />
    )
}

export default Player
