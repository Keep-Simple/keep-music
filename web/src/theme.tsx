import { extendTheme } from '@chakra-ui/react'

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
} as const

const theme = extendTheme({
    config,
    fonts: {
        heading: 'Open Sans',
        body: 'Raleway',
    },
    styles: {
        global: {
            '.react-jinke-music-player-mobile': {
                svg: {
                    display: 'inline',
                },
            },
        },
    },
})

export default theme
