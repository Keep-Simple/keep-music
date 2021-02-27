import { createContext, useContext } from 'react'

const castContext = createContext<{
    castCtx?: cast.framework.CastContext
    remotePlayer?: cast.framework.RemotePlayer
    remotePlayerController?: cast.framework.RemotePlayerController
    connected: boolean
}>({
    remotePlayer: undefined,
    remotePlayerController: undefined,
    connected: false,
})

export const useCastContext = () => useContext(castContext)

export default castContext
