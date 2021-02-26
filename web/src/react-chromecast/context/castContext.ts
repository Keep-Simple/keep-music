import { createContext, useContext } from 'react'

const castContext = createContext<{
    castCtx?: cast.framework.CastContext
    remotePlayer?: cast.framework.RemotePlayer
    remotePlayerController?: cast.framework.RemotePlayerController
}>({ remotePlayer: undefined, remotePlayerController: undefined })

export const useCastContext = () => useContext(castContext)

export default castContext
