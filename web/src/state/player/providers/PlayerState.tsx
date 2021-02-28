import React, { FC, useReducer } from 'react'
import { PlayerContext, PlayerDispatchContext } from '../contexts'
import { initialPlayerState, playerReducer } from '../reducer'
import { CastProvider } from './GoogleCast'

export const PlayerStateProvider: FC = ({ children }) => {
    const [playerState, dispatch] = useReducer(
        playerReducer,
        initialPlayerState
    )

    return (
        <PlayerContext.Provider value={playerState}>
            <PlayerDispatchContext.Provider value={dispatch}>
                <CastProvider>{children}</CastProvider>
            </PlayerDispatchContext.Provider>
        </PlayerContext.Provider>
    )
}
