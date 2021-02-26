import { useCallback, useState } from 'react'
import { useCastContext } from '../context/castContext'

function useMedia() {
    const [media, setMedia] = useState<any>(null)
    const { castCtx, remotePlayerController } = useCastContext()

    const playMedia = useCallback(
        (media: {
            src: string
            title: string
            albumName: string
            releaseYear: number
            cover: string
            albumArtist: string
        }) => {
            const session = castCtx?.getCurrentSession()
            if (!session) return

            const mediaInfo = new chrome.cast.media.MediaInfo(
                media.src,
                'audio'
            )

            let metaData = new chrome.cast.media.MusicTrackMediaMetadata()
            const { src, releaseYear, cover, ...metaProps } = media

            metaData = {
                ...metaData,
                metadataType: chrome.cast.media.MetadataType.MUSIC_TRACK,
                ...metaProps,
                releaseDate: String(releaseYear),
                images: [{ url: cover, height: null, width: null }],
            }

            mediaInfo.metadata = metaData

            const request = new chrome.cast.media.LoadRequest(mediaInfo)
            request.autoplay = true

            session.loadMedia(request).then(
                () => console.log('success loading'),
                () => console.log('fail loading')
            )
        },
        [castCtx]
    )

    const addMedia = useCallback(
        async (src: string) => {
            // if (!castReceiver && !media) return
            // @ts-ignore
            const mediaInfo = new castCtx()?.getCastState().media.MediaInfo(src)
            // @ts-ignore
            const request = new chrome.cast.media.LoadRequest(mediaInfo)
            const queueItem = new castReceiver.media.QueueItem(mediaInfo)
            await media.queueAppendItem(queueItem)
        },
        [media]
    )

    const play = useCallback(async () => {
        if (!media) return
        await media.play()
    }, [media])

    const pause = useCallback(async () => {
        if (!media) return
        await media.pause()
    }, [media])

    const prev = useCallback(async () => {
        if (!media) return
        await media.queuePrev()
    }, [media])

    const next = useCallback(async () => {
        if (!media) return
        await media.queueNext()
    }, [media])

    const to = useCallback(
        async (seconds: number) => {
            if (!media) return

            // @ts-ignore
            const seek = new castReceiver.media.SeekRequest()

            seek.currentTime = seconds

            await media.seek(seek)
        },
        [media]
    )

    return {
        playMedia,
        // addMedia,
        // play,
        // pause,
        // isMedia,
        // next,
        // prev,
        // to,
    }
}
//  *  - play()
//  *  - pause()
//  *  - stop()
//  *  - seekTo(time)
//  *  - load(mediaIndex)
//  *  - getMediaDuration()
//  *  - getCurrentMediaTime()
//  *  - setVolume(volumeSliderPosition)
//  *  - mute()
//  *  - unMute()
//  *  - isMuted()
//  *  - updateDisplayMessage()

export interface PlayerHandler {
    play(): void
    pause(): void
    stop(): void
    seekTo(time: number): void
    getMediaDuration(): number
    getCurrentMediaTime(): number
    setVolume(vol: number): void
    mute(): void
    unMute(): void
    isMuted(): boolean
}
export default useMedia
