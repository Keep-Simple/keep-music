import { useCallback, useEffect, useMemo, useState } from 'react'
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
    const { connected, remotePlayer: castPlayer } = useCastContext()

    const onSongEnd = useCallback(() => dispatch(Msg(Player.PlayNext)), [])
    const onSongStart = useCallback(() => setLoading(false), [])
    const isLoop = loop === 'one'

    const remotePlayer = useCastPlayer({
        loop: isLoop,
        onEnd: onSongEnd,
        onStart: onSongStart,
    })

    const localPlayer = useAudio({
        src: !connected ? selectedSong.link : '',
        autoPlay: true,
        onEnded: onSongEnd,
        loop: isLoop,
        onCanPlay: onSongStart,
    })

    useEffect(() => {
        selectedSong.id && setLoading(true)
    }, [selectedSong.id])

    useEffect(() => {
        const savedTime = castPlayer?.savedPlayerState?.currentTime
        if (!connected && savedTime) {
            localPlayer[2].seek(savedTime)
        }
    }, [connected, castPlayer])

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

    return {
        audioPositionValue,
        audioValue,
        localPlayerAudioNode: localPlayer[0],
    }
}
