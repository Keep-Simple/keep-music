import { useApolloClient } from '@apollo/client'
import { useEffect, useRef, useState } from 'react'
import { useAudioPosition } from 'react-use-audio-player'
import {
    ViewSongDocument,
    ViewSongMutation,
    ViewSongMutationVariables,
} from '../../generated/graphql'
import { useSelectedSong } from '../../state/player/context'

const defaultPlayProgress = {
    progress: 0,
    viewSent: false,
}

const PROGRESS_WHEN_SEND_VIEW = 25

export const useTrackSongView = () => {
    const [sendView, setView] = useState(false)
    const apolloClient = useApolloClient()
    const { id } = useSelectedSong()
    const playProgress = useRef(defaultPlayProgress)
    const { percentComplete, duration } = useAudioPosition({
        highRefreshRate: true,
    })

    useEffect(() => {
        playProgress.current = defaultPlayProgress
    }, [id])

    useEffect(() => {
        const { progress: prevProgress, viewSent } = playProgress.current

        const progressDiff = Math.abs(percentComplete - prevProgress)

        // user changed slider position
        if (progressDiff > duration / 100) {
            playProgress.current = {
                viewSent,
                progress: prevProgress,
            }
        } else {
            const progress = prevProgress + progressDiff

            // send view mutation
            if (progress > PROGRESS_WHEN_SEND_VIEW && !viewSent) {
                setView(true)
            }

            playProgress.current = {
                progress,
                viewSent,
            }
        }
    }, [percentComplete])

    useEffect(() => {
        if (sendView && id) {
            apolloClient
                .mutate<ViewSongMutation, ViewSongMutationVariables>({
                    mutation: ViewSongDocument,
                    variables: { id },
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
}
