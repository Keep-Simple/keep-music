import { extendTheme } from '@chakra-ui/react'

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
} as const

const theme = extendTheme({
    config,
    fonts: {
        body: 'Roboto, sans-serif',
        heading: 'Open Sans, sans-serif',
        mono: 'Menlo, monospace',
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
