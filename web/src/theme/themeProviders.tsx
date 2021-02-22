import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import React, { FC } from 'react'
import theme from './theme'

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
