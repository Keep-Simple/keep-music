import { extendTheme } from '@chakra-ui/react'

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const theme = extendTheme({
    config,
    fonts: {
        heading: 'Open Sans',
        body: 'Raleway',
    },
})

export default theme
