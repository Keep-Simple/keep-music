import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useReducer } from 'react'
import { AudioPlayerProvider } from 'react-use-audio-player'
import '../player/styles/index.css'
import { PlayerContext, PlayerDispatchContext } from '../state/player/context'
import { initialPlayerState, playerReducer } from '../state/player/reducer'
import theme from '../theme'

const PlayerWithNoSSR = dynamic(() => import('../player/components/Player'), {
    ssr: false,
})

function MyApp({ Component, pageProps }: any) {
    const [state, dispatch] = useReducer(playerReducer, initialPlayerState)

    return (
        <ChakraProvider resetCSS theme={theme}>
            <ColorModeProvider
                options={{
                    useSystemColorMode: false,
                    initialColorMode: 'dark',
                }}
            >
                <PlayerContext.Provider value={state}>
                    <PlayerDispatchContext.Provider value={dispatch}>
                        <AudioPlayerProvider>
                            <Component {...pageProps} />
                            <PlayerWithNoSSR />
                        </AudioPlayerProvider>
                    </PlayerDispatchContext.Provider>
                </PlayerContext.Provider>
            </ColorModeProvider>
        </ChakraProvider>
    )
}

export default MyApp
