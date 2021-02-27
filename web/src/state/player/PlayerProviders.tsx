import dynamic from 'next/dynamic'
import React, { FC, useEffect, useReducer, useState } from 'react'
import { DEFAULT_VOLUME } from '../../constants'
import { withApollo } from '../../utils/withApollo'
import {
    DraggingTimeContext,
    PlayerAudio,
    PlayerAudioPosition,
    PlayerContext,
    PlayerDispatchContext,
} from './context'
import { initialPlayerState, playerReducer } from './reducer'
import { useRemoteOrLocalAudio } from './useRemoteOrLocalAudio'

const CastProviderNoSSR = dynamic(() => import('../../react-chromecast'), {
    ssr: false,
})

const PlayerStateProvider: FC = ({ children }) => {
    const [playerState, dispatch] = useReducer(
        playerReducer,
        initialPlayerState
    )

    return (
        <PlayerContext.Provider value={playerState}>
            <PlayerDispatchContext.Provider value={dispatch}>
                <CastProviderNoSSR>{children}</CastProviderNoSSR>
            </PlayerDispatchContext.Provider>
        </PlayerContext.Provider>
    )
}

const AudioPlayerStateProvider: FC = ({ children }) => {
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

const PlayerProviders: FC = ({ children }) => {
    return (
        <PlayerStateProvider>
            <AudioPlayerStateProvider>{children}</AudioPlayerStateProvider>
        </PlayerStateProvider>
    )
}

export default withApollo({ ssr: true })(PlayerProviders)
