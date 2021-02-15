import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useReducer } from 'react'
import { Fonts } from '../components/Fonts'
import { PlayerContext } from '../state/player/context'
import { initialPlayerState, playerReducer } from '../state/player/reducer'
import '../styles/extras.css'
import theme from '../theme'

const PlayerWithNoSSR = dynamic(() => import('../components/Player'), {
    ssr: false,
})

function MyApp({ Component, pageProps }: any) {
    const [state, dispatch] = useReducer(playerReducer, initialPlayerState)

    return (
        <PlayerContext.Provider value={{ state, dispatch }}>
            <ChakraProvider resetCSS theme={theme}>
                <Fonts />
                <ColorModeProvider
                    options={{
                        useSystemColorMode: false,
                        initialColorMode: 'dark',
                    }}
                >
                    <Component {...pageProps} />
                </ColorModeProvider>
                <PlayerWithNoSSR />
            </ChakraProvider>
        </PlayerContext.Provider>
    )
}

export default MyApp
