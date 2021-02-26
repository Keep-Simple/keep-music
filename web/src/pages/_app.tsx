import dynamic from 'next/dynamic'
import React from 'react'
import { PlayerProviders } from '../state/player/PlayerProviders'
import '../theme/styles.css'
import { ThemeProviders } from '../theme/themeProviders'

const PlayerWithNoSSR = dynamic(() => import('../components/player/Player'), {
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
