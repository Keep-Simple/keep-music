import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import theme from '../theme/theme'

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon32.ico"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon16.ico"
                    />
                </Head>
                <body>
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
