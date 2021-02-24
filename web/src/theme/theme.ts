import { extendTheme } from '@chakra-ui/react'

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
} as const

const theme = extendTheme({
    styles: {
        global: (props) => ({
            body: {
                background: props.colorMode === 'dark' ? 'black' : 'white',
            },
        }),
    },
    colors: {
        gray: {
            500: '#909090',

            700: '#212121',
        },
        black: 'rgb(3,3,3)',
        whiteAlpha: {
            50: 'rgba(255, 255, 255, 0.05)',
            100: 'rgba(255, 255, 255, 0.1)',
            200: 'rgba(255, 255, 255, 0.2)',
            300: 'rgba(255, 255, 255, 0.3)',
            400: 'rgba(255, 255, 255, 0.4)',
            500: 'rgba(255, 255, 255, 0.5)',
            600: 'rgba(255, 255, 255, 0.6)',
            700: 'rgba(255, 255, 255, 0.7)',
        },
        red: {
            300: '#FF8983',
            400: '#FF4E45',
            500: '#FF0000',
            600: '#CC0000',
            700: '#990412',
        },
    },
    config,
    fonts: {
        body: 'Roboto, sans-serif',
        heading: 'Open Sans, sans-serif',
        mono: 'Menlo, monospace',
    },
})

export default theme
