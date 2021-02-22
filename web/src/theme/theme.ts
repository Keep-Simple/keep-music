import { extendTheme } from '@chakra-ui/react'

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
} as const

const theme = extendTheme({
    colors: {
        gray: {
            500: '#909090',

            700: '#212121',
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
