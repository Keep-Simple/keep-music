import React, { createContext, Dispatch } from 'react'
import { Actions } from './types/actionTypes'
import {
    AudioContextValue,
    AudioPositionContetValue,
    PlayerState,
} from './types/entityTypes'

export const PlayerContext = createContext<PlayerState>({} as PlayerState)

export const PlayerAudio = createContext<AudioContextValue>(
    {} as AudioContextValue
)
export const PlayerAudioPosition = createContext<AudioPositionContetValue>(
    {} as AudioPositionContetValue
)

export const PlayerDispatchContext = createContext<Dispatch<Actions>>(
    () => null
)

export const DraggingTimeContext = createContext([0, () => null] as [
    number,
    React.Dispatch<React.SetStateAction<number>>
])

export const GoogleCastContext = createContext<{
    castCtx?: cast.framework.CastContext
    remotePlayer?: cast.framework.RemotePlayer
    remotePlayerController?: cast.framework.RemotePlayerController
    connected: boolean
    deviceName: string
}>({
    remotePlayer: undefined,
    remotePlayerController: undefined,
    connected: false,
    deviceName: '',
})
