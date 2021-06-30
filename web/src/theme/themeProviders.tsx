import { ChakraProvider } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Global } from './Global'
import theme from './theme'

export const ThemeProviders: FC = ({ children }) => {
    return (
        <ChakraProvider resetCSS theme={theme}>
            <Global />
            {children}
        </ChakraProvider>
    )
}
