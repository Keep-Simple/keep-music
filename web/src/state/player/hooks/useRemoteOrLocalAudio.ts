import { useEffect, useMemo, useState } from 'react'
import { useAudio } from 'react-use'
import { useCastContext, usePlayer, useSelectedSong } from '../contextsHooks'
import { Msg, Player } from '../types/actionTypes'
import {
    AudioContextValue,
    AudioPositionContetValue,
} from '../types/entityTypes'
import { useCastPlayer } from './useCastPlayer'

export const useRemoteOrLocalAudio = () => {
    const selectedSong = useSelectedSong()
    const [dispatch, { loop }] = usePlayer()
    const [loading, setLoading] = useState(false)
    const [playNextOnCast, setPlayNext] = useState(false)
    const { connected } = useCastContext()

    const remotePlayer = useCastPlayer({ loop: loop === 'one' })

    const localPlayer = useAudio({
        src: !connected ? selectedSong.link : '',
        autoPlay: true,
        onEnded: () => dispatch(Msg(Player.PlayNext)),
        loop: loop === 'one',
        onCanPlay: () => setLoading(false),
    })

    useEffect(() => {
        if (!connected || !selectedSong?.id) return

        const { author, albumName, cover, name, link } = selectedSong

        remotePlayer.controls.load({
            cover,
            albumName,
            src: link,
            albumArtist: author,
            title: name,
            startTime: localPlayer[1].time || 0,
        })
    }, [selectedSong.id, connected])

    const audioValue: AudioContextValue = useMemo(
        () => ({
            loading,
            setVolume: connected
                ? remotePlayer.controls.setVolume
                : localPlayer[2].volume,
            seek: connected ? remotePlayer.controls.seek : localPlayer[2].seek,
            muted: connected
                ? remotePlayer.audioState.muted
                : localPlayer[1].muted,
            paused: connected
                ? remotePlayer.audioState.paused
                : localPlayer[1].paused,
            togglePlay: (is) => {
                if (connected) {
                    is ?? remotePlayer.audioState.paused
                        ? remotePlayer.controls.play()
                        : remotePlayer.controls.pause()
                } else {
                    is ?? localPlayer[1].paused
                        ? localPlayer[2].play()
                        : localPlayer[2].pause()
                }
            },
            toggleMute: (is) => {
                if (connected) {
                    is ?? !remotePlayer.audioState.muted
                        ? remotePlayer.controls.mute(true)
                        : remotePlayer.controls.mute(false)
                } else {
                    is ?? !localPlayer[1].muted
                        ? localPlayer[2].mute()
                        : localPlayer[2].unmute()
                }
            },
        }),
        [
            loading,
            connected,
            remotePlayer.audioState.paused,
            remotePlayer.audioState.muted,
            localPlayer[1].muted,
            localPlayer[1].paused,
        ]
    )

    const time = connected ? remotePlayer.audioState.time : localPlayer[1].time

    const audioPositionValue: AudioPositionContetValue = {
        loadProgress: !loading
            ? Math.floor(
                  (localPlayer[1].buffered[0]?.end / selectedSong.duration) *
                      100
              ) || 0
            : 0,
        progress: Math.floor((time / selectedSong.duration) * 100),
        position: Math.floor(time),
        seek: audioValue.seek,
        setVolume: audioValue.setVolume,
        volume: connected
            ? remotePlayer.audioState.volume
            : localPlayer[1].volume,
        duration: selectedSong.duration,
    }

    // play next song on cast player
    useEffect(() => {
        if (
            connected &&
            !playNextOnCast &&
            audioPositionValue.position + 2 >= selectedSong.duration
        ) {
            setPlayNext(true)
            setTimeout(() => dispatch(Msg(Player.PlayNext)), 1100)
            setTimeout(() => setPlayNext(false), 3000)
        }
    }, [audioPositionValue.position, selectedSong, connected])

    return {
        audioPositionValue,
        audioValue,
        localPlayerAudioNode: localPlayer[0],
    }
}
