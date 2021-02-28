import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'
import PlayerProviders from '../state/player/providers'
import { ThemeProviders } from '../theme/themeProviders'

const PlayerWithNoSSR = dynamic(() => import('../components/player/Player'), {
    ssr: false,
})

function MyApp({ Component, pageProps }: any) {
    return (
        <>
            <Head>
                <title>keep-music</title>
            </Head>
            <ThemeProviders>
                <PlayerProviders>
                    <Component {...pageProps} />
                    <PlayerWithNoSSR />
                </PlayerProviders>
            </ThemeProviders>
        </>
    )
}

export default MyApp
