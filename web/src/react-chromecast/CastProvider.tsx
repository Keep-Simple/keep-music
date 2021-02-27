import { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import castContext from './castContext'

const CastProvider: FC = ({ children }) => {
    const [
        remotePlayer,
        setRemotePlayer,
    ] = useState<cast.framework.RemotePlayer>()

    const [
        remotePlayerController,
        setRemotePlayerController,
    ] = useState<cast.framework.RemotePlayerController>()
    const [castCtx, setCastCtx] = useState<cast.framework.CastContext>()
    const [deviceName, setDeviceName] = useState('')

    const [connected, setConnected] = useState(false)

    useEffect(() => {
        const initializeCastPlayer = () => {
            const castCtx = cast.framework.CastContext.getInstance()

            castCtx.setOptions({
                receiverApplicationId:
                    chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
                autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
            })

            const remotePlayer = new cast.framework.RemotePlayer()
            const remotePlayerController = new cast.framework.RemotePlayerController(
                remotePlayer
            )

            const connectHandler = ({
                value,
            }: cast.framework.RemotePlayerChangedEvent) => {
                const device = castCtx.getCurrentSession()?.getCastDevice()
                setConnected(value)
                setDeviceName(value ? device?.friendlyName || '' : '')
            }

            remotePlayerController.addEventListener(
                cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
                connectHandler
            )

            setRemotePlayerController(remotePlayerController)
            setRemotePlayer(remotePlayer)
            setCastCtx(castCtx)

            return () =>
                remotePlayerController.removeEventListener(
                    cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
                    connectHandler
                )
        }

        // castCtx?.addEventListener(cast.framework.CastContextEventType.SESSION_STATE_CHANGED, ({sessionState}) => sessionState )
        window['__onGCastApiAvailable'] = (isAvailable: boolean) =>
            isAvailable && initializeCastPlayer()
    }, [])

    return (
        <>
            <Helmet>
                <script src="//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
            </Helmet>
            <castContext.Provider
                value={{
                    castCtx,
                    remotePlayer,
                    connected,
                    remotePlayerController,
                    deviceName,
                }}
            >
                {children}
            </castContext.Provider>
        </>
    )
}

export default CastProvider
