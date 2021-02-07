import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { Fonts } from '../components/Fonts'
import theme from '../theme'
import '../styles/extras.css'

function MyApp({ Component, pageProps }: any) {
    return (
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
        </ChakraProvider>
    )
}

export default MyApp
