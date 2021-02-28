import React, { FC } from 'react'
import { AudioPlayerStateProvider } from './AudioState'
import { PlayerStateProvider } from './PlayerState'

const PlayerProviders: FC = ({ children }) => {
    return (
        <PlayerStateProvider>
            <AudioPlayerStateProvider>{children}</AudioPlayerStateProvider>
        </PlayerStateProvider>
    )
}

export default PlayerProviders
