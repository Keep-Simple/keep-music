import React, { FC, useEffect, useState } from 'react'
import { DEFAULT_VOLUME } from '../../../constants'
import {
    DraggingTimeContext,
    PlayerAudio,
    PlayerAudioPosition,
} from '../contexts'
import { useRemoteOrLocalAudio } from '../hooks/useRemoteOrLocalAudio'

export const AudioPlayerStateProvider: FC = ({ children }) => {
    const draggingState = useState(0)

    const {
        audioPositionValue,
        audioValue,
        localPlayerAudioNode,
    } = useRemoteOrLocalAudio()

    useEffect(() => audioValue.setVolume(DEFAULT_VOLUME), [])

    return (
        <PlayerAudio.Provider value={audioValue}>
            <PlayerAudioPosition.Provider value={audioPositionValue}>
                <DraggingTimeContext.Provider value={draggingState}>
                    {localPlayerAudioNode}
                    {children}
                </DraggingTimeContext.Provider>
            </PlayerAudioPosition.Provider>
        </PlayerAudio.Provider>
    )
}
