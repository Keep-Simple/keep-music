import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
// import '@uppy/status-bar/dist/style.css'
import dynamic from 'next/dynamic'
import { createContext, Dispatch, useReducer } from 'react'
import { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import { Fonts } from '../components/Fonts'
import '../styles/extras.css'
import theme from '../theme'

export const addSongsAction = (songs: ReactJkMusicPlayerAudioListProps[]) => {
    return {
        type: 'ADD_SONGS',
        payload: songs,
    }
}
const initialState = [
    {
        musicSrc:
            'https://ia801506.us.archive.org/22/items/gr82021-02-06/gr8fl2021-02-06D02T01.mp3',
        name: 'Monday',
    },
]
function playerReducer(
    state: ReactJkMusicPlayerAudioListProps[],
    action: any
): ReactJkMusicPlayerAudioListProps[] {
    switch (action.type) {
        case 'ADD_SONGS':
            return [...state, ...action.payload]
        default:
            return state
    }
}

export type AppContextType = {
    state: ReturnType<typeof playerReducer>
    dispatch: Dispatch<any>
}

export const AppContext = createContext({} as AppContextType)

const PlayerWithNoSSR = dynamic(() => import('../components/Player'), {
    ssr: false,
})

function MyApp({ Component, pageProps }: any) {
    const [state, dispatch] = useReducer(playerReducer, initialState)

    return (
        <AppContext.Provider value={{ state, dispatch }}>
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
        </AppContext.Provider>
    )
}

export default MyApp
