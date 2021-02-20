import dynamic from 'next/dynamic'
import React from 'react'
import '../player/styles/index.css'
import { PlayerProviders } from '../state/player/context'
import { ThemeProviders } from '../themeProviders'

const PlayerWithNoSSR = dynamic(() => import('../player/components/Player'), {
    ssr: false,
})

function MyApp({ Component, pageProps }: any) {
    return (
        <ThemeProviders>
            <PlayerProviders>
                <Component {...pageProps} />
                <PlayerWithNoSSR />
            </PlayerProviders>
        </ThemeProviders>
    )
}

export default MyApp
