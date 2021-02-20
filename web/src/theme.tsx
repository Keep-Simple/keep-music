import {
    ChakraProvider,
    ColorModeProvider,
    extendTheme,
} from '@chakra-ui/react'
import React, { FC } from 'react'

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

export const ThemeProviders: FC = ({ children }) => {
    return (
        <ChakraProvider resetCSS theme={theme}>
            <ColorModeProvider
                options={{
                    useSystemColorMode: false,
                    initialColorMode: 'dark',
                }}
            >
                {children}
            </ColorModeProvider>
        </ChakraProvider>
    )
}

export default theme
