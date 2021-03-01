import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { DEFAULT_VOLUME } from '../../../constants'
import { useCastContext } from '../contextsHooks'

export const useCastPlayer = ({ loop = false }) => {
    const {
        remotePlayer,
        remotePlayerController,
        castCtx,
        connected,
    } = useCastContext()

    const [currentTime, setCurrentTime] = useState(0)
    const [volume, setVolume] = useState(DEFAULT_VOLUME)
    const [loading, setLoading] = useState(false)
    const [paused, setPaused] = useState(false)
    const [muted, setMuted] = useState(false)
    const [, setError] = useState()
    const [debouncedMuted, setDebouncedMute] = useState(false)

    useDebounce(() => setDebouncedMute(muted), 40, [muted])

    const [
        mediaSession,
        setMediaSession,
    ] = useState<chrome.cast.media.Media | null>(null)

    useEffect(() => {
        if (!remotePlayerController || !remotePlayer) return

        const timeHandler = ({ value }: any) => setCurrentTime(value)
        const loadHandler = ({ value }: any) => setLoading(value)
        const volumeHandler = ({ value }: any) => setVolume(value)
        const pauseHandler = ({ value }: any) => setPaused(value)
        const muteHandler = ({ value }: any) => setMuted(value)

        remotePlayerController.addEventListener(
            cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,
            timeHandler
        )
        remotePlayerController.addEventListener(
            cast.framework.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED,
            loadHandler
        )
        remotePlayerController.addEventListener(
            cast.framework.RemotePlayerEventType.VOLUME_LEVEL_CHANGED,
            volumeHandler
        )
        remotePlayerController.addEventListener(
            cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
            pauseHandler
        )
        remotePlayerController.addEventListener(
            cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED,
            muteHandler
        )

        return () => {
            remotePlayerController.removeEventListener(
                cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,
                timeHandler
            )
            remotePlayerController.removeEventListener(
                cast.framework.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED,
                loadHandler
            )
            remotePlayerController.removeEventListener(
                cast.framework.RemotePlayerEventType.VOLUME_LEVEL_CHANGED,
                volumeHandler
            )
            remotePlayerController.removeEventListener(
                cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
                pauseHandler
            )
            remotePlayerController.removeEventListener(
                cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED,
                muteHandler
            )
        }
    }, [remotePlayerController, remotePlayer])

    const loadMedia = useCallback(
        (media: {
            src: string
            title: string
            albumName: string
            cover: string
            albumArtist: string
            startTime?: number
        }) => {
            const session = castCtx?.getCurrentSession()
            if (!session || !connected) return

            const mediaInfo = new chrome.cast.media.MediaInfo(
                media.src,
                'audio'
            )

            let metaData = new chrome.cast.media.MusicTrackMediaMetadata()
            const { src, cover, ...metaProps } = media

            metaData = {
                ...metaData,
                metadataType: chrome.cast.media.MetadataType.MUSIC_TRACK,
                ...metaProps,
                images: [{ url: cover, height: null, width: null }],
            }

            mediaInfo.metadata = metaData

            const request = new chrome.cast.media.LoadRequest(mediaInfo)
            request.autoplay = true
            request.currentTime = media.startTime || 0

            session.loadMedia(request).then(
                () => setMediaSession(session.getMediaSession()),
                (e) => setError(e)
            )
        },
        [castCtx, connected]
    )

    const play = useCallback(() => {
        remotePlayer?.isPaused && remotePlayerController?.playOrPause()
    }, [mediaSession, remotePlayer, remotePlayerController])

    const pause = useCallback(() => {
        !remotePlayer?.isPaused && remotePlayerController?.playOrPause()
    }, [mediaSession, remotePlayer, remotePlayerController])

    const changeVolume = useCallback(
        (vol: number) => {
            if (remotePlayer && remotePlayerController) {
                remotePlayer.volumeLevel = vol
                remotePlayerController.setVolumeLevel()
            }
        },
        [remotePlayer, remotePlayerController]
    )

    const mute = useCallback(
        (muted: boolean) => {
            if (muted !== remotePlayer?.isMuted) {
                remotePlayerController?.muteOrUnmute()
            }
        },
        [mediaSession, remotePlayer, remotePlayerController]
    )

    useEffect(() => {
        if (loop) {
            mediaSession?.queueSetRepeatMode(
                loop
                    ? chrome.cast.media.RepeatMode.SINGLE
                    : chrome.cast.media.RepeatMode.OFF,
                () => null,
                () => null
            )
        }
    }, [loop])

    const seek = useCallback(
        (seconds?: number) => {
            if (!remotePlayer || !seconds) return

            remotePlayer.currentTime = seconds
            remotePlayerController?.seek()
        },
        [remotePlayer, remotePlayerController]
    )

    return {
        audioState: {
            volume,
            loading,
            paused,
            muted: debouncedMuted,
            time: currentTime,
        },
        controls: {
            play,
            pause,
            seek,
            loop,
            mute,
            load: loadMedia,
            setVolume: changeVolume,
        },
    }
}
