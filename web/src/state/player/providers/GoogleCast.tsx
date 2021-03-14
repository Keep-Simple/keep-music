import Head from 'next/head'
import React, { FC, useEffect, useState } from 'react'
import { isServer } from '../../../utils/isServer'
import { GoogleCastContext } from '../contexts'

export const CastProvider: FC = ({ children }) => {
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
            if (!chrome.cast) return

            const castCtx = cast.framework.CastContext.getInstance()

            castCtx.setOptions({
                receiverApplicationId: '4B7711C2',
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

        window['__onGCastApiAvailable'] = (isAvailable: boolean) =>
            isAvailable && initializeCastPlayer()
    }, [])

    return (
        <>
            <Head>
                {!isServer() && (
                    <script src="//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
                )}
            </Head>
            <GoogleCastContext.Provider
                value={{
                    castCtx,
                    remotePlayer,
                    connected,
                    remotePlayerController,
                    deviceName,
                }}
            >
                {children}
            </GoogleCastContext.Provider>
        </>
    )
}
